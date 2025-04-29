import React from "react";
import { LoginForm } from "./components/login-form";
import useAuth from "@/api/hook/useAuth";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const {isAuthenticated} = useAuth();
  
  if(isAuthenticated()){
    return <Navigate to="/" replace />;
  }
  return (
    <div className="m-auto mt-20 w-[500px]">
      <LoginForm />
    </div>
  );
};
export default Login;
