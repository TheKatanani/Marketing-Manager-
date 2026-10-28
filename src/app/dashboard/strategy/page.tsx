import { getBrandProfile } from "@/actions/brand-actions"
import { StrategyPageView } from "@/components/strategy/strategy-page-view"

export const dynamic = "force-dynamic"

export default async function StrategyPage() {
  const profile = await getBrandProfile()

  return <StrategyPageView profile={profile} />
}
