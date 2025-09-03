import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Privacy Policy",
  description: "PRPS privacy policy and data protection information.",
  path: "/privacy"
})

export default function PrivacyPage() {
  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-4xl prose prose-slate dark:prose-invert">
          <h1>Privacy Policy</h1>
          <p className="lead">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>Information We Collect</h2>
          <p>
            PRPS (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects information you provide directly to us, 
            such as when you subscribe to our newsletter or submit a collaboration form.
          </p>

          <h3>Information You Provide</h3>
          <ul>
            <li>Name and email address</li>
            <li>Contact and demographic information</li>
            <li>Communications and feedback</li>
          </ul>

          <h3>Information We Collect Automatically</h3>
          <ul>
            <li>Device and browser information</li>
            <li>Website usage data and analytics</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Send you updates and marketing communications</li>
            <li>Respond to your inquiries and requests</li>
            <li>Analyze website usage and optimize performance</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties 
            without your consent, except as described in this policy or as required by law.
          </p>

          <h2>External Services</h2>
          <p>
            Our workout plans are sold through Lynk.id. When you purchase a plan, you will be 
            directed to Lynk.id&apos;s platform, which has its own privacy policy and terms of service.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us through our 
            social media channels or via the collaboration form.
          </p>
        </div>
      </Container>
    </Section>
  )
}