import { getSocialAccounts } from "@/actions/account-actions"
import { AccountsPageView } from "@/components/accounts/accounts-page-view"

export const dynamic = "force-dynamic"

export default async function AccountsPage() {
  const accounts = await getSocialAccounts()

  return <AccountsPageView accounts={accounts} />
}
