import axios, { AxiosResponse } from "axios";
import logger from "../config/logger.config";
import { serverConfig } from "../config";
import { InternalServerError } from "../utils/errors/app.error";


export interface ITestcase {
  input: string;
  output: string;
}

export interface IProblemDetails {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  editorial?: string;
  testcases: ITestcase[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProblemResponse {
  data: IProblemDetails;
  message: string;
  success: boolean;
}

export async function getProblemById(problemId: string): Promise<IProblemDetails | null> {
  try {
    const url = `${serverConfig.PROBLEM_SERVICE}/problems/${problemId}`;
    logger.info(`Fetching problem details from ${url}`);
    const response: AxiosResponse<IProblemResponse> = await axios.get(url);

    if(response.data && response.data.success){
      return response.data.data;
    }

    throw new InternalServerError("Failed to fetch problem details");

  } catch (error) {
    logger.error("Failed to fetch problem details", error);
    return null;
  }
}