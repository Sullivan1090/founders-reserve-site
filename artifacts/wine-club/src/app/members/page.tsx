import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const category = params.category || "All";
  
  const supabase = await createClient();
  let query = supabase.from("videos").select("*").order("created_at", { ascending: false });
  
  if (category !== "All") {
    query = query.eq("category", category);
  }
  
  const { data: videos } = await query;
  
  const categories = ["All", "Tasting", "Pairing", "Cellar", "Education"];
  
  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">The Library</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Exclusive access to masterclasses, guided tastings, and cellar tours. 
          Uncover the stories behind the world's most exceptional vintages directly from the winemakers themselves.
        </p>
      </div>
      
      {/* Category Tabs */}
      <div className="flex gap-4 mb-10 overflow-x-auto pb-4 hide-scrollbar">
        {categories.map(cat => (
          <Link 
            key={cat} 
            href={`/members?category=${cat}`} 
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
              cat === category 
                ? "bg-primary text-primary-foreground border-primary shadow-md" 
                : "border-border/60 hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-card"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos?.map(video => (
          <Card key={video.id} className="overflow-hidden bg-card border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group rounded-xl">
            <div className="relative aspect-[16/9] bg-gradient-to-br from-primary to-secondary overflow-hidden">
               {video.thumbnail_url ? (
                 <Image 
                   src={video.thumbnail_url} 
                   alt={video.title} 
                   fill 
                   className="object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
                 />
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center opacity-60 mix-blend-overlay bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent">
                   <Play className="w-16 h-16 text-white drop-shadow-lg" />
                 </div>
               )}
               <div className="absolute top-4 left-4 z-10">
                 <Badge variant="outline" className="bg-black/40 text-white backdrop-blur-md border-white/20">
                   {video.category}
                 </Badge>
               </div>
               {video.duration && (
                 <div className="absolute bottom-4 right-4 z-10 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-md font-medium border border-white/10">
                   {video.duration}
                 </div>
               )}
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground shadow-xl backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
                   <Play className="w-6 h-6 ml-1" />
                 </div>
               </div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-serif text-xl mb-3 line-clamp-1 group-hover:text-primary transition-colors leading-tight">
                {video.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-6 leading-relaxed">
                {video.description}
              </p>
              <Button className="w-full gap-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground" variant="outline">
                Watch Masterclass
              </Button>
            </CardContent>
          </Card>
        ))}
        {videos?.length === 0 && (
          <div className="col-span-full py-24 text-center">
             <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
               <Play className="w-8 h-8 text-muted-foreground/50" />
             </div>
             <h3 className="font-serif text-2xl text-primary mb-2">No masterclasses found</h3>
             <p className="text-muted-foreground">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
