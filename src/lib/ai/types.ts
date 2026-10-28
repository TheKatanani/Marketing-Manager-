import { z } from "zod"

export const CarouselSlideSchema = z.object({
  slideNumber: z.number(),
  title: z.string(),
  bodyText: z.string(),
  visualCue: z.string(),
})

export const GeneratedIdeaSchema = z.object({
  title: z.string(),
  hook: z.string(),
  targetAudience: z.string(),
  contentPillar: z.string(),
  coreAngle: z.string(),
  whyItWorks: z.string(),
  callToAction: z.string(),
})

export const GeneratedIdeasOutputSchema = z.object({
  ideas: z.array(GeneratedIdeaSchema),
})

export const LinkedInPostSchema = z.object({
  headline: z.string(),
  content: z.string(),
  hashtags: z.array(z.string()),
  callToAction: z.string(),
})

export const InstagramPostSchema = z.object({
  caption: z.string(),
  carouselSlides: z.array(CarouselSlideSchema),
  hashtags: z.array(z.string()),
  imagePrompt: z.string(),
})

export const XTwitterPostSchema = z.object({
  tweets: z.array(z.string()),
  hashtags: z.array(z.string()),
})

export const PlatformDraftsOutputSchema = z.object({
  linkedin: LinkedInPostSchema,
  instagram: InstagramPostSchema,
  xTwitter: XTwitterPostSchema,
})

export const BlogPostOutputSchema = z.object({
  title: z.string(),
  slug: z.string(),
  category: z.string(),
  excerpt: z.string(),
  readTimeMinutes: z.number().default(5),
  tags: z.array(z.string()).default([]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  imagePrompt: z.string().optional(),
  content: z.string(),
})

export type GeneratedIdea = z.infer<typeof GeneratedIdeaSchema>
export type GeneratedIdeasOutput = z.infer<typeof GeneratedIdeasOutputSchema>
export type PlatformDraftsOutput = z.infer<typeof PlatformDraftsOutputSchema>
export type CarouselSlide = z.infer<typeof CarouselSlideSchema>
export type GeneratedBlogPostOutput = z.infer<typeof BlogPostOutputSchema>
