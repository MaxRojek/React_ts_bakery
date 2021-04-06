import React, { FC, useContext, useEffect, useState } from "react";

import { PageWrapper, LeftHalf, RightHalf, FormWrapper, LoginButton } from "./LoginPageStyle";

import {
  GlobalContext,
  GlobalContextDispatchers,
  TokenDispatcher,
  PrivilegeLevelDispatcher,
  PrivilegeLevel,
  IsMobileDispatcher,
  globalStateContext,
  IsLoadingDispatcher,
} from "../../globalContext/globalContext";

import LoginInput from "../../components/LoginInput/LoginInput";
import useLogin from "./loginFunction";

interface LoginProps {}

const LoginPage: FC<LoginProps> = (): JSX.Element => {
  const { tokenDispatcher, privilegeLevelDispatcher, isMobileDispatcher }: GlobalContextDispatchers = useContext(
    globalStateContext
  );

  const [tokenLocal, setTokenLocal]: TokenDispatcher = tokenDispatcher;
  const [isMobileLocal, setIsMobileLocal]: IsMobileDispatcher = isMobileDispatcher;
  const [privilegeLevelLocal, setPrivilegeLevelLocal]: PrivilegeLevelDispatcher = privilegeLevelDispatcher;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginFunction } = useLogin("", "");
  return (
    <PageWrapper>
      {isMobileLocal ? (
        <FormWrapper>
          <LoginInput onChange={(e) => setUsername(e.target.value)} placeholder="Użytkownik" />
          <LoginInput onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" />
          <LoginButton onClick={() => loginFunction(username, password)}> Zaloguj się </LoginButton>
        </FormWrapper>
      ) : (
        <>
          <LeftHalf>
            <img
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              src="https://images.pexels.com/photos/1853010/pexels-photo-1853010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
          </LeftHalf>
          <RightHalf>
            <FormWrapper>
              <LoginInput value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Użytkownik" />
              <LoginInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" />
              <LoginButton onClick={() => loginFunction(username, password)}>Zaloguj się</LoginButton>
            </FormWrapper>
          </RightHalf>
        </>
      )}
    </PageWrapper>
  );
};

export default LoginPage;
