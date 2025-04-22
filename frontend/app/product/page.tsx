import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Zap, Globe, BarChart, Layers, ArrowRight } from "lucide-react"

export default function ProductPage() {
  const features = [
    {
      icon: Zap,
      title: "Visual Workflow Builder",
      description: "Create complex workflows with our intuitive drag-and-drop interface. No coding required.",
    },
    {
      icon: Globe,
      title: "100+ Integrations",
      description: "Connect with all your favorite tools and services, from CRMs to marketing platforms.",
    },
    {
      icon: Layers,
      title: "Ready-made Templates",
      description: "Get started quickly with pre-built templates for common business processes.",
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description: "Gain insights into your workflows with detailed performance metrics and reports.",
    },
  ]

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      description: "For individuals and small projects",
      features: ["5 active workflows", "100 actions per month", "Basic integrations", "Community support"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For professionals and growing teams",
      features: [
        "25 active workflows",
        "10,000 actions per month",
        "All integrations",
        "Priority support",
        "Workflow versioning",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Business",
      price: "$99",
      period: "per month",
      description: "For businesses with complex needs",
      features: [
        "Unlimited workflows",
        "100,000 actions per month",
        "Advanced security",
        "Dedicated support",
        "Custom integrations",
        "Team collaboration",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const useCases = [
    {
      title: "Customer Onboarding",
      description:
        "Streamline your customer onboarding process with automated welcome emails, account setup, and follow-ups.",
    },
    {
      title: "Approval Processes",
      description: "Create multi-step approval workflows for expenses, content publishing, or any business process.",
    },
    {
      title: "Data Synchronization",
      description: "Keep your data in sync across multiple platforms automatically, eliminating manual updates.",
    },
    {
      title: "Lead Nurturing",
      description: "Build sophisticated lead nurturing campaigns that respond to prospect behavior.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Automate Your Workflows with FlowPilot</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          The intelligent workflow automation platform that helps teams work smarter, not harder.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">Get Started for Free</Button>
          <Button size="lg" variant="outline">
            Book a Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to automate your business processes and boost productivity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, index) => (
            <Card key={index} className={`border ${tier.popular ? "border-primary shadow-lg relative" : ""}`}>
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.period && <span className="ml-1 text-muted-foreground">{tier.period}</span>}
                </div>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${tier.popular ? "bg-primary" : ""}`}
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Common Use Cases</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how businesses like yours are using FlowPilot to streamline operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="border">
              <CardHeader>
                <CardTitle>{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{useCase.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="p-0 h-auto">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
