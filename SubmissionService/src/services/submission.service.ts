import { getProblemById } from "../apis/problem.api";
import logger from "../config/logger.config";
import { ISubmission, SubmissionStatus } from "../models/submission.model";
import { addSubmissionJob } from "../producers/submission.producer";
import { ISubmissionRepository } from "../repositories/submission.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";

export interface ISubmissionService {
  createSubmission(submissionData: Partial<ISubmission>): Promise<ISubmission>;
  getSubmissionById(id: string): Promise<ISubmission | null>;
  getSubmissionsByProblemId(problemId: string): Promise<ISubmission[]>;
  deleteSubmissionById(id: string): Promise<boolean>;
  updateSubmissionSatus(id: string, status: SubmissionStatus, submissionData: ISubmission): Promise<ISubmission | null>;
}

export class SubmissionService implements ISubmissionService {
  private submissionRepository: ISubmissionRepository;

  constructor(submissionRepository: ISubmissionRepository) {
    this.submissionRepository = submissionRepository;
  }

  async createSubmission(submissionData: Partial<ISubmission>): Promise<ISubmission> {
    // step 1: check if all required fields are present
    if(!submissionData.problemId){
      throw new BadRequestError("Problem Id is required");
    }

    if(!submissionData.code){
      throw new BadRequestError("Code is required");
    }

    if(!submissionData.language){
      throw new BadRequestError("Language is required");
    }
    // step 2: check if the problem exists

    logger.info("Getting problem by id", { problemId: submissionData.problemId });

    const problem = await getProblemById(submissionData.problemId);
    if(!problem){
      throw new NotFoundError("Problem not found");
    }

    // step 3: add the submission payload to the db
    const submission = await this.submissionRepository.create(submissionData);

    // step 4: add submission to redis queue for processing
    const jobId = await addSubmissionJob({
      submissionId: submission.id,
      problem,
      code: submission.code,
      language: submission.language,
    })

    logger.info(`Submission job added: ${jobId}`);

    return submission;
  }


  async getSubmissionById(id: string): Promise<ISubmission | null> {
    const submission = await this.submissionRepository.findById(id);

    if (!submission) {
      throw new NotFoundError("Submission not found");
    }

    return submission;
  }

  async getSubmissionsByProblemId(problemId: string): Promise<ISubmission[]> {
    const submissions = this.submissionRepository.findByProblemId(problemId);
    return submissions;
  }

  async deleteSubmissionById(id: string): Promise<boolean> {
    
    const result = await this.submissionRepository.deleteById(id);
    if (!result) {
      throw new NotFoundError("Submission not found");
    }
    return result;
  }

  async updateSubmissionSatus(id: string, status: SubmissionStatus, submissionData: ISubmission): Promise<ISubmission | null> {

    const submission = await this.submissionRepository.updateStatus(id, status, submissionData);

    if(!submission) {
      throw new NotFoundError("Submission not found");
    }
    return submission;
  }

}