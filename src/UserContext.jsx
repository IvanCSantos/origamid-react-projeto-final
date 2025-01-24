import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
// import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  // const { navigate } = useNavigate();

  React.useEffect(() => {
    function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          fetch(url, options).then((res) => {
            if (!res.ok) throw new Error("Token inválido");
            getUser(token);
          });
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, []);

  function getUser(token) {
    const { url, options } = USER_GET(token);
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLogin(true);
      });
  }

  function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      fetch(url, options)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
          }
          return res.json();
        })
        .then((json) => {
          const token = json.token;
          window.localStorage.setItem("token", token);
          getUser(token);
          // navigate("/conta");
        });
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  function userLogout() {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem("token");
    // navigate("/login");
  }

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
