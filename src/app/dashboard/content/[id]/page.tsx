import { notFound } from "next/navigation"
import { getPostById } from "@/actions/content-actions"
import { PostEditor } from "@/components/content/post-editor"

export const dynamic = "force-dynamic"

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return <PostEditor post={post} />
}
