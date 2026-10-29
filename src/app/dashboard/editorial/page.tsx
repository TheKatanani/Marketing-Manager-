import { getActiveUser } from "@/lib/active-user"
import { getEditorialCampaign, importNovemberPack } from "@/lib/editorial/service"
import { EditorialWorkspace } from "@/components/editorial/editorial-workspace"
import { novemberPack } from "@/lib/editorial/november-2026"

export const dynamic = "force-dynamic"

export default async function EditorialPage() {
  const user = await getActiveUser()
  let campaign = user ? await getEditorialCampaign(user.id) : null
  if (user && !campaign) {
    try {
      await importNovemberPack(user.id)
      campaign = await getEditorialCampaign(user.id)
    } catch (e) {
      console.error("Auto-import failed:", e)
    }
  }
  return <EditorialWorkspace campaign={campaign ? JSON.parse(JSON.stringify(campaign)) : null} strategy={novemberPack.strategy}/>
}
