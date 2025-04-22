"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MessageSquare, FileText, LayoutDashboard, BarChart3 } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Chat",
      href: "/",
      icon: MessageSquare,
    },
    {
      name: "Product",
      href: "/product",
      icon: LayoutDashboard,
    },
    {
      name: "Documentation",
      href: "/docs",
      icon: FileText,
    },
    {
      name: "Admin",
      href: "/admin",
      icon: BarChart3,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">FlowPilot</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Log in
          </Button>
          <Button size="sm">Sign up</Button>
        </div>
      </div>
    </header>
  )
}
