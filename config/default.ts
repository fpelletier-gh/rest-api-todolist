export default {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  saltWorkFactor: 10,
  accessTokenExpiration: "15m",
  refreshTokenExpiration: "1y",
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  refreshPublicKey: process.env.REFRESH_PUBLIC_KEY,
  refreshPrivateKey: process.env.REFRESH_PRIVATE_KEY,
};
