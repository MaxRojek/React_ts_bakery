export type Token = {
  exp: number;
  iat: number;
  jti: string;
  role: string;
  sub: string;
};

const parseJWT = (token: string): Token => {
  const base64Url: string = token.split(".")[1];
  const base64: string = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload: string = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c: string) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  console.log(jsonPayload);
  return JSON.parse(jsonPayload);
};

export default parseJWT;
