import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ShareButton } from "@/components/share-button";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VideoPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: video } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .single();

  if (!video) notFound();

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      <Link
        href="/members"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Library
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <Badge variant="outline" className="capitalize border-primary/30 text-primary">
          {video.category}
        </Badge>
        {video.duration && (
          <span className="text-sm text-muted-foreground">{video.duration}</span>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 mb-6">
        <h1 className="font-serif text-3xl md:text-4xl text-primary leading-tight">
          {video.title}
        </h1>
        <ShareButton shareToken={video.share_token} videoId={video.id} className="shrink-0 mt-1" />
      </div>

      <p className="text-muted-foreground text-lg leading-relaxed mb-8">{video.description}</p>

      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl">
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
    </div>
  );
}
