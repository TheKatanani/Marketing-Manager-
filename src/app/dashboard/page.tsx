import { getProjects } from "@/actions/project-actions"
import { getBrandProfile } from "@/actions/brand-actions"
import { getCurrentUser } from "@/actions/auth-actions"
import { getIdeas, getPosts } from "@/actions/content-actions"
import { getBlogPosts } from "@/actions/blog-actions"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { ensureDatabaseSeeded } from "@/lib/seed-data"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  // If database is empty (e.g. first deployment), auto-seed authentic portfolio data
  try {
    await ensureDatabaseSeeded()
  } catch (e) {
    console.error("Auto-seed error on dashboard page:", e)
  }

  const [user, brandProfile, projects, ideas, posts, blogPosts] = await Promise.all([
    getCurrentUser(),
    getBrandProfile(),
    getProjects(),
    getIdeas(),
    getPosts(),
    getBlogPosts(),
  ])

  const totalProjects = projects.length
  const featuredProjects = projects.filter((p) => p.isFeatured)
  const contentPillarsCount = brandProfile?.contentPillars?.length || 0

  return (
    <DashboardOverview
      userName={user?.name || "محمد القطناني (Mohammed Katanani)"}
      totalProjects={totalProjects}
      featuredCount={featuredProjects.length}
      ideasCount={ideas.length}
      postsCount={posts.length}
      blogPostsCount={blogPosts.length}
      contentPillarsCount={contentPillarsCount}
      projects={projects}
      posts={posts}
    />
  )
}
