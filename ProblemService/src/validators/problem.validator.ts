import { z } from "zod";

export const createProblemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  editorial: z.string().optional(),
  testcases: z.array(z.object({
    input: z.string().min(1, "Input is required"),
    output: z.string().min(1, "Output is required"),
  }))
})

export const updateProblemSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
  editorial: z.string().optional(),
  testcases: z.array(z.object({
    input: z.string().min(1),
    output: z.string().min(1),
  })).optional(),
})

export const findByDifficultySchema = z.object({
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
})

export type CreateProblemDto = z.infer<typeof createProblemSchema>;
export type UpdateProblemDto = z.infer<typeof updateProblemSchema>;
