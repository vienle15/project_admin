import React from "react";
import AuthEvent from "./Auth.event";
export function FormAuth() {
  const handleSubmit = (action: string) => {
    const authEvent = new AuthEvent();
    authEvent.onSubmit(action);
  };
  return (
    <div>
      <h1>Hello Form</h1>

      <button onClick={() => handleSubmit("Login")}>Login</button>
      <button onClick={() => handleSubmit("Register")}>Register</button>
    </div>
  );
}

export default FormAuth;
