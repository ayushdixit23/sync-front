import jwt from "jsonwebtoken";
export const checkToken = async (token) => {
  try {
    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken && decodedToken.header && decodedToken.payload) {
      const issuedAt = decodedToken.payload.iat;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const isValidIat = issuedAt <= currentTimestamp;
      const expiration = decodedToken.payload.exp;
      const isValidExp = currentTimestamp <= expiration;
      if (isValidIat && isValidExp) {
        return { isValid: true, payload: decodedToken.payload };
      } else {
        return { isValid: false, payload: "" };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
