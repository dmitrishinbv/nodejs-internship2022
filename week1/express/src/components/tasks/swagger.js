/**
 * @swagger
 * path:
 *  /tasks/:
 *    get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get all tasks
 *      tags: [task get]
 *      produces:
 *      - application/json
 *      responses:
 *        "200":
 *          description: Success
 *    post:
 *     summary: Add new task
 *     security:
 *          - bearerAuth: []
 *     tags: [task post]
 *     responses:
 *        "201":
 *          description: Created
 *     consumes:
 *     - application/json
 *     produces:
 *      - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: false
 *               createdBy:
 *                 type: string
 *                 example: 'Manger'
 *                 required: false
 *               estimatedTime:
 *                 type: integer
 *                 example: 10
 *                 required: false
 *                 default: 0
 *               status:
 *                 type: string
 *                 required: false
 *                 example: 'new'
 *                 default: 'new'
 *  /tasks/{id}:
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: task id
 *         type: string
 *    get:
 *      security:
 *          - bearerAuth: []
 *      summary: Get one task by id
 *      tags: [task get]
 *      produces:
 *      - application/json
 *      responses:
 *        "200":
 *          description:
 *    delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete one task by id
 *      tags: [task delete]
 *      produces:
 *      - application/json
 *      responses:
 *        "200":
 *          description: Success
 *    patch:
 *     summary: Update one task
 *     security:
 *          - bearerAuth: []
 *     tags: [task patch]
 *     consumes:
 *     - application/json
 *     produces:
 *      - application/json
 *     responses:
 *        "200":
 *          description: Success
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estimatedTime:
 *                 type: integer
 *                 example: 10
 *                 required: false
 *                 default: 0
 *               status:
 *                 type: string
 *                 required: false
 *                 example: 'new'
 *                 default: 'new'
 */
