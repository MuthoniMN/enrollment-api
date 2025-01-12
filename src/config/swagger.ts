import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Enrollment API",
    description: "An API for enrolling interns to Rhedge Studios Bootcamp"
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
}

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec
