import styled from "styled-components";

export const PageWrapper = styled.div`
 height: 100vh;
 width: 100vw;
`;


export const LeftHalf= styled.div`
 height: 100%;
   display: inline-block;
  vertical-align: top;
  width: 50%;
`;
export const RightHalf= styled.div`
  background: #ffffff;
height: 100%;
display: inline-block;
  vertical-align: top;
  width: 50%;
  
  
`;


export const FormWrapper= styled.div`
 display:flex;
 flex-direction:column;
 justify-content:center;
 align-items:center;
 max-width:100%;
 height:70% ;
 padding-right:15%;
 padding-left:15%; 
 @media (max-width: 768px) {
padding-right:5%;
 padding-left:5%; 
  }
 
`;
export const LoginButton= styled.button`
 
  border: none;
  border-radius: 5px;
  background-color: #ff8c00;
  color: white;
  padding: 2px 28px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  cursor: pointer;
  outline: none;
  margin: 12px;
  height: 40px;
  &:hover {
    background-color: #c55d00;
  }
`;
