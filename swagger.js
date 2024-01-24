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
    DeleteSessionResponse: {
      accessToken: null,
      refreshToken: null,
    },
    CreateTodolist: {
      title: "Groceries",
      description: "A todo about groceries",
    },
    CreateTodolistResponse: {
      user: "65a5d78c08419455e17c0139",
      title: "Groceries",
      description: "A todo about groceries",
      valid: true,
      favorite: false,
      _id: "65a983201a1cb1de018a6af9",
      todolistId: "todolist_0270f2d6-380c-490c-960b-d984e8b80bfd",
      todos: [],
      createdAt: "2024-01-18T19:59:28.038Z",
      updatedAt: "2024-01-18T19:59:28.038Z",
      __v: 0,
    },
    GetAllTodolistResponse: [
      {
        _id: "65a992d0eb15006c8581db4c",
        user: "65a5d78c08419455e17c0139",
        title: "Todolist",
        description: "A Todolist about todolist",
        valid: true,
        favorite: false,
        todolistId: "todolist_f18f6511-4e5e-40a0-965b-5e5ef9a8633b",
        todos: [],
        createdAt: "2024-01-18T21:06:24.901Z",
        updatedAt: "2024-01-18T21:06:24.901Z",
        __v: 0,
      },
    ],
    UpdateTodolist: {
      $description: "A example description",
      $title: "Example title",
      favorite: true,
    },
    CreateTodo: {
      $title: "Example title",
      $complete: false,
    },
    CreateTodoResponse: {
      title: "Example title",
      complete: false,
      _id: "65aae04c5d0d1b2be4e747ce",
      createdAt: "2024-01-19T20:49:16.131Z",
      updatedAt: "2024-01-19T20:49:16.131Z",
      todoId: "todo_bd4891a8-24f4-45f6-8842-e76d6f63bc16",
    },
    UpdateTodo: {
      title: "Example title",
      complete: false,
    },
    CreateNote: {
      $title: "Note",
      $content: "A simple note",
    },
    CreateNoteResponse: {
      user: "65a5d78c08419455e17c0139",
      title: "Note",
      content: "A simple note",
      valid: true,
      favorite: false,
      _id: "65aecf2eaf45583f674fe5f1",
      noteId: "note_bb876e7c-1ea7-4265-a22a-4426076f56fa",
      createdAt: "2024-01-22T20:25:18.294Z",
      updatedAt: "2024-01-22T20:25:18.294Z",
      __v: 0,
    },
    GetAllNoteResponse: [
      {
        user: "65a5d78c08419455e17c0139",
        title: "Note",
        content: "A simple note",
        valid: true,
        favorite: false,
        _id: "65aecf2eaf45583f674fe5f1",
        noteId: "note_bb876e7c-1ea7-4265-a22a-4426076f56fa",
        createdAt: "2024-01-22T20:25:18.294Z",
        updatedAt: "2024-01-22T20:25:18.294Z",
        __v: 0,
      },
    ],
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

const outputFile = "./dist/swagger-output.json";
const endpointsFiles = ["./dist/src/routes.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
