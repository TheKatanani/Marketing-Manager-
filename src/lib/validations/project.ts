import { z } from "zod"

export const projectSchema = z.object({
  title: z.string().min(3, "Project title must be at least 3 characters"),
  projectContext: z.string().min(2, "Project context is required"),
  problemStatement: z
    .string()
    .min(20, "Describe the problem or bottleneck clearly (min 20 characters)"),
  solutionArchitecture: z
    .string()
    .min(20, "Detail your technical architecture and solution (min 20 characters)"),
  techStack: z
    .array(z.string())
    .min(1, "Include at least one technology in the stack"),
  businessImpact: z
    .string()
    .min(15, "Describe the measurable business impact or results"),
  keyMetrics: z
    .array(z.string())
    .default([]),
  constraintsFaced: z
    .string()
    .min(10, "Describe constraints faced (e.g., legacy systems, regional limits, deadlines)"),
  lessonsLearned: z
    .string()
    .min(10, "Share key technical takeaways or architectural lessons"),
  projectUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repositoryUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
})

export type ProjectInput = z.infer<typeof projectSchema>
