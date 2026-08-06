import Link from "next/link";
import { Wine } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | The Founder's Vault",
};

export default function TermsPage() {
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
        <div className="mb-12">
          <h1 className="font-serif text-4xl text-primary mb-3">Terms and Conditions</h1>
          <p className="text-muted-foreground text-sm">Last updated July 29, 2026</p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">

          {/* Intro */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">Agreement to Our Legal Terms</h2>
            <p>We are <strong className="text-foreground">Sullivan Rutherford Estate</strong> ("Company," "we," "us," "our"). We operate the website{" "}
              <a href="https://www.foundersreserve.wine" className="text-primary hover:underline">foundersreserve.wine</a> (the "Site"), the mobile application Founder's Reserve (the "App"), and any other related products and services that refer or link to these legal terms (collectively, the "Services").
            </p>
            <p className="mt-3">
              You can contact us by phone at <a href="tel:+17072860149" className="text-primary hover:underline">(707) 286-0149</a>, email at{" "}
              <a href="mailto:jeff@sullivanwine.com" className="text-primary hover:underline">jeff@sullivanwine.com</a>, or by mail to 1090 Galleron Rd, St Helena, CA 94574, United States.
            </p>
            <p className="mt-3">
              These Legal Terms constitute a legally binding agreement between you and Sullivan Rutherford Estate concerning your access to and use of the Services. By accessing the Services, you confirm that you have read, understood, and agreed to be bound by all of these Legal Terms. <strong className="text-foreground uppercase">If you do not agree, you must discontinue use immediately.</strong>
            </p>
            <p className="mt-3">
              The Services are intended for users who are at least <strong className="text-foreground">18 years old</strong>. Persons under the age of 18 are not permitted to use or register for the Services.
            </p>
          </section>

          <hr className="border-border/30" />

          {/* TOC */}
          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">Table of Contents</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm columns-2">
              {[
                "Our Services","Intellectual Property Rights","User Representations",
                "User Registration","Prohibited Activities","User Generated Contributions",
                "Contribution License","Mobile Application License","Third-Party Websites and Content",
                "Services Management","Privacy Policy","Term and Termination",
                "Modifications and Interruptions","Governing Law","Dispute Resolution",
                "Corrections","Disclaimer","Limitations of Liability",
                "Indemnification","User Data","Electronic Communications",
                "California Users and Residents","Miscellaneous","Contact Us"
              ].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">1. Our Services</h2>
            <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation. Those who access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws.</p>
            <p className="mt-3">The Services are not tailored to comply with industry-specific regulations (HIPAA, FISMA, etc.). You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">2. Intellectual Property Rights</h2>
            <p>We are the owner or licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content").</p>
            <p className="mt-3">The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only. No part of the Services, Content, or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">3. User Representations</h2>
            <p>By using the Services, you represent and warrant that:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>All registration information you submit will be true, accurate, current, and complete</li>
              <li>You will maintain the accuracy of such information and promptly update it as necessary</li>
              <li>You have the legal capacity and agree to comply with these Legal Terms</li>
              <li>You are not a minor in the jurisdiction in which you reside (you are at least 18 years old)</li>
              <li>You will not access the Services through automated or non-human means</li>
              <li>You will not use the Services for any illegal or unauthorized purpose</li>
              <li>Your use of the Services will not violate any applicable law or regulation</li>
            </ul>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">4. User Registration</h2>
            <p>You may be required to register with the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">5. Prohibited Activities</h2>
            <p>You may not access or use the Services for any purpose other than that for which we make the Services available. As a user of the Services, you agree not to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Systematically retrieve data or other content from the Services to create a collection, compilation, database, or directory</li>
              <li>Trick, defraud, or mislead us and other users</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Services</li>
              <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services</li>
              <li>Use any information obtained from the Services in order to harass, abuse, or harm another person</li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct</li>
              <li>Use the Services in a manner inconsistent with any applicable laws or regulations</li>
              <li>Upload or transmit viruses or any other material that interferes with any party's uninterrupted use of the Services</li>
              <li>Attempt to impersonate another user or person or use the username of another user</li>
              <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services</li>
            </ul>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">6. User Generated Contributions</h2>
            <p>The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality. Any submissions you make must not be illegal, harassing, defamatory, obscene, or otherwise objectionable. We reserve the right to remove any contributions at our sole discretion.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">7. Contribution License</h2>
            <p>By posting your contributions to any part of the Services, you automatically grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right and license to use, copy, reproduce, distribute, sell, resell, publish, broadcast, retitle, store, publicly perform, publicly display, reformat, translate, excerpt, and exploit your contributions for any purpose.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">8. Mobile Application License</h2>
            <p>If you access the Services via the App, we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the App on wireless electronic devices owned or controlled by you, and to access and use the App on such devices strictly in accordance with these Legal Terms.</p>
            <p className="mt-3">You shall not: copy or adapt the App's source code; reverse engineer or attempt to derive the source code; make any modification, adaptation, improvement, enhancement, translation, or derivative work from the App; violate any applicable laws or regulations; remove any proprietary notice or label on the App; or use the App for any revenue-generating endeavor or commercial enterprise.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">9. Third-Party Websites and Content</h2>
            <p>The Services may contain links to third-party websites or services. We do not investigate, monitor, or check such third-party resources for accuracy and we are not responsible for any third-party materials accessed through the Services. Inclusion of, linking to, or permitting use of any third-party website does not imply approval or endorsement thereof by us.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">10. Services Management</h2>
            <p>We reserve the right, but not the obligation, to: monitor the Services for violations of these Legal Terms; take appropriate legal action against anyone who violates these Legal Terms; refuse, restrict access to, limit the availability of, or disable any of your contributions; remove from the Services or otherwise disable any files and content that are excessive in size or are in any way burdensome to our systems; and otherwise manage the Services to protect our rights and property.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">11. Privacy Policy</h2>
            <p>We care about data privacy and security. Please review our{" "}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms.
            </p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">12. Term and Termination</h2>
            <p>These Legal Terms shall remain in full force and effect while you use the Services. We reserve the right to, in our sole discretion and without notice or liability, deny access to and use of the Services (including blocking certain IP addresses) to any person for any reason or no reason, including without limitation for breach of any representation, warranty, or covenant contained in these Legal Terms or of any applicable law or regulation.</p>
            <p className="mt-3">If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">13. Modifications and Interruptions</h2>
            <p>We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Services without notice. We will not be liable to you for any modification, suspension, or discontinuance of the Services.</p>
            <p className="mt-3">We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems requiring maintenance. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time without notice.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">14. Governing Law</h2>
            <p>These Legal Terms are governed by and interpreted following the laws of the State of California, and the use of the United Nations Convention of Contracts for the International Sales of Goods is expressly excluded. If your habitual residence is in the EU, and you are a consumer, you additionally possess the protection provided by the mandatory provisions of the law of your country of residence.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">15. Dispute Resolution</h2>
            <p>To expedite resolution and control the cost of any dispute, you and the Company agree to first attempt to negotiate any dispute informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one party to the other.</p>
            <p className="mt-3">If informal negotiations are unsuccessful, the dispute shall be finally resolved by binding arbitration. The arbitration shall be initiated through the American Arbitration Association (AAA) under its Commercial Arbitration Rules. The arbitration may be conducted in person, through the submission of documents, by phone, or online. The arbitrator will make a decision in writing.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">16. Corrections</h2>
            <p>There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">17. Disclaimer</h2>
            <p className="uppercase text-sm">The services are provided on an as-is and as-available basis. You agree that your use of the services will be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the services and your use thereof, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">18. Limitations of Liability</h2>
            <p className="uppercase text-sm">In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the services, even if we have been advised of the possibility of such damages.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">19. Indemnification</h2>
            <p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of your use of the Services, breach of these Legal Terms, or violation of the rights of a third party.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">20. User Data</h2>
            <p>We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">21. Electronic Communications, Transactions, and Signatures</h2>
            <p>Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically satisfy any legal requirement that such communication be in writing.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">22. California Users and Residents</h2>
            <p>If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">23. Miscellaneous</h2>
            <p>These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. There is no joint venture, partnership, employment, or agency relationship created between you and us as a result of these Legal Terms or use of the Services.</p>
          </section>

          <hr className="border-border/30" />

          <section>
            <h2 className="font-serif text-2xl text-primary mb-4">24. Contact Us</h2>
            <p>To resolve a complaint regarding the Services or to receive further information, please contact us at:</p>
            <address className="mt-4 not-italic bg-card border border-border/50 rounded-xl p-6 text-sm">
              <strong className="text-foreground">Sullivan Rutherford Estate</strong><br />
              1090 Galleron Rd<br />
              St Helena, CA 94574<br />
              United States<br />
              <br />
              Phone: <a href="tel:+17072860149" className="text-primary hover:underline">(+1) 707-286-0149</a><br />
              Email: <a href="mailto:jeff@sullivanwine.com" className="text-primary hover:underline">jeff@sullivanwine.com</a>
            </address>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-16 py-8">
        <div className="container mx-auto px-6 text-center text-xs text-muted-foreground space-x-4">
          <span>© {new Date().getFullYear()} Sullivan Rutherford Estate. All rights reserved.</span>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
        </div>
      </footer>
    </div>
  );
}
