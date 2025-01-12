import express from 'express';
import authRouter from './auth.router';
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../config/swagger";

const router = express.Router();

router.use('/docs/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.use('/auth/', authRouter);

export default router;
