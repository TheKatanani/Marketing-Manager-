import { getPosts } from "@/actions/content-actions"
import { ContentView } from "@/components/content/content-view"

export const dynamic = "force-dynamic"

export default async function ContentStudioPage() {
  const posts = await getPosts()

  return <ContentView posts={posts} />
}
