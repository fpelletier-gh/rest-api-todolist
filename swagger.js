const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "REST API Todolists",
    description:
      "A REST API for todolists and notes using Node.js, Express, and MongoDB",
  },
  host: "localhost:1337",
  definitions: {
    CreateUser: {
      email: "test@example.com",
      password: "Password456!",
      passwordConfirmation: "Password456!",
      username: "username",
    },
    GetUserResponse: {
      _id: "63bdc1b0091e1ec1c20b18c8",
      email: "test@example.com",
      username: "username",
      createdAt: "2023-01-10T19:51:13.001Z",
      updatedAt: "2023-01-10T19:51:13.001Z",
      session: "63d9be19a1f2de672f615131",
      iat: 1705004647,
      exp: 1705005547,
    },
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
