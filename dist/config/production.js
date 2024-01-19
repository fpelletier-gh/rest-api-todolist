"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: process.env.PORT,
    hostname: process.env.HOSTNAME,
    dbUri: process.env.DB_URI,
    corsOrigin: process.env.CORS_ORIGIN,
    saltWorkFactor: 10,
    accessTokenExpiration: "15m",
    refreshTokenExpiration: "1y",
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    refreshPublicKey: process.env.REFRESH_PUBLIC_KEY,
    refreshPrivateKey: process.env.REFRESH_PRIVATE_KEY,
};
