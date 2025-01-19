import React from "react";

const TokenPost = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState("");
  const [user, setUser] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetch("https://dogsapi.origamid.dev/json/jwt-auth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setToken(json.token);
        setUser({
          email: json.user_email,
          username: json.user_nicename,
          displayname: json.user_display_name,
        });
        return json;
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <button>Enviar</button>

      <h2 style={{ marginTop: "4rem" }}>Usuário logado</h2>
      <p>Usuário: {user.username}</p>
      <p>E-mail: {user.email}</p>
      <p style={{ wordBreak: "break-all" }}>Token: {token}</p>
    </form>
  );
};

export default TokenPost;

("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RvZ3NhcGkub3JpZ2FtaWQuZGV2IiwiaWF0IjoxNzM3Mjk3OTI5LCJuYmYiOjE3MzcyOTc5MjksImV4cCI6MTczNzM4NDMyOSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMjA0NDMifX19.L6-w3L4Yqei_10Ry3UwOPN6g7GDTDgwdPWw5GuGiMMo");
