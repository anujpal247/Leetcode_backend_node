import { Request, Response } from "express"
import { ProblemService } from "../services/problem.service"
import { ProblemRepository } from "../repositories/problem.repository";


const problemRepository = new ProblemRepository();
const problemService = new ProblemService(problemRepository);


export const ProblemController = {
  async createProblem (req: Request, res: Response): Promise<void>{
    const problem = await problemService.createProblem(req.body);

    res.status(201).json({
      message: "Problem created successfully",
      data: problem,
      success: true
    });
  },

  async getProblemById (req: Request, res: Response): Promise<void> {
    const problem = await problemService.getProblemById(req.params.id);

    res.status(200).json({
      message: "Problem fetched successfully",
      data: problem,
      success: true
    });
  },

  async getAllProblems (req: Request, res: Response): Promise<void> {
    const problems = await problemService.getAllProblems();

    res.status(200).json({
      message: "Problems fetched successfully",
      data: problems,
      success: true
    });
  },

  async updateProblem(req: Request, res: Response): Promise<void> {
    const problem = await problemService.updateProblem(req.params.id, req.body);

    res.status(200).json({
      message: "Problem updated successfully",
      data: problem,
      success: true
    });
  },

  async deleteProblem(req: Request, res: Response): Promise<void> {
    const problem = await problemService.deleteProblem(req.params.id);

    res.status(200).json({
      message: "Problem deleted successfully",
      data: problem,
      success: true
    });
  },

  async findbyDifficulty(req: Request, res: Response): Promise<void> {
    const difficulty = req.params.difficulty as "easy" | "medium" | "hard";

    const problems = await problemService.findByDifficulty(
      difficulty.charAt(0).toUpperCase() + difficulty.slice(1) as "Easy" | "Medium" | "Hard"
    );
    res.status(200).json({
      message: "Problems fetched successfully",
      data: problems,
      success: true
    });
  },

  async searchProblems(req: Request, res: Response): Promise<void> {
    const query = req.query.q as string;

    const problems = await problemService.searchProblems(query);

    res.status(200).json({
      message: "Problems fetched successfully",
      data: problems,
      success: true
    });
  }

}