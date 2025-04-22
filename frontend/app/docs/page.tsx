"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, BookOpen, CreditCard, HelpCircle, Code, Settings } from "lucide-react"

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: BookOpen,
      articles: [
        {
          id: "quick-start",
          title: "Quick Start Guide",
          excerpt: "Get up and running with FlowPilot in under 5 minutes.",
        },
        {
          id: "installation",
          title: "Installation",
          excerpt: "Learn how to install and configure FlowPilot for your organization.",
        },
        {
          id: "key-concepts",
          title: "Key Concepts",
          excerpt: "Understand the core concepts behind FlowPilot's workflow automation.",
        },
      ],
    },
    {
      id: "api",
      name: "API Documentation",
      icon: Code,
      articles: [
        { id: "authentication", title: "Authentication", excerpt: "Learn how to authenticate with the FlowPilot API." },
        { id: "workflows", title: "Workflows API", excerpt: "Create and manage workflows programmatically." },
        { id: "webhooks", title: "Webhooks", excerpt: "Set up webhooks to receive real-time updates from FlowPilot." },
      ],
    },
    {
      id: "billing",
      name: "Billing",
      icon: CreditCard,
      articles: [
        {
          id: "pricing",
          title: "Pricing Details",
          excerpt: "Detailed breakdown of pricing tiers and included features.",
        },
        {
          id: "invoices",
          title: "Invoices and Receipts",
          excerpt: "How to access and understand your billing documents.",
        },
        { id: "usage", title: "Usage Tracking", excerpt: "Monitor your FlowPilot usage to optimize costs." },
      ],
    },
    {
      id: "troubleshooting",
      name: "Troubleshooting",
      icon: HelpCircle,
      articles: [
        { id: "common-issues", title: "Common Issues", excerpt: "Solutions to frequently encountered problems." },
        { id: "error-codes", title: "Error Codes", excerpt: "Detailed explanations of FlowPilot error codes." },
        {
          id: "support",
          title: "Getting Support",
          excerpt: "How to contact our support team and what information to provide.",
        },
      ],
    },
    {
      id: "advanced",
      name: "Advanced Configuration",
      icon: Settings,
      articles: [
        {
          id: "custom-integrations",
          title: "Custom Integrations",
          excerpt: "Build your own integrations with the FlowPilot SDK.",
        },
        {
          id: "security",
          title: "Security Settings",
          excerpt: "Configure security options for your FlowPilot account.",
        },
        {
          id: "performance",
          title: "Performance Optimization",
          excerpt: "Tips for optimizing your workflows for maximum efficiency.",
        },
      ],
    },
  ]

  // Filter articles based on search query
  const filteredCategories = searchQuery
    ? categories
        .map((category) => ({
          ...category,
          articles: category.articles.filter(
            (article) =>
              article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.articles.length > 0)
    : categories

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Documentation</h1>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documentation..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="getting-started">
          <TabsList className="grid grid-cols-5 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid gap-4">
                <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>

                {filteredCategories.some((c) => c.id === category.id) ? (
                  filteredCategories
                    .find((c) => c.id === category.id)
                    ?.articles.map((article) => (
                      <Card key={article.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <CardHeader>
                          <CardTitle>{article.title}</CardTitle>
                          <CardDescription>{article.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-end">
                          <Button variant="ghost" size="sm">
                            Read more
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No articles found matching your search.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
