import express from 'express';
import { SubmissionController } from '../../controllers/submission.controller';
import { SubmissionService } from '../../services/submission.service';
import { SubmissionRepository } from '../../repositories/submission.repository';

const submissionRouter = express.Router();

const submissionRepository = new SubmissionRepository();
const submissionService = new SubmissionService(submissionRepository);
const submissionController = new SubmissionController(submissionService);


submissionRouter.post("/", submissionController.createSubmission);
submissionRouter.get("/:id", submissionController.getSubmmission);
submissionRouter.get("/problem/:problemId", submissionController.getSubmissionByProblemId);
submissionRouter.delete("/:id", submissionController.deleteSubmissionById);
submissionRouter.put("/:id", submissionController.updateSubmissionStatus);


export default submissionRouter;