import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, Wine, Map, Award } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="absolute top-0 w-full z-50 px-6 py-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-serif text-2xl text-primary drop-shadow-sm flex items-center gap-2">
            <Wine className="w-6 h-6" />
            The Vintage Circle
          </div>
          <Link href="/login">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-sm bg-black/20">
              Member Portal
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-secondary/80 to-background mix-blend-multiply z-10" />
          {/* Abstract wine cellar / glass visual */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 via-secondary to-black opacity-80" />
        </div>
        
        <div className="container relative z-20 px-6 pt-32 pb-20 text-center">
          <FadeIn>
            <span className="uppercase tracking-[0.3em] text-accent font-medium text-sm mb-6 block">
              Beyond the Label
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white max-w-5xl mx-auto leading-[1.1] mb-8">
              A sanctuary for those who <i className="text-accent/90">love wine deeply.</i>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Exclusive allocations, cellar masterclasses, and an uncompromising dedication to the world's finest vintages.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <Link href="/login">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]">
                Request Membership <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-32 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="font-serif text-4xl text-primary mb-6">The Art of Connoisseurship</h2>
              <p className="text-muted-foreground text-lg">
                We believe wine is not meant to be collected; it is meant to be understood, experienced, and remembered.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <Wine className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl mb-4">Curated Allocations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Quarterly shipments sourced directly from family-owned estates and iconic châteaux, bypassing the retail market entirely.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl mb-4">The Video Library</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cinematic masterclasses with sommeliers and winemakers. Learn the terroir, the history, and the art of tasting.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <Map className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl mb-4">Cellar Access</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Unlock deep-vintage library wines normally reserved for restaurants and private collectors.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="py-32 bg-secondary text-secondary-foreground relative border-y border-border/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="font-serif text-4xl md:text-5xl text-accent mb-6">Membership Tiers</h2>
              <p className="text-white/70 text-lg">
                Choose the level of immersion that matches your cellar.
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic */}
            <FadeIn delay={0.2} className="h-full">
              <div className="bg-background text-foreground p-10 flex flex-col h-full rounded-xl border border-border shadow-lg">
                <div className="uppercase tracking-widest text-xs font-bold text-muted-foreground mb-4">Basic Tier</div>
                <h3 className="font-serif text-3xl text-primary mb-2">Enthusiast</h3>
                <div className="text-4xl font-light mb-8">$150 <span className="text-lg text-muted-foreground">/qtr</span></div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-accent shrink-0" /> <span>3 Curated bottles quarterly</span></li>
                  <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-accent shrink-0" /> <span>Access to Library video content</span></li>
                  <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-accent shrink-0" /> <span>Standard tasting notes</span></li>
                </ul>
                <Link href="/login" className="mt-auto">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">Join Waitlist</Button>
                </Link>
              </div>
            </FadeIn>

            {/* Premium */}
            <FadeIn delay={0.4} className="h-full relative md:-mt-8 md:-mb-8 z-10">
              <div className="bg-primary text-primary-foreground p-10 flex flex-col h-full rounded-xl border border-primary-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-xs font-bold tracking-widest rounded-bl-lg">Most Popular</div>
                <div className="uppercase tracking-widest text-xs font-bold text-primary-foreground/70 mb-4">Premium Tier</div>
                <h3 className="font-serif text-3xl mb-2 text-white">Collector</h3>
                <div className="text-4xl font-light mb-8 text-white">$450 <span className="text-lg text-primary-foreground/70">/qtr</span></div>
                <ul className="space-y-4 mb-10 flex-1 text-primary-foreground/90">
                  <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-accent shrink-0" /> <span>6 Premium bottles quarterly</span></li>
                  <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-accent shrink-0" /> <span>Full access to Video Library</span></li>
                  <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-accent shrink-0" /> <span>Access to exclusive Premium releases</span></li>
                  <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-accent shrink-0" /> <span>Priority allocation shipping</span></li>
                </ul>
                <Link href="/login" className="mt-auto">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 border-none" size="lg">Join Waitlist</Button>
                </Link>
              </div>
            </FadeIn>

            {/* Elite */}
            <FadeIn delay={0.6} className="h-full">
              <div className="bg-background text-foreground p-10 flex flex-col h-full rounded-xl border border-border shadow-lg">
                <div className="uppercase tracking-widest text-xs font-bold text-muted-foreground mb-4">Elite Tier</div>
                <h3 className="font-serif text-3xl text-primary mb-2">Cellar Master</h3>
                <div className="text-4xl font-light mb-8">$1,200 <span className="text-lg text-muted-foreground">/qtr</span></div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-accent shrink-0" /> <span>12 Grand Cru & Rare bottles</span></li>
                  <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-accent shrink-0" /> <span>Access to all Elite allocations</span></li>
                  <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-accent shrink-0" /> <span>1-on-1 Sommelier consultation</span></li>
                  <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-accent shrink-0" /> <span>Private estate tour invitations</span></li>
                </ul>
                <Link href="/login" className="mt-auto">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">Inquire</Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 border-t border-border/50">
        <div className="container mx-auto px-6 text-center">
          <div className="font-serif text-2xl text-primary mb-6 flex items-center justify-center gap-2">
            <Wine className="w-5 h-5" />
            The Vintage Circle
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} The Vintage Circle. All rights reserved.<br/>
            Please enjoy responsibly.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary text-xs transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
