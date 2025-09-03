import { Container } from "@/components/Container"
import { Section } from "@/components/Section"
import { generateSEO } from "@/lib/seo"

export const metadata = generateSEO({
  title: "Terms of Service",
  description: "PRPS terms of service and usage guidelines.",
  path: "/terms"
})

export default function TermsPage() {
  return (
    <Section className="pt-24">
      <Container>
        <div className="mx-auto max-w-4xl prose prose-slate dark:prose-invert">
          <h1>Terms of Service</h1>
          <p className="lead">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using the PRPS website, you accept and agree to be bound by the 
            terms and provision of this agreement.
          </p>

          <h2>Services Description</h2>
          <p>
            PRPS provides fitness and workout program information, community building, and 
            facilitates connections to external purchase platforms. Our workout plans are 
            sold through Lynk.id&apos;s platform.
          </p>

          <h3>Workout Programs</h3>
          <ul>
            <li>All workout plans are created by certified fitness professionals</li>
            <li>Programs are for informational and educational purposes</li>
            <li>Individual results may vary based on effort, consistency, and personal factors</li>
            <li>Always consult with healthcare providers before starting any fitness program</li>
          </ul>

          <h2>External Services</h2>
          <p>
            PRPS workout plans are sold exclusively through Lynk.id. When you click &ldquo;Get via Lynk.id&rdquo; 
            or similar purchase links, you will be directed to Lynk.id&apos;s platform where separate 
            terms and conditions apply.
          </p>

          <h3>Payment and Refunds</h3>
          <ul>
            <li>All payments are processed by Lynk.id</li>
            <li>Refund policies are governed by Lynk.id&apos;s terms of service</li>
            <li>PRPS does not directly process payments or handle refund requests</li>
          </ul>

          <h2>User Responsibilities</h2>
          <p>Users agree to:</p>
          <ul>
            <li>Provide accurate information when submitting forms</li>
            <li>Use the website in accordance with applicable laws</li>
            <li>Not misuse or attempt to disrupt our services</li>
            <li>Respect intellectual property rights</li>
          </ul>

          <h2>Health and Safety Disclaimer</h2>
          <p>
            <strong>Important:</strong> Before beginning any fitness program, consult with your 
            physician or healthcare provider. PRPS programs are not intended to replace professional 
            medical advice, diagnosis, or treatment.
          </p>
          <p>
            Users participate in workout programs at their own risk. PRPS is not responsible for 
            injuries that may occur during exercise.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on the PRPS website, including text, graphics, logos, and workout programs, 
            is the property of PRPS and is protected by intellectual property laws.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            PRPS shall not be liable for any indirect, incidental, special, consequential, or 
            punitive damages related to your use of the website or workout programs.
          </p>

          <h2>Modifications to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be posted on 
            this page with an updated revision date.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms are governed by the laws of Indonesia. Any disputes will be resolved 
            in accordance with Indonesian law.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us through our social 
            media channels or via the collaboration form on our website.
          </p>
        </div>
      </Container>
    </Section>
  )
}