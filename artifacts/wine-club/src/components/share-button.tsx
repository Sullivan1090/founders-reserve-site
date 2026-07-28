"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link2, Check } from "lucide-react";

interface ShareButtonProps {
  shareToken: string | null;
  videoId: string;
  className?: string;
}

export function ShareButton({ shareToken, videoId, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    try {
      let token = shareToken;

      // If no token yet, generate one via our API route
      if (!token) {
        const res = await fetch("/api/videos/share", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId }),
        });
        if (!res.ok) throw new Error("Failed to generate share link");
        const data = await res.json();
        token = data.shareToken;
      }

      const shareUrl = `${window.location.origin}/share/${token}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      disabled={loading}
      className={`gap-1.5 text-muted-foreground hover:text-primary ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-500" />
          <span className="text-green-500 text-xs">Copied!</span>
        </>
      ) : (
        <>
          <Link2 className="w-4 h-4" />
          <span className="text-xs">Share</span>
        </>
      )}
    </Button>
  );
}
