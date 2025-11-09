import { AppSidebar } from "@/components/app-sidebar"
import { TransactionForm } from "@/components/transaction-form"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function TransaccionesPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <TransactionForm />
        </main>
      </div>
    </SidebarProvider>
  )
}
