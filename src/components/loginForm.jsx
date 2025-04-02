import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, token, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({email,password}));
  };
  if(loading) return ("Logging in...")
  return (
    
    <div className="p-4 max-w-sm  mx-auto">
      <h2 className="text-xl text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2"
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </div>
  );
};

export default LoginForm;
