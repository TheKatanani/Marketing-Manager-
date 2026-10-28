import { BrandProfile, Project, ContentIdea, Campaign, Post, PostVersion, User } from "@prisma/client"

export type {
  BrandProfile,
  Project,
  ContentIdea,
  Campaign,
  Post,
  PostVersion,
  User,
}

export interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
}

export type PlatformType = "LINKEDIN" | "INSTAGRAM" | "X" | "ALL"

export type PostStatusType =
  | "IDEA"
  | "DRAFT"
  | "IN_REVIEW"
  | "APPROVED"
  | "SCHEDULED"
  | "PUBLISHED"
  | "FAILED"
