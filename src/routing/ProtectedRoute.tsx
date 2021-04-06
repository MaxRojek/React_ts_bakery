import React, { FC, useContext, ElementType, createElement } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { globalStateContext } from "../globalContext/globalContext";
import Error404 from "../pages/Error404/Error404";

interface PrivateRouteProps extends RouteProps {
  forPrivilegeLevelAndHigher: "ADMIN" | "user";
}

const ProtectedRoute: FC<PrivateRouteProps> = ({
  component,
  forPrivilegeLevelAndHigher,
  ...rest
}: PrivateRouteProps): JSX.Element => {
  const { privilegeLevelDispatcher } = useContext(globalStateContext);

  const [privilegeLevel] = privilegeLevelDispatcher;
  console.log(privilegeLevel);

  // return privilegeLevel === "unlogged" ? (
  //   <Redirect
  //     to={{
  //       pathname: "/login",
  //     }}
  //   />
  // ) : (
  //   <Route
  //     {...rest}
  //     render={(routeProps): JSX.Element =>
  //       forPrivilegeLevelAndHigher === "ADMIN" && privilegeLevel === "ADMIN" ? (
  //         component ? (
  //           createElement(component as ElementType, routeProps)
  //         ) : (
  //           <></>
  //         )
  //       ) : forPrivilegeLevelAndHigher === "user" ? (
  //         <Error404 {...routeProps} />
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: "/login",
  //             state: { from: routeProps.location },
  //           }}
  //         />
  //       )
  //     }
  //   />
  //);

  return (
    <Route
      {...rest}
      render={(routeProps): JSX.Element =>
        forPrivilegeLevelAndHigher === privilegeLevel || privilegeLevel === "ADMIN" ? (
          component ? (
            createElement(component as ElementType, routeProps)
          ) : (
            <></>
          )
        ) : forPrivilegeLevelAndHigher === "ADMIN" ? (
          <Error404 {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
