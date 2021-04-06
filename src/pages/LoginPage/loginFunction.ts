import React, { useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import {
  initGlobalContextValues,
  GlobalContextValues,
  PrivilegeLevelDispatcher,
  GlobalContextDispatchers,
  globalStateContext,
  PrivilegeLevel
  
  
} from "../../globalContext/globalContext";







const { privilegeLevel }: GlobalContextValues = initGlobalContextValues;


interface authObj {
  role: PrivilegeLevel,
  username:string
}
interface tokenObj {
  token: string,
 
}

const useLogin = (initialUsername: string, initialPassword: string) => {
   const { privilegeLevelDispatcher}: GlobalContextDispatchers = useContext(
    globalStateContext
  );
  const [privilegeLevelLocal, setPrivilegeLevelLocal]: PrivilegeLevelDispatcher = privilegeLevelDispatcher;
  const [user, setUser] = useState(initialUsername);
  const [password, setPassword] = useState(initialPassword);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

    const loginFunction =  async(user:string,password:string) => {
      
      setLoading(true);
      if (user === "" || password === "") {
      setError(true);
      setLoading(false);
    } else {
     
    try {
      const path: string =process.env.REACT_APP_API_URL as string;
      const response = await fetch(`http://localhost:1337/api/auth/login`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username: user, password: password }),
      });

      if (!response.ok) {
        setLoading(false);
        setError(true);
        console.log("error")
       // setUser("");
        //setPassword("");
        throw Error(response.statusText);
      }

      const data: tokenObj = await response.json();
      console.log(data);
     let decoded:authObj = jwt_decode(data.token);

    localStorage.setItem("auth", data.token);
    localStorage.setItem("role", decoded.role);
      localStorage.setItem("username", decoded.username);
      setPrivilegeLevelLocal(decoded.role)
   

    history.push("/home");
      
    } catch (err) {
      //tutaj czyszczenie formularza
      console.log(err);
    }
        
        
    }
  
    
    }

    
  return {error,loading, loginFunction }
}



export default useLogin;