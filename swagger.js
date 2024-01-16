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
    CreateSession: {
      email: "test@example.com",
      password: "Password456!",
    },
    CreateSessionResponse: {
      accessToken:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JkYzFiMDA5MWUxZWMxYzIwYjE4YzgiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6Int7dXNlcm5hbWV9fSIsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTBUMTk6NTE6MTMuMDAxWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTBUMTk6NTE6MTMuMDAxWiIsIl9fdiI6MCwic2Vzc2lvbiI6IjY1YTA1MGU2ZWIxMWI1OWY3ODVhNjg4NSIsImlhdCI6MTcwNTAwNTI4NiwiZXhwIjoxNzA1MDA2MTg2fQ.PkCGC4NHk9L64j-Qs5Jp5XyIi4P6IO6_yfvYkN9lo4Nwi6hU4EYbqtrE3TmsmdB6TOMiEQj_5HzN2i5Cosszf1MU7muY86TQjzMyCvbqXJ-mVwCW6tl1SzLjZjgv9wyTywckYHc7kWppIhEUk3eJ0RINIe0scBYkveyJJ4-ammA",
      refreshToken:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JkYzFiMDA5MWUxZWMxYzIwYjE4YzgiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6Int7dXNlcm5hbWV9fSIsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTBUMTk6NTE6MTMuMDAxWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTBUMTk6NTE6MTMuMDAxWiIsIl9fdiI6MCwic2Vzc2lvbiI6IjY1YTA1MGU2ZWIxMWI1OWY3ODVhNjg4NSIsImlhdCI6MTcwNTAwNTI4NiwiZXhwIjoxNzM2NTYyODg2fQ.I6qMkacyV4K5pgBBv4c3_ivCIR7_nAb3FaNCeI-MYY7qI9LbToD5EtsGrzdhWk63qxLWsaV8I1ofy5Nm8rvfBn7U7Ln5djTNCkhxgGeTi2oa-iprM7XWafi-hYp4Z5YtIRcTS5CqsgPovcGHcaroaNwtVGCmG62_VJAfmNWFTSs",
      user: {
        _id: "63bdc1b0091e1ec1c20b18c8",
        email: "test@example.com",
        username: "username",
        createdAt: "2023-01-10T19:51:13.001Z",
        updatedAt: "2023-01-10T19:51:13.001Z",
      },
    },
    GetSessionResponse: {
      _id: "63d9be19a1f2de672f615131",
      user: "63bdc1b0091e1ec1c20b18c8",
      valid: true,
      userAgent: "PostmanRuntime/7.30.0",
      createdAt: "2023-02-01T01:19:21.502Z",
      updatedAt: "2023-02-01T01:19:21.502Z",
      __v: 0,
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
