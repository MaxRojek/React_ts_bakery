import React, { FC, useState, useEffect, Suspense, lazy, LazyExoticComponent } from "react";

import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import checkIfMobile from "./globalFunctions/checkIfMobile";

import ProtectedRoute from "./ProtectedRoute";
import Loader from "../components/Loader/Loader";

import {
  initGlobalContextValues,
  GlobalContextValues,
  GlobalContextProvider,
  IsMobileDispatcher,
  PrivilegeLevelDispatcher,
  IsLoadingDispatcher,
  TokenDispatcher,
} from "../globalContext/globalContext";

const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));

const { isMobile, privilegeLevel, isLoading, token }: GlobalContextValues = initGlobalContextValues;

interface AppProps {}

export const AppRoutes: FC<AppProps> = (): JSX.Element => {
  ///////////////////////////////// Global variables, initial values and types are in globalContext folder
  const [isMobileLocal, setIsMobileLocal]: IsMobileDispatcher = useState(isMobile);
  const [tokenLocal, setTokenLocal]: TokenDispatcher = useState(token);
  const [privilegeLevelLocal, setPrivilegeLevelLocal]: PrivilegeLevelDispatcher = useState(privilegeLevel);
  const [isLoadingLocal, setIsLoadingLocal]: IsLoadingDispatcher = useState(isLoading);
  /////////////////////////////
  useEffect(() => {
    setIsMobileLocal(checkIfMobile());
    const resizeLinstenerHandler = (): void => {
      setIsMobileLocal(checkIfMobile());
    };

    window.addEventListener("resize", resizeLinstenerHandler);
  }, []);
  useEffect(() => {
    console.log(isMobileLocal);
  }, [isMobileLocal]);
  /////////////////////////////////useEfect's
  return (
    <>
      <GlobalContextProvider
        value={{
          isMobileDispatcher: [isMobileLocal, setIsMobileLocal],
          privilegeLevelDispatcher: [privilegeLevelLocal, setPrivilegeLevelLocal],
          isLoadingDispatcher: [isLoadingLocal, setIsLoadingLocal],
          tokenDispatcher: [tokenLocal, setTokenLocal],
        }}
      >
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Switch>
              <ProtectedRoute forPrivilegeLevelAndHigher="user" path="/home" exact component={HomePage} />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </GlobalContextProvider>
    </>
  );
};
