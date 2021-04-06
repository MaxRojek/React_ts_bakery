import React,{
  createContext,
  Context,
  Consumer,
  Dispatch,
 SetStateAction,
  Provider,
} from "react";

import getRole from "../auth/getRole";

export type GlobalContext = Context<GlobalContextDispatchers>;
type GlobalContextConsumer = Consumer<GlobalContextDispatchers>;
type GlobalContextProvider = Provider<GlobalContextDispatchers>;

export type PrivilegeLevel= "ADMIN" | "user" | "unlogged";
export type IsMobileDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
export type PrivilegeLevelDispatcher = [
  PrivilegeLevel,
  Dispatch<SetStateAction<PrivilegeLevel>>
];
export type IsLoadingDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
export type TokenDispatcher = [string, Dispatch<SetStateAction<string>>];


export interface GlobalContextDispatchers {
  isMobileDispatcher: IsMobileDispatcher;
  privilegeLevelDispatcher: PrivilegeLevelDispatcher;
  isLoadingDispatcher: IsLoadingDispatcher;
  tokenDispatcher: TokenDispatcher;
}







export interface GlobalContextValues {
  isMobile: boolean;
  privilegeLevel: PrivilegeLevel;
  isLoading: boolean;
  token: string;
}


export const initGlobalContextValues: GlobalContextValues = {
  isMobile: window.innerWidth < 768 ? true : false,
  privilegeLevel: getRole(window.localStorage.auth),
  isLoading: true,
  token: window.localStorage.token || "empty",
};




export const globalStateContext: GlobalContext = createContext<
  GlobalContextDispatchers
>((initGlobalContextValues as unknown) as GlobalContextDispatchers);



//const globalStateContext = createContext(initGlobalContextValues);
//export const GlobalStateContextProvider = globalStateContext.Provider;
//export default globalStateContext;
export const GlobalContextConsumer: GlobalContextConsumer =
   globalStateContext.Consumer;
export const GlobalContextProvider: GlobalContextProvider =
   globalStateContext.Provider;

