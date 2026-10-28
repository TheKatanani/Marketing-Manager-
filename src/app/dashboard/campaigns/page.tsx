import { getCampaigns } from "@/actions/campaign-actions"
import { CampaignsPageView } from "@/components/campaigns/campaigns-page-view"

export const dynamic = "force-dynamic"

export default async function CampaignsPage() {
  const campaigns = await getCampaigns()

  return <CampaignsPageView campaigns={campaigns} />
}
