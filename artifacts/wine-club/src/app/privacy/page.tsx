import Link from "next/link";
import { Wine } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | The Founder's Vault",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-secondary text-foreground">
      {/* Header */}
      <header className="border-b border-border/30 bg-secondary/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Wine className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg text-primary">The Founder's Vault</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 max-w-3xl">
        {/* Title */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl text-primary mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated July 29, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">

          {/* Intro */}
          <section>
            <p>
              This Privacy Notice for <strong className="text-foreground">Sullivan Rutherford Estate</strong> ("we," "us," or "our") describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li>Visit our website at <a href="https://www.foundersreserve.wine" className="text-primary hover:underline">foundersreserve.wine</a> or any website of ours that links to this Privacy Notice</li>
              <li>Download and use our mobile application (Founder's Reserve), or any other application of ours that links to this Privacy Notice</li>
              <li>Use Founder's Reserve — a members-only website for J.O. Sullivan Founder's Reserve wine club allocation members providing exclusive video content, release updates, tasting notes, and vintage reviews. The site does not process payments or sell products directly; members are directed to our main website for purchases.</li>
              <li>Engage with us in other related ways, including any marketing or events</li>
            </ul>
            <p className="mt-4">
              Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you have questions, contact us at{" "}
              <a href="mailto:Sullivan@sullivanwine.com" className="text-primary hover:underline">Sullivan@sullivanwine.com</a>.
            </p>
          </section>

          <hr className="border-border/30" />

          {/* Summary */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">Summary of Key Points</h2>
            <div className="space-y-4">
              <p><strong className="text-foreground">What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us, the choices you make, and the products and features you use.</p>
              <p><strong className="text-foreground">Do we process sensitive personal information?</strong> We do not process sensitive personal information.</p>
              <p><strong className="text-foreground">Do we collect information from third parties?</strong> We do not collect any information from third parties.</p>
              <p><strong className="text-foreground">How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</p>
              <p><strong className="text-foreground">How do we keep your information safe?</strong> We have organizational and technical processes in place to protect your personal information. However, no electronic transmission over the internet can be guaranteed 100% secure.</p>
              <p><strong className="text-foreground">What are your rights?</strong> Depending on your location, applicable privacy law may give you certain rights regarding your personal information.</p>
            </div>
          </section>

          <hr className="border-border/30" />

          {/* Section 1 */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">1. What Information Do We Collect?</h2>
            <p><strong className="text-foreground">Personal information you disclose to us.</strong> We collect personal information that you voluntarily provide when you register on the Services, express an interest in obtaining information about us or our products, or otherwise contact us.</p>
            <p className="mt-3">The personal information we collect may include: name, email address, and any other information you choose to provide.</p>
            <p className="mt-3"><strong className="text-foreground">Sensitive information.</strong> We do not process sensitive information.</p>
            <p className="mt-3"><strong className="text-foreground">Information automatically collected.</strong> We automatically collect certain information when you visit, use, or navigate the Services. This includes IP address, browser and device characteristics, operating system, language preferences, referring URLs, and information about how and when you use our Services.</p>
          </section>

          <hr className="border-border/30" />

          {/* Section 2 */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">2. How Do We Process Your Information?</h2>
            <p>We process your personal information for the following reasons:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>To facilitate account creation and authentication</li>
              <li>To deliver and facilitate delivery of services to the user</li>
              <li>To respond to user inquiries and offer support</li>
              <li>To send administrative information such as changes to our terms and policies</li>
              <li>To protect our Services, including fraud monitoring and prevention</li>
              <li>To comply with our legal obligations</li>
            </ul>
          </section>

          <hr className="border-border/30" />

          {/* Section 3 */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">3. When and With Whom Do We Share Your Information?</h2>
            <p>We may share your information in the following situations:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><strong className="text-foreground">Business transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
              <li><strong className="text-foreground">With your consent.</strong> We may disclose your personal information for any other purpose with your consent.</li>
            </ul>
          </section>

          <hr className="border-border/30" />

          {/* Section 4 */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">4. How Long Do We Keep Your Information?</h2>
            <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law. When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it.</p>
          </section>

          <hr className="border-border/30" />

          {/* Section 5 */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">5. How Do We Keep Your Information Safe?</h2>
            <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. We cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security.</p>
          </section>

          <hr className="border-border/30" />

          {/* Section 6 */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">6. Your Privacy Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Request access to and obtain a copy of your personal information</li>
              <li>Request rectification or erasure of your personal information</li>
              <li>Restrict the processing of your personal information</li>
              <li>Data portability (where applicable)</li>
              <li>Opt out of the sale of your personal data or targeted advertising</li>
              <li>Non-discrimination for exercising your rights</li>
            </ul>
            <p className="mt-4">To exercise these rights, contact us at <a href="mailto:Sullivan@sullivanwine.com" className="text-primary hover:underline">Sullivan@sullivanwine.com</a>.</p>
          </section>

          <hr className="border-border/30" />

          {/* Section 7 - US State Rights */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">7. US State Privacy Rights</h2>
            <p>California residents may have additional rights under the California Consumer Privacy Act (CCPA) and California's "Shine the Light" law (Civil Code Section 1798.83), including the right to request information about categories of personal information disclosed to third parties for direct marketing purposes.</p>
            <p className="mt-3">To make such a request, please contact us using the details provided in Section 11 below.</p>
          </section>

          <hr className="border-border/30" />

          {/* Section 8 */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">8. Do We Make Updates to This Notice?</h2>
            <p>Yes, we will update this notice as necessary to stay compliant with relevant laws. The updated version will be indicated by an updated date at the top of this Privacy Notice. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.</p>
          </section>

          <hr className="border-border/30" />

          {/* Section 9 - Contact */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">9. How Can You Contact Us?</h2>
            <p>If you have questions or comments about this notice, you may contact our Data Protection Officer by email at <a href="mailto:jeff@sullivanwine.com" className="text-primary hover:underline">jeff@sullivanwine.com</a> or by phone at +1 (707) 286-0149, or by mail at:</p>
            <address className="mt-4 not-italic bg-card border border-border/50 rounded-xl p-6 text-sm">
              <strong className="text-foreground">Sullivan Rutherford Estate</strong><br />
              Data Protection Officer<br />
              1090 Galleron Rd<br />
              St Helena, CA 94574<br />
              United States
            </address>
          </section>

          <hr className="border-border/30" />

          {/* Section 10 - Data Request */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">10. How Can You Review, Update, or Delete Your Data?</h2>
            <p>Based on applicable laws, you may have the right to request access to the personal information we collect from you, correct inaccuracies, or request deletion. To do so, contact us at <a href="mailto:Sullivan@sullivanwine.com" className="text-primary hover:underline">Sullivan@sullivanwine.com</a>.</p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-16 py-8">
        <div className="container mx-auto px-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sullivan Rutherford Estate. All rights reserved.{" "}
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
