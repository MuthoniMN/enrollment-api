import { Router, Request, Response } from 'express';
import AuthController from "../controllers/auth.controller";
import { SelectAdmin } from "../config/db/schema";
import { generateToken } from "../utils/jwt";

const authRouter = Router();
const authController = new AuthController();

/**
 * @swagger
 * tags:
 *  - name: Authentication
 *    description: Simple authentication system for admins
 * paths:
 *  /api/v1/auth/signup:
 *    post:
 *      summary: Create an admin account
 *      description: Create a new admin account
 *      tags:
 *        - Authentication
 *      requestBody:
 *        description: The new admin account details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *            example:
 *              username: admin
 *              password: a1b2c3
 *      responses:
 *        201:
 *          description: Successful account creation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/responses/AuthResponse"
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/responses/BadRequestError" 
 *        500:
 *          description: Internal Server Error 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/responses/ServerError"
 
 */
authRouter.post('/signup', async(req: Request, res: Response) => {
  const { username, password } = req.body;

  // data validation
  if(!username || username.length < 3 || password.length < 6 || !password) { 
    res.json({
      status: 400,
      message: "Failed to create a user",
      data: {
        errors: [
          (!username || username.length < 3) && "Please provide a username",
          (!password || password.length < 6) && "Please provide a valid password"
        ]
      }
    }).status(400);
  }

  try {
    const user = await authController.create({ username, password });
    res.json({
      status: 201,
      message: "Admin created successfully",
      data: { user }
    }).status(201)
    return;

  } catch (e) {
    console.error(e);
    res.json({
      status: 500,
      message: "Internal Server Error",
      data: {}
    }).status(500)
  }
});

/** 
 * @swagger
 * /api/v1/auth/login:
 *    post:
 *      summary: Login to an admin account
 *      description: Authenticate an admin
 *      tags:
 *        - Authentication
 *      requestBody:
 *        description: The new admin account details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *            example:
 *              username: admin
 *              password: a1b2c3
 *      responses:
 *        200:
 *          description: Successful account creation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/responses/AuthResponse"
 *        500:
 *          description: Internal Server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/responses/ServerError"
 * components:
 *    responses:
 *      ServerError:
 *        type: object
 *        properties:
 *          status:
 *            type: string
 *          message:
 *            type: string
 *          data:
 *            type: object
 *      BadRequestError:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *          message:
 *            type: string
 *          data:
 *            type: object
 *            properties:
 *              errors:
 *                type: array
 *                items:
 *                  type: string
 *      AuthResponse:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *          message:
 *            type: string
 *          data:
 *            type: object
 *            properties:
 *              user:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  username:
 *                    type: string
 *                  password:
 *                    type: string
*/
authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // data validation
  if(!username || username.length < 3 || password.length < 6 || !password) { 
    res.json({
      status: 400,
      message: "Failed to create a user",
      data: {
        errors: [
          (!username || username.length < 3) && "Please provide a username",
          (!password || password.length < 6) && "Please provide a valid password"
        ]
      }
    }).status(400);
    return;
  }
  try {
    const user = await authController.login({ username, password }) as Partial<SelectAdmin>;

    const token = generateToken({ id: user.id as number, username });

    res.json({
      status: 200,
      message: "Logged in successfully!",
      data: { user, token }
    })
  } catch (e) {
    console.error(e);
    res.json({
      status: 500,
      message: "Internal Server Error",
      data: {}
    }).status(500)
    return;
  }

})

export default authRouter;
