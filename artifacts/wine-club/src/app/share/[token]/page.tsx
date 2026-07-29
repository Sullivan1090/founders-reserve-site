import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Wine, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function SharePage({ params }: Props) {
  const { token } = await params;

  // Use anon client — RLS policy allows reading rows where share_token IS NOT NULL
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: video } = await supabase
    .from("videos")
    .select("*")
    .eq("share_token", token)
    .single();

  if (!video) notFound();

  return (
    <div className="min-h-screen bg-secondary text-foreground">
      {/* Header */}
      <header className="border-b border-border/30 bg-secondary/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Wine className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg text-primary">The Founders Vault</span>
          </Link>
          <Link href="/login">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Member Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Video */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-6 flex items-center gap-3">
          <Badge variant="outline" className="capitalize border-primary/30 text-primary">
            {video.category}
          </Badge>
          {video.duration && (
            <span className="text-sm text-muted-foreground">{video.duration}</span>
          )}
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4">{video.title}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">{video.description}</p>

        {/* Video embed */}
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl mb-12">
          {video.video_url ? (
            <iframe
              src={video.video_url}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Video coming soon
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-card border border-border/50 rounded-2xl p-8 text-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-serif text-2xl text-primary mb-3">Want access to everything?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Members of The Founders Vault get exclusive access to the full video library, 
            wine release allocations, and direct communication from the winery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Join the Circle
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
