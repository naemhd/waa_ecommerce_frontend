import React, { useRef } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const formData = useRef();

  const loginHandler = (e) => {
      e.preventDefault();
    const form = formData.current;
    const username = form["user"].value;
    const password = form["password"].value;
    onLogin(username, password);

    //props.history.push("/user");
  };

  return (
    <main className="auth">
      <section>
        <form ref={formData} onSubmit={loginHandler}>
          <div>
            <label htmlFor="user">User</label>
            <input type="text" id="user" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
};

export default Login;
