import { getCalendarData } from "@/actions/calendar-actions"
import { CalendarPageView } from "@/components/calendar/calendar-page-view"

export const dynamic = "force-dynamic"

export default async function CalendarPage() {
  const { posts, articles } = await getCalendarData()

  return <CalendarPageView posts={posts} articles={articles} />
}
