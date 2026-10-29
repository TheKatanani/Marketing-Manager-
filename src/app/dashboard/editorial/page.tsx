import { getActiveUser } from "@/lib/active-user"
import { getEditorialCampaign, importNovemberPack, ensureDatabaseSchema } from "@/lib/editorial/service"
import { EditorialWorkspace } from "@/components/editorial/editorial-workspace"
import { novemberPack } from "@/lib/editorial/november-2026"

export const dynamic = "force-dynamic"

export default async function EditorialPage() {
  const user = await getActiveUser()
  let campaign = null

  if (user) {
    try {
      await ensureDatabaseSchema()
      campaign = await getEditorialCampaign(user.id)
      if (!campaign) {
        await importNovemberPack(user.id)
        campaign = await getEditorialCampaign(user.id)
      }
    } catch (e) {
      console.error("Editorial page load error:", e)
      try {
        await importNovemberPack(user.id)
        campaign = await getEditorialCampaign(user.id)
      } catch (err2) {
        console.error("Editorial retry error:", err2)
      }
    }
  }

  return (
    <EditorialWorkspace
      campaign={campaign ? JSON.parse(JSON.stringify(campaign)) : null}
      strategy={novemberPack.strategy}
    />
  )
}
