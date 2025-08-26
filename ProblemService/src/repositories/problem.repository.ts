import { IProblem, Problem } from "../models/problem.model";

export interface IProblemRepository {
  createProblem(data : Partial<IProblem>) : Promise<IProblem>;
  getAllProblems() : Promise<{ problems: IProblem[], total: number }>;
  getProblemById(id: string) : Promise<IProblem | null>;
  updateProblem(id: string, updateData: Partial<IProblem>) : Promise<IProblem | null>;
  deleteProblem(id: string) : Promise<boolean>;
  findByDifficulty(difficulty: "Easy" | "Medium" | "Hard") : Promise<IProblem[]>;
  searchProblems(query: string) : Promise<IProblem[]>;
}

export class ProblemRepository implements IProblemRepository {
  constructor(){
    console.log("problemRepository constructor called");
  }

  async createProblem(data: Partial<IProblem>): Promise<IProblem> {
    const problem = new Problem(data);
    return await problem.save();
  }

  async getAllProblems(): Promise<{ problems: IProblem[], total: number }> {
    const problems = await Problem.find().sort({ createdAt: -1 });
    const total = await Problem.countDocuments();
    return { problems, total };
  }

  async getProblemById(id: string): Promise<IProblem | null> {
    return await Problem.findById(id);
  }

  async updateProblem(id: string, updateData: Partial<IProblem>): Promise<IProblem | null> {
    return await Problem.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteProblem(id: string): Promise<boolean> {
    const result = await Problem.findByIdAndDelete(id);
    return result !== null;
  }

  async findByDifficulty(difficulty: "Easy" | "Medium" | "Hard"): Promise<IProblem[]> {
      return await Problem.find({ difficulty }).sort({ createdAt: -1 });
  }

  async searchProblems(query: string): Promise<IProblem[]> {
    const regex = new RegExp(query, "i");
    return await Problem.find({ $or: [{ title: regex }, { description: regex }]}).sort({ createdAt: -1 });
  }
}