import { IProblemDetails } from "../apis/problem.api";
import logger from "../config/logger.config";
import { SubmissionLanguage } from "../models/submission.model";
import { submissionQueue } from "../queues/submission.queue";


export interface ISubmissionJob {
  submissionId: string;
  problem: IProblemDetails;
  code: string;
  language: SubmissionLanguage;
}

export async function addSubmissionJob(data: ISubmissionJob): Promise<string | null> {
  try {
    const job = await submissionQueue.add("evaluate-submission", data);

    logger.info(`Submissionjob added: ${job.id}`);
    return job.id || null;
  } catch (error) {
    logger.error(`Failed to add submission job: ${error}`);
    return null;
  }
}