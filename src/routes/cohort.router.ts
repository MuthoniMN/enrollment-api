import { Router, Request, Response } from 'express';
import { auth } from "../middleware/auth";
import CohortController from "../controllers/cohort.controller";

const cohortRouter = Router();
const cohortController = new CohortController();

/**
 * @swagger
 * tags:
 *  - name: Cohort APIs
 *    description: APIs for creating, retrieving, updating and deleting cohorts
 * components:
 *  schemas:
 *    Cohort:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        startDate:
 *          type: string
 *  responses:
 *    CohortResponses:
 *      type: object
 *      properties:
 *        status:
 *          type: integer
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            cohort:
 *              $ref: "#/components/schemas/Cohort"
 */

/**
 * @swagger
 * /api/v1/cohorts:
 *    post:
 *      summary: Create a new cohort
 *      description: This endpoint creates a new cohort
 *      tags:
 *        - Cohort APIs
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: The new cohort details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Cohort"
 *              example:
 *                title: Backend
 *                description: Back-end development using Node, Python, C#, Golang, .NET
 *      responses:
 *        201:
 *          summary: Successfully creating a new cohort
 *          description: A new cohort is successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/responses/CohortResponses"
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
cohortRouter.post('/', auth, async (req: Request, res: Response) => {
  const data = req.body;
  data['startDate'] = new Date(data['startDate']);

  try {
    const cohort = await cohortController.create(data);

    res.json({
      status: 201,
      message: "Successfully created the cohort!",
      data: { cohort }
    }).status(201)
    return;
  } catch (e) {
    console.error(e);
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
* /api/v1/cohorts/:
*   get:
*     summary: Retrieve all cohorts
*     description: This endpoint returns all the available cohorts
*     tags:
*       - Cohort APIs
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         summary: Successfully retrieved all cohorts
*         description: This endpoint returns all the cohorts
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/CohortResponses"
*       500:
*         summary: Server Error 
*         description: Internal server error 
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/ServerError"
* */
cohortRouter.get('/', auth, async (req: Request, res: Response) => {
  try {
    const cohort = await cohortController.getAll();

    res.json({
      status: 201,
      message: "Successfully retrieved the cohort!",
      data: { cohort }
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
* /api/v1/cohorts/{id}:
*   get:
*     summary: Retrieve cohort
*     description: This endpoint returns the specified cohort
*     tags:
*       - Cohort APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Cohort ID
*     responses:
*       200:
*         summary: Successfully retrieved the cohort
*         description: This endpoint returns the cohort
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/CohortResponses"
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
cohortRouter.get('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cohort = await cohortController.get(+id);

    res.json({
      status: 201,
      message: "Successfully retrieved the cohort!",
      data: { cohort }
    }).status(201)
    return;
  } catch (e) {
    if((e as Error).message === "Not found"){
      res.json({
        status: 404,
        message: "Cohort was not found!",
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
* /api/v1/cohorts/{id}:
*   put:
*     summary: Update cohort
*     description: This endpoint updates the specified cohort
*     tags:
*       - Cohort APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Cohort ID
*     responses:
*       200:
*         summary: Successfully updated the cohort
*         description: This endpoint returns the updated cohort
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/CohortResponses"
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

cohortRouter.put('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const cohort = await cohortController.update(+id, data);

    res.json({
      status: 201,
      message: "Successfully updated the cohort!",
      data: { cohort }
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
        message: "Cohort was not found!",
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
* /api/v1/cohorts/{id}:
*   delete:
*     summary: Delete a cohort
*     description: This endpoint deletes the specified cohort
*     tags:
*       - Cohort APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Cohort ID
*     responses:
*       204:
*         summary: Successfully deleted the cohort
*         description: This endpoint deletes the cohort
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/CohortResponses"
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
cohortRouter.delete('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cohort = await cohortController.delete(+id);

    res.json({
      status: 204,
      message: "Successfully deleted the cohort!",
      data: { cohort }
    }).status(204)
    return;
  } catch (e) {
    if((e as Error).message === "Not found"){
      res.json({
        status: 404,
        message: "Cohort was not found!",
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

export default cohortRouter;
