import { AppSidebar } from "@/components/app-sidebar"
import { ReportsSection } from "@/components/reports-section"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function ReportesPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <ReportsSection />
        </main>
      </div>
    </SidebarProvider>
  )
}
