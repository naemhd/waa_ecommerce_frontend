import React, { useState } from "react";

function Register({ onRegister, SwitchUserStatus }) {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    roles: [{ id: "1" }],
  });
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(user);
  }
  

  return (
    <div className="auth">
      <h2>Register</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            required
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            label={"role"}
            name={"role"}
            onChange={(e) =>
              setUser({ ...user, roles: [{ id: e.target.value }] })
            }
            value={"1"}
          >
            <option value="1">Admin</option>
            <option value="2">Buyer</option>
            <option value="3">Seller</option>
          </select>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <label className="ancor" onClick={SwitchUserStatus}>
            Login
          </label>
        </div>
      </form>
    </div>
  );
}

export default Register;
