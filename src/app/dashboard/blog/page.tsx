import { getBlogPosts } from "@/actions/blog-actions"
import { BlogListView } from "@/components/blog/blog-list-view"

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return <BlogListView posts={posts} />
}
