import { getProjects } from "@/actions/project-actions"
import { getBrandProfile } from "@/actions/brand-actions"
import { getCurrentUser } from "@/actions/auth-actions"
import { getIdeas, getPosts } from "@/actions/content-actions"
import { getBlogPosts } from "@/actions/blog-actions"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"


export const dynamic = "force-dynamic"

export default async function DashboardPage() {
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
