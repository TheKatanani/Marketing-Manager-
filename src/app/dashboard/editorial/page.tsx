import { getActiveUser } from "@/lib/active-user"
import { getEditorialCampaign } from "@/lib/editorial/service"
import { EditorialWorkspace } from "@/components/editorial/editorial-workspace"
import { novemberPack } from "@/lib/editorial/november-2026"
export const dynamic="force-dynamic"
export default async function EditorialPage() {
  const user=await getActiveUser()
  const campaign=user?await getEditorialCampaign(user.id):null
  return <EditorialWorkspace campaign={campaign?JSON.parse(JSON.stringify(campaign)):null} strategy={novemberPack.strategy}/>
}
