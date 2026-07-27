import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { tierAllows, TIER_LABELS, type Release } from "@/lib/types";
import { Lock, Calendar, Grape } from "lucide-react";

export default async function ReleasesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data: profile } = await supabase.from("profiles").select("membership_tier").eq("id", user.id).single();
  const userTier = profile?.membership_tier || "basic";
  
  const { data: releases } = await supabase.from("releases").select("*").order("release_date", { ascending: false });
  
  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">Cellar Releases</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Curated allocations and exclusive vintages, unlocked based on your membership tier. 
          Each release represents the pinnacle of its respective appellation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {releases?.map((release: Release) => {
          const hasAccess = tierAllows(userTier, release.required_tier);
          
          return (
            <Card key={release.id} className={`overflow-hidden group flex flex-col h-full bg-card shadow-sm transition-all duration-300 relative rounded-xl border ${hasAccess ? 'hover:shadow-xl hover:border-primary/30 border-border/50' : 'border-border/30 opacity-90 hover:opacity-100'}`}>
              <div className="relative aspect-[4/3] bg-gradient-to-tr from-secondary to-[#2c3e2e] overflow-hidden">
                 {/* Visual placeholder for bottle */}
                 <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent mix-blend-overlay" />
                 
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                   <Grape className="w-48 h-48 text-white rotate-[-15deg]" />
                 </div>
                 
                 <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                   <Badge variant={hasAccess ? "default" : "secondary"} className={`shadow-md border-none ${hasAccess ? "bg-accent text-accent-foreground" : "bg-black/60 text-white backdrop-blur-md"}`}>
                     {TIER_LABELS[release.required_tier]} Tier
                   </Badge>
                 </div>
                 
                 {!hasAccess && (
                   <div className="absolute inset-0 bg-background/50 backdrop-blur-[4px] flex items-center justify-center z-10 transition-all">
                     <div className="bg-background/95 p-5 rounded-full shadow-2xl border border-border/50 flex flex-col items-center justify-center">
                       <Lock className="w-8 h-8 text-muted-foreground mb-1" />
                     </div>
                   </div>
                 )}
              </div>
              <CardContent className="p-8 flex-1 flex flex-col relative z-20 bg-card">
                <div className="flex items-center text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-widest">
                  <Calendar className="w-3 h-3 mr-2" />
                  {new Date(release.release_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>
                <h3 className="font-serif text-2xl mb-4 leading-tight">{release.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-8 flex-1 leading-relaxed">
                  {release.description}
                </p>
                {hasAccess ? (
                  <Link href={`/members/releases/${release.slug}`}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-base">
                      View Allocation
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" className="w-full h-11 text-base border-dashed border-border/80 text-muted-foreground bg-muted/20" disabled>
                    <Lock className="w-4 h-4 mr-2" /> Upgrade Required
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
