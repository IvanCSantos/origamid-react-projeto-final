import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Dogs from "../assets/dogs.svg";
import { UserContext } from "../UserContext";

const Header = () => {
  const context = React.useContext(UserContext);
  console.log(context);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`} aria-label="Dogs - Home">
        <Link className={styles.logo} to="/">
          <img src={Dogs} />
        </Link>
        <Link className={styles.login} to="/login">
          {context.usuario}
          Login / Criar
        </Link>
      </nav>
    </header>
  );
};

export default Header;
