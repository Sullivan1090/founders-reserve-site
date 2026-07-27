import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { tierAllows, TIER_LABELS } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock, ArrowLeft, Droplets, CalendarDays, CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";

export default async function ReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  const { data: profile } = await supabase.from("profiles").select("membership_tier").eq("id", user.id).single();
  const userTier = profile?.membership_tier || "basic";
  
  const { data: release } = await supabase.from("releases").select("*").eq("slug", slug).single();
  
  if (!release) {
    notFound();
  }
  
  const hasAccess = tierAllows(userTier, release.required_tier);
  
  if (!hasAccess) {
    return (
      <div className="container mx-auto px-6 py-24 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-md w-full text-center space-y-6 bg-card p-12 rounded-2xl shadow-xl border border-border/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
          <div className="mx-auto w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6 border border-border">
            <Lock className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="font-serif text-3xl text-primary">Restricted Allocation</h1>
          <p className="text-muted-foreground leading-relaxed">
            This release is reserved exclusively for members of the <span className="font-semibold text-foreground">{TIER_LABELS[release.required_tier]}</span> tier and above.
          </p>
          <div className="pt-8 mt-8 border-t border-border/50">
            <Button className="w-full h-12 text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
              Upgrade Membership
            </Button>
          </div>
          <Link href="/members/releases" className="inline-block mt-4 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Return to all releases
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <article className="pb-24">
      {/* Hero section */}
      <div className="relative h-[55vh] min-h-[450px] w-full bg-secondary flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
        {release.thumbnail_url ? (
           <Image src={release.thumbnail_url} alt={release.title} fill className="object-cover opacity-70 mix-blend-luminosity" priority />
        ) : (
           <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-secondary/90 mix-blend-multiply" />
        )}
        
        <div className="container mx-auto px-6 relative z-20 pb-16">
          <Link href="/members/releases" className="inline-flex items-center text-white/60 hover:text-white transition-colors text-sm mb-10 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cellar
          </Link>
          <div className="flex flex-wrap gap-3 mb-5">
            <Badge className="bg-accent text-accent-foreground border-none px-3 py-1 shadow-md">
              {TIER_LABELS[release.required_tier]} Allocation
            </Badge>
            <Badge variant="outline" className="text-white border-white/20 backdrop-blur-md px-3 py-1 bg-black/20">
              <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
              {new Date(release.release_date).getFullYear()}
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white max-w-4xl leading-[1.1] tracking-tight">
            {release.title}
          </h1>
        </div>
      </div>
      
      <div className="container mx-auto px-6 pt-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            {release.description && (
              <p className="text-2xl text-muted-foreground font-serif italic leading-relaxed pl-6 border-l-4 border-accent">
                "{release.description}"
              </p>
            )}
            
            <div className="prose prose-stone prose-lg max-w-none 
              prose-headings:font-serif prose-headings:text-primary 
              prose-p:text-foreground/80 prose-p:leading-loose prose-p:mb-8
              prose-strong:text-foreground prose-strong:font-semibold">
              {release.content ? (
                <div dangerouslySetInnerHTML={{ __html: release.content.replace(/\n/g, '<br/>') }} />
              ) : (
                <p>Tasting notes for this release are being finalized by our master sommelier. Detailed profiles covering terroir, vinification, and precise tasting notes will be published shortly.</p>
              )}
            </div>
            
            {release.video_url && (
              <div className="mt-16 pt-12 border-t border-border/50">
                <h3 className="font-serif text-3xl text-primary mb-8 flex items-center">
                  <Droplets className="w-6 h-6 mr-3 text-accent" />
                  Tasting Masterclass
                </h3>
                <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-border/20">
                  <iframe 
                    src={release.video_url} 
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-card p-8 rounded-2xl shadow-xl border border-border/50 sticky top-28">
              <h4 className="font-serif text-2xl text-primary mb-6 border-b border-border/50 pb-4">Allocation Details</h4>
              <ul className="space-y-5 text-sm mb-10">
                <li className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-secondary flex items-center bg-secondary/10 px-2 py-1 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Available
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-muted-foreground">Release Date</span>
                  <span className="font-medium text-foreground">{new Date(release.release_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-muted-foreground">Max Quantity</span>
                  <span className="font-medium text-foreground">3 Bottles per member</span>
                </li>
              </ul>
              
              <Button className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all hover:-translate-y-0.5">
                Secure Allocation <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-5 leading-relaxed">
                Ships in climate-controlled packaging.<br/> Signature required upon delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
