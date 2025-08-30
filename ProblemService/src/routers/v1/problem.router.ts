import express from 'express';
import {  validateRequestBody } from '../../validators';
import { ProblemController } from '../../controllers/problem.controller';
import { createProblemSchema, updateProblemSchema } from '../../validators/problem.validator';

const problemRouter = express.Router();

problemRouter.post('/', validateRequestBody(createProblemSchema), ProblemController.createProblem);

problemRouter.get('/:id', ProblemController.getProblemById);

problemRouter.get('/', ProblemController.getAllProblems);

problemRouter.put('/:id', validateRequestBody(updateProblemSchema), ProblemController.updateProblem);

problemRouter.delete('/:id', ProblemController.deleteProblem);

problemRouter.get('/difficulty/:difficulty', ProblemController.findbyDifficulty);

problemRouter.get('/search', ProblemController.searchProblems);

export default problemRouter;