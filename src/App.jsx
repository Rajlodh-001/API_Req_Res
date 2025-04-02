import { useState } from "react";

import "./App.css";
import LoginForm from "./components/loginForm";

import UserTable from "./components/UserTable";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [islogin, setIsLogin] = useState(false);
  const { loading, token, error } = useSelector((state) => state.auth);

  if (loading) return "Logging in...";
  // console.log(token)

  return (
    <>
      
      
      {token ? <UserTable /> :<LoginForm />}

     
    </>
  );
}

export default App;
