"use client"

import { useState } from "react"
import { Expand, Pause, Play } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ImageModalProps = {
  src: string
  alt: string
  posterSrc?: string
  "aria-describedby"?: string
}

export default function ImageModal({
  src,
  alt,
  posterSrc,
  "aria-describedby": describedBy,
}: ImageModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const displaySrc = posterSrc && !isPlaying ? posterSrc : src

  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="group relative block w-full overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-describedby={describedBy}
          >
            <span className="sr-only">Open full-size image: </span>
            <img src={displaySrc} alt={alt} className="block w-full rounded-xl" />
            <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-fui border border-border bg-background/90 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        </DialogTrigger>
        <DialogContent
          aria-describedby={describedBy}
          className="w-auto max-w-[96vw] border-0 bg-transparent p-0 shadow-none sm:rounded-xl"
        >
          <DialogTitle className="sr-only">Expanded image</DialogTitle>
          <img
            src={displaySrc}
            alt={alt}
            className="max-h-[90vh] max-w-[94vw] rounded-xl border border-border object-contain"
          />
          {posterSrc && (
            <AnimationControl isPlaying={isPlaying} onToggle={() => setIsPlaying((playing) => !playing)} />
          )}
        </DialogContent>
      </Dialog>
      {posterSrc && (
        <AnimationControl isPlaying={isPlaying} onToggle={() => setIsPlaying((playing) => !playing)} />
      )}
    </div>
  )
}

function AnimationControl({
  isPlaying,
  onToggle,
}: {
  isPlaying: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute bottom-3 right-3 z-10 inline-flex min-h-11 items-center gap-2 rounded-fui border border-border bg-background/95 px-3 py-2 text-sm font-medium text-foreground backdrop-blur-sm hover:text-fui-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-fui-primary"
    >
      {isPlaying ? (
        <Pause className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Play className="h-4 w-4" aria-hidden="true" />
      )}
      {isPlaying ? "Pause animation" : "Play animation"}
    </button>
  )
}
