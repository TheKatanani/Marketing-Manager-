import { getProjects } from "@/actions/project-actions"
import { ProjectsView } from "@/components/projects/projects-view"

export const dynamic = "force-dynamic"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return <ProjectsView projects={projects} />
}
