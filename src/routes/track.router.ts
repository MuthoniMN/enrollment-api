import { Router, Request, Response } from 'express';
import { auth } from "../middleware/auth";
import TrackController from "../controllers/track.controller";

const trackRouter = Router();
const trackController = new TrackController();

/**
 * @swagger
 * tags:
 *  - name: Track APIs
 *    description: APIs for creating, retrieving, updating and deleting tracks
 * components:
 *  schemas:
 *    Track:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *  responses:
 *    TrackResponses:
 *      type: object
 *      properties:
 *        status:
 *          type: integer
 *        message:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            track:
 *              $ref: "#/components/schemas/Track"
 */

/**
 * @swagger
 * /api/v1/tracks:
 *    post:
 *      summary: Create a new track
 *      description: This endpoint creates a new track
 *      tags:
 *        - Track APIs
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: The new track details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Track"
 *              example:
 *                title: Backend
 *                description: Back-end development using Node, Python, C#, Golang, .NET
 *      responses:
 *        201:
 *          summary: Successfully creating a new track
 *          description: A new track is successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/responses/TrackResponses"
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
trackRouter.post('/', auth, async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const track = await trackController.create({ title, description });

    res.json({
      status: 201,
      message: "Successfully created the track!",
      data: { track }
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
* /api/v1/tracks/:
*   get:
*     summary: Retrieve all tracks
*     description: This endpoint returns all the available tracks
*     tags:
*       - Track APIs
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         summary: Successfully retrieved all tracks
*         description: This endpoint returns all the tracks
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/TrackResponses"
*       500:
*         summary: Server Error 
*         description: Internal server error 
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/ServerError"
* */
trackRouter.get('/', async (req: Request, res: Response) => {
  try {
    const track = await trackController.getAll();

    res.json({
      status: 201,
      message: "Successfully retrieved the track!",
      data: { track }
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
* /api/v1/tracks/{id}:
*   get:
*     summary: Retrieve track
*     description: This endpoint returns the specified track
*     tags:
*       - Track APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Track ID
*     responses:
*       200:
*         summary: Successfully retrieved the track
*         description: This endpoint returns the track
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/TrackResponses"
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
trackRouter.get('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const track = await trackController.get(+id);

    res.json({
      status: 201,
      message: "Successfully retrieved the track!",
      data: { track }
    }).status(201)
    return;
  } catch (e) {
    if((e as Error).message === "Not found"){
      res.json({
        status: 404,
        message: "Track was not found!",
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
* /api/v1/tracks/{id}:
*   put:
*     summary: Update track
*     description: This endpoint updates the specified track
*     tags:
*       - Track APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Track ID
*     responses:
*       200:
*         summary: Successfully updated the track
*         description: This endpoint returns the updated track
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/TrackResponses"
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

trackRouter.put('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const track = await trackController.update(+id, data);

    res.json({
      status: 201,
      message: "Successfully updated the track!",
      data: { track }
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
        message: "Track was not found!",
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
* /api/v1/tracks/{id}:
*   delete:
*     summary: Delete a track
*     description: This endpoint deletes the specified track
*     tags:
*       - Track APIs
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path 
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Track ID
*     responses:
*       204:
*         summary: Successfully deleted the track
*         description: This endpoint deletes the track
*         content:
*           application/json:
*             schema:
*               $ref: "#/components/responses/TrackResponses"
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
trackRouter.delete('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const track = await trackController.delete(+id);

    res.json({
      status: 204,
      message: "Successfully deleted the track!",
      data: { track }
    }).status(204)
    return;
  } catch (e) {
    if((e as Error).message === "Not found"){
      res.json({
        status: 404,
        message: "Track was not found!",
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

export default trackRouter;
