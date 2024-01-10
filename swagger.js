const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "REST API Todolists",
    description:
      "A REST API for todolists and notes using Node.js, Express, and MongoDB",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./dist/src/routes.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
