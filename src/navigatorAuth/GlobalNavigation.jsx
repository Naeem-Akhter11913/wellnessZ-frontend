import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "../store/authApi/authAxios";


const GlobalNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  return (
    <div>
      <h1>My App</h1>
    </div>
  );
};

export default GlobalNavigation;
