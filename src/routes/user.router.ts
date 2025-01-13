import { Router, Request, Response } from 'express';
import { auth } from "../middleware/auth";
import UserController from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *  - name: User APIs
 *    description: APIs for creating, retrieving, updating and deleting users
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *  responses:
 *    UserResponses:
 *      type: object
 *      properties:
 *        status:
 *          type: integer
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            user:
 *              $ref: "#/components/schemas/User"
 */

/**
 * @swagger
 * /api/v1/users:
 *    post:
 *      summary: Create a new user
 *      description: This endpoint creates a new user
 *      tags:
 *        - User APIs
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: The new user details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/User"
 *              example:
 *                title: Backend
 *                description: Back-end development using Node, Python, C#, Golang, .NET
 *      responses:
 *        201:
 *          summary: Successfully creating a new user
 *          description: A new user is successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/responses/UserResponses"
 *        400:
 *          summary: Bad Request
 *          description: Invalid data
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/responses/BadRequestError"
 *        500:
 *          summary: Server Error 
 *          description: Server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/responses/ServerError"
 */
userRouter.post('/', auth, async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const user = await userController.create(data);

    res.json({
      status: 201,
      message: "Successfully created the task!",
      data: { user }
    }).status(201)
    return;
  } catch (e) {
    if((e as Error).message === "Invalid data"){
      res.json({
        status: 400,
        message: "Invalid data",
        data: {}
      }).status(400);
    }else {
      res.json({
        status: 500,
        message: "Internal server error",
        data: {}
      }).status(500);
    }
  }
})

/**
* @swagger
* /api/v1/users/:
*   get:
*     summary: Retrieve all users
*     description: This endpoint returns all the available users
*     tags:
*       - User APIs
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         summary: Successfully retrieved all users
*         description: This endpoint returns all the users
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/UserResponses"
*       500:
*         summary: Server Error 
*         description: Internal server error 
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/ServerError"
* */
userRouter.get('/', auth, async (req: Request, res: Response) => {
  try {
    const user = await userController.getAll();

    res.json({
      status: 201,
      message: "Successfully created the task!",
      data: { user }
    }).status(201)
    return;
  } catch (e) {
      res.json({
        status: 500,
        message: "Internal server error",
        data: {}
      }).status(500);
  }
})

/**
* @swagger
* /api/v1/users/{id}:
*   get:
*     summary: Retrieve user
*     description: This endpoint returns the specified user
*     tags:
*       - User APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: User ID
*     responses:
*       200:
*         summary: Successfully retrieved the user
*         description: This endpoint returns the user
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/UserResponses"
*       404:
*         summary: Not Found
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/ServerError"
*       500:
*         summary: Server Error 
*         description: Internal server error 
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/ServerError"
* */
userRouter.get('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userController.get(+id);

    res.json({
      status: 201,
      message: "Successfully created the task!",
      data: { user }
    }).status(201)
    return;
  } catch (e) {
    if((e as Error).message === "Not found"){
      res.json({
        status: 404,
        message: "Task was not found!",
        data: {}
      }).status(404);
    }else{
      res.json({
        status: 500,
        message: "Internal server error",
        data: {}
      }).status(500);
    }
  }
})

/**
* @swagger
* /api/v1/users/{id}:
*   put:
*     summary: Update user
*     description: This endpoint updates the specified user
*     tags:
*       - User APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: User ID
*     responses:
*       200:
*         summary: Successfully retrieved the user
*         description: This endpoint returns the user
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/UserResponses"
*       404:
*         summary: Not Found
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/ServerError"
*       500:
*         summary: Server Error 
*         description: Internal server error 
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/ServerError"
* */

userRouter.put('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const user = await userController.update(+id, data);

    res.json({
      status: 201,
      message: "Successfully created the task!",
      data: { user }
    }).status(201)
    return;
  } catch (e) {
    if((e as Error).message === "Invalid data"){
      res.json({
        status: 400,
        message: "Invalid data",
        data: {}
      }).status(400);
    }else if((e as Error).message === "Not found"){
      res.json({
        status: 404,
        message: "Task was not found!",
        data: {}
      }).status(404);
    }else {
      res.json({
        status: 500,
        message: "Internal server error",
        data: {}
      }).status(500);
    }
  }

})

/**
* @swagger
* /api/v1/users/{id}:
*   delete:
*     summary: Delete a user
*     description: This endpoint deletes the specified user
*     tags:
*       - User APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: User ID
*     responses:
*       204:
*         summary: Successfully deleted the user
*         description: This endpoint deletes the user
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/UserResponses"
*       404:
*         summary: Not Found
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/ServerError"
*       500:
*         summary: Server Error 
*         description: Internal server error 
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/ServerError"
* */
userRouter.delete('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userController.delete(+id);

    res.json({
      status: 204,
      message: "Successfully created the task!",
      data: { user }
    }).status(204)
    return;
  } catch (e) {
    if((e as Error).message === "Not found"){
      res.json({
        status: 404,
        message: "Task was not found!",
        data: {}
      }).status(404);
    }else{
      res.json({
        status: 500,
        message: "Internal server error",
        data: {}
      }).status(500);
    }
  }
})

export default userRouter;
