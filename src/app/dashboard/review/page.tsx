import { getReviewQueue } from "@/actions/review-actions"
import { ReviewView } from "@/components/review/review-view"

export const dynamic = "force-dynamic"

export default async function ReviewQueuePage() {
  const pendingPosts = await getReviewQueue()

  return <ReviewView pendingPosts={pendingPosts} />
}
