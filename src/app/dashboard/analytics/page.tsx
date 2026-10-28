import { getAnalyticsSummary } from "@/actions/analytics-actions"
import { AnalyticsPageView } from "@/components/analytics/analytics-page-view"

export const dynamic = "force-dynamic"

export default async function AnalyticsPage() {
  const summary = await getAnalyticsSummary()

  if (!summary) return null

  return <AnalyticsPageView summary={summary} />
}
