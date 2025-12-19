"use client"

import { Trophy, Heart } from "lucide-react"
import type { Feedback } from "../types"

interface FeedbackOverlayProps {
  feedback: Feedback
}

export function FeedbackOverlay({ feedback }: FeedbackOverlayProps) {
  if (!feedback) return null

  if (feedback === "correct") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-400/95 rounded-xl z-10">
        <div className="flex items-center gap-2 sm:gap-4 text-white text-2xl sm:text-4xl md:text-5xl font-bold">
          <Trophy className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
          <span>Amazing!</span>
          <Trophy className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-orange-400/95 rounded-xl z-10">
      <div className="flex items-center gap-2 sm:gap-4 text-white text-2xl sm:text-4xl md:text-5xl font-bold">
        <Heart className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
        <span>Try again!</span>
        <Heart className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
      </div>
    </div>
  )
}
