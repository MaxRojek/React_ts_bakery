import { PrivilegeLevel } from "../globalContext/globalContext";

import jwt_decode from "jwt-decode";

// const extractRole = (token: string): PrivilegeLevel => {
//   let parsedRole: PrivilegeLevel = "unlogged";
//   if (token) {
//     try {
//       const { role }: Token = parseJWT(token);
//       if (role === "ROLE_USER") {
//         parsedRole = "user";
//       } else if (role === "ROLE_ADMIN") {
//         parsedRole = "admin";
//       }
//     } catch (err) {}
//   }
//   return parsedRole;
// };


export interface decodedToken {
  
    role: PrivilegeLevel;
  username: string;
  
}

const getRole = (token: string):PrivilegeLevel => {
    let role: PrivilegeLevel="unlogged";
    if (token) {
        try {
            let decoded: decodedToken = jwt_decode(token);
            role = decoded.role
            
        }
        catch { }
    
    }
  
    return role;

};



export default getRole;
