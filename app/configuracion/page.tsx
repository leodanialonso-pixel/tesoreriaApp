import { AppSidebar } from "@/components/app-sidebar"
import { ConfigSection } from "@/components/config-section"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function ConfiguracionPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <ConfigSection />
        </main>
      </div>
    </SidebarProvider>
  )
}
