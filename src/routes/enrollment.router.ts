import { Router, Request, Response } from 'express';
import { auth } from "../middleware/auth";
import EnrollmentController from "../controllers/enrollment.controller";

const enrollmentRouter = Router();
const enrollmentController = new EnrollmentController();

/**
 * @swagger
 * tags:
 *  - name: Enrollment APIs
 *    description: APIs for creating, retrieving, updating and deleting enrollments
 * components:
 *  schemas:
 *    Enrollment:
 *      type: object
 *      properties:
 *        cohort:
 *          type: integer
 *        user:
 *          type: integer
 *  responses:
 *    EnrollmentResponses:
 *      type: object
 *      properties:
 *        status:
 *          type: integer
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            enrollment:
 *              $ref: "#/components/schemas/Enrollment"
 */

/**
 * @swagger
 * /api/v1/enrollments:
 *    post:
 *      summary: Create a new enrollment
 *      description: This endpoint creates a new enrollment
 *      tags:
 *        - Enrollment APIs
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: The new enrollment details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Enrollment"
 *              example:
 *                title: Backend
 *                description: Back-end development using Node, Python, C#, Golang, .NET
 *      responses:
 *        201:
 *          summary: Successfully creating a new enrollment
 *          description: A new enrollment is successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/responses/EnrollmentResponses"
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
enrollmentRouter.post('/', auth, async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const enrollment = await enrollmentController.create(data);

    res.json({
      status: 201,
      message: "Successfully created the enrollment!",
      data: { enrollment }
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
* /api/v1/enrollments/:
*   get:
*     summary: Retrieve all enrollments
*     description: This endpoint returns all the available enrollments
*     tags:
*       - Enrollment APIs
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         summary: Successfully retrieved all enrollments
*         description: This endpoint returns all the enrollments
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/EnrollmentResponses"
*       500:
*         summary: Server Error 
*         description: Internal server error 
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/ServerError"
* */
enrollmentRouter.get('/', auth, async (req: Request, res: Response) => {
  try {
    const enrollment = await enrollmentController.getAll();

    res.json({
      status: 201,
      message: "Successfully retrieved the enrollment!",
      data: { enrollment }
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
* /api/v1/enrollments/{id}:
*   get:
*     summary: Retrieve enrollment
*     description: This endpoint returns the specified enrollment
*     tags:
*       - Enrollment APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Enrollment ID
*     responses:
*       200:
*         summary: Successfully retrieved the enrollment
*         description: This endpoint returns the enrollment
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/EnrollmentResponses"
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
enrollmentRouter.get('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const enrollment = await enrollmentController.get(+id);

    res.json({
      status: 201,
      message: "Successfully retrieved the enrollment!",
      data: { enrollment }
    }).status(201)
    return;
  } catch (e) {
    if((e as Error).message === "Not found"){
      res.json({
        status: 404,
        message: "Enrollment was not found!",
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
* /api/v1/enrollments/{id}:
*   put:
*     summary: Update enrollment
*     description: This endpoint updates the specified enrollment
*     tags:
*       - Enrollment APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Enrollment ID
*     requestBody:
*        description: The new enrollment details
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: "#/components/schemas/Enrollment"
*              example:
*                title: Backend
*                description: Back-end development using Node, Python, C#, Golang, .NET
*     responses:
*       200:
*         summary: Successfully updated the enrollment
*         description: This endpoint returns the updated enrollment
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/EnrollmentResponses"
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

enrollmentRouter.put('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const enrollment = await enrollmentController.update(+id, data);

    res.json({
      status: 201,
      message: "Successfully updated the enrollment!",
      data: { enrollment }
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
        message: "Enrollment was not found!",
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
* /api/v1/enrollments/admit/{id}:
*   put:
*     summary: Admit intern
*     description: This endpoint accepts the intern into the bootcamp
*     tags:
*       - Enrollment APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Enrollment ID
*     responses:
*       200:
*         summary: Successfully accepts an intern
*         description: This endpoint accepts the intern's enrollment
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/EnrollmentResponses"
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

enrollmentRouter.put('/admit/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const enrollment = await enrollmentController.admit(+id);

    res.json({
      status: 201,
      message: "Successfully admitted to the cohort!",
      data: { enrollment }
    }).status(201)
    return;
  } catch (e) {
    if((e as Error).message === "Not found"){
      res.json({
        status: 404,
        message: "Enrollment was not found!",
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
});

/**
* @swagger
* /api/v1/enrollments/reject/{id}:
*   put:
*     summary: Reject intern
*     description: This endpoint rejects an intern application
*     tags:
*       - Enrollment APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Enrollment ID
*     responses:
*       200:
*         summary: Successfully rejected the intern
*         description: This endpoint rejects an intern's application
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/EnrollmentResponses"
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

enrollmentRouter.put('/reject/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const enrollment = await enrollmentController.reject(+id);

    res.json({
      status: 201,
      message: "Successfully rejected the intern!",
      data: { enrollment }
    }).status(201)
    return;
  } catch (e) {
    if((e as Error).message === "Not found"){
      res.json({
        status: 404,
        message: "Enrollment was not found!",
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
* /api/v1/enrollments/{id}:
*   delete:
*     summary: Delete a enrollment
*     description: This endpoint deletes the specified enrollment
*     tags:
*       - Enrollment APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Enrollment ID
*     responses:
*       204:
*         summary: Successfully deleted the enrollment
*         description: This endpoint deletes the enrollment
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/EnrollmentResponses"
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
enrollmentRouter.delete('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const enrollment = await enrollmentController.delete(+id);

    res.json({
      status: 204,
      message: "Successfully deleted the enrollment!",
      data: { enrollment }
    }).status(204)
    return;
  } catch (e) {
    if((e as Error).message === "Not found"){
      res.json({
        status: 404,
        message: "Enrollment was not found!",
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

export default enrollmentRouter;
