import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { TOKEN_POST, USER_GET } from "../../api";
import { UserContext } from "../../UserContext";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const context = React.useContext(UserContext);

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUSer(token);
    }
  }, []);

  function getUSer(token) {
    const { url, options } = USER_GET(token);
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => console.log(JSON.stringify(json)));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value,
      });

      fetch(url, options)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          window.localStorage.setItem("token", json.token);
          getUSer(json.token);
        });
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
