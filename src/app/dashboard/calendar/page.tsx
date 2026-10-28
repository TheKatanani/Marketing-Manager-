import { getCalendarPosts } from "@/actions/calendar-actions"
import { CalendarPageView } from "@/components/calendar/calendar-page-view"

export const dynamic = "force-dynamic"

export default async function CalendarPage() {
  const posts = await getCalendarPosts()

  return <CalendarPageView posts={posts} />
}
