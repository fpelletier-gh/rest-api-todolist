const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "REST API Todolists",
    description:
      "A REST API for todolists and notes using Node.js, Express, and MongoDB",
  },
  securityDefinitions: {
    apiKeyAccessToken: {
      type: "apiKey",
      in: "header",
      name: "x-access-token",
      description: "Access token to authenticate requests",
    },
    apiKeyRefreshToken: {
      type: "apiKey",
      in: "header",
      name: "x-refresh-token",
      description: "Token to refresh access token",
    },
    apiKeyAccessTokenCookie: {
      type: "apiKey",
      in: "cookie",
      name: "x-access-token",
      description: "Access token to authenticate requests",
    },
    apiKeyRefreshTokenCookie: {
      type: "apiKey",
      in: "cookie",
      name: "x-refresh-token",
      description: "Token to refresh access token",
    },
    },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./dist/src/routes.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
