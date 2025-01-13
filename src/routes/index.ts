import express from 'express';
import authRouter from './auth.router';
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../config/swagger";
import trackRouter from "./track.router";
import cohortRouter from "./cohort.router";
import enrollmentRouter from "./enrollment.router";
import userRouter from "./user.router";

const router = express.Router();

router.use('/', (req, res) => {
  res.send('Hey, the enrollment API is running')
});
router.use('/docs/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.use('/auth/', authRouter);
router.use('/tracks/', trackRouter);
router.use('/cohorts/', cohortRouter);
router.use('/users', userRouter);
router.use('/enrollments/', enrollmentRouter);

export default router;
