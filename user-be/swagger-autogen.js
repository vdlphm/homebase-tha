const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/*.js"];

const config = {
  info: {
    title: "Blog API Documentation",
    description: "",
  },
  tags: [],
  host: `${process.env.PORT || 3000}`,
  schemes: ["http"],
};

swaggerAutogen(outputFile, endpointsFiles, config);
