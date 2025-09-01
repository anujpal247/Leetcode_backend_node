import { NextFunction, Request, Response } from "express";
import { SubmissionService } from "../services/submission.service";
import logger from "../config/logger.config";

export class SubmissionController {
  private submissionService: SubmissionService;

  constructor(submissionService: SubmissionService){
    this.submissionService = submissionService;
  }

  createSubmission = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Creating a new submission", { body: req.body } );

    const submission = await this.submissionService.createSubmission(req.body);

    logger.info("Submission created successfully", { submissionId: submission.id })

    res.status(201).json({
      message: "Submission created successfully",
      data: submission,
      success: true
    });
  }

  getSubmmission = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    logger.info(`Fetching submission id: ${id}`);

    const submission = await this.submissionService.getSubmissionById(id);

    if(!submission) {
      logger.error("Submission not found", { submissionId: id});
    }

    logger.info("Submission fetched successfully", { submissionId: id});

    res.status(200).json({
      message: "Submission fetched successfully",
      data: submission,
      success: true
    });
  }

  getSubmissionByProblemId = async (req: Request, res: Response, next: NextFunction) => {
    const { problemId } = req.params;
    logger.info(`Fetching submissions for problem id: ${problemId}`);

    const submissions = await this.submissionService.getSubmissionsByProblemId(problemId);

    logger.info("Submissions fetched successfully", { problemId });

    res.status(200).json({
      message: "Submissions fetched successfully",
      data: submissions,
      success: true
    });
  }

  deleteSubmissionById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    logger.info(`Deleting submission id: ${id}`);
    
    await this.submissionService.deleteSubmissionById(id);

    logger.info("Submission deleted successfully", { submissionId: id});

    res.status(200).json({
      message: "Submission deleted successfully",
      data: null,
      success: true,
    })
  }

  updateSubmissionStatus = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const submission = await this.submissionService.updateSubmissionSatus(id, req.body.status, req.body);

    logger.info("Submission status updated successfully", { submissionId: id,
      newStatus: req.body.status 
    });

    res.status(200).json({
      message: "Submission status updated successfully",
      data: submission,
      success: true,
    })
  }
}