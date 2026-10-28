import { getIdeas } from "@/actions/content-actions"
import { getProjects } from "@/actions/project-actions"
import { IdeasView } from "@/components/ideas/ideas-view"

export const dynamic = "force-dynamic"

export default async function IdeasPage() {
  const [ideas, projects] = await Promise.all([
    getIdeas(),
    getProjects(),
  ])

  return <IdeasView ideas={ideas} projects={projects} />
}
