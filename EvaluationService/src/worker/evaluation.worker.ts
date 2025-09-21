import { Job, Worker} from "bullmq";
import { SUBMISSION_QUEUE } from "../utils/constants";
import logger from "../config/logger.config";
import { createNewRedisConnection } from "../config/redis.config";

async function setupEvaluationWorker(){
  const worker = new Worker(SUBMISSION_QUEUE, async (job: Job) => {
    console.log("Processing job:", job.id);
    console.log("Job data:", job.data);
  }, {
    connection: createNewRedisConnection()
  })

  worker.on("error", (error) => {
    logger.error(`evaluation worker error: ${error}`);
  });

  worker.on("completed", (job) => {
    logger.info(`evaluation job completed: ${job.id}`);
  });

  worker.on("failed", (job, error) => {
    logger.error(`evaluation job failed: ${job?.id}, error: ${error}`);
  });
}

export  async function startWorkers (){
  setupEvaluationWorker();
}