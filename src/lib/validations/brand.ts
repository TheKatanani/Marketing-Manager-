import { z } from "zod"

export const brandProfileSchema = z.object({
  professionalTitle: z
    .string()
    .min(3, "Professional title must be at least 3 characters"),
  bioSummary: z
    .string()
    .min(10, "Bio summary must be at least 10 characters"),
  primaryGoal: z
    .enum(["CAREER", "FREELANCE", "BRAND", "CAREER_AND_FREELANCE"])
    .default("CAREER_AND_FREELANCE"),
  coreSkills: z
    .array(z.string())
    .min(1, "Specify at least one core skill"),
  targetRoles: z
    .array(z.string())
    .min(1, "Specify at least one target role"),
  freelanceServices: z
    .array(z.string())
    .default([]),
  toneOfVoice: z
    .string()
    .min(5, "Tone of voice must be specified"),
  targetAudienceSummary: z
    .string()
    .min(10, "Target audience summary must be at least 10 characters"),
  contentPillars: z
    .array(z.string())
    .min(1, "Define at least one content pillar"),
  languages: z
    .array(z.string())
    .default(["English"]),
  portfolioUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

export type BrandProfileInput = z.infer<typeof brandProfileSchema>
