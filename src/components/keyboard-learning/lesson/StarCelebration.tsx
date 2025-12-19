"use client"

import { Star } from "lucide-react"
import type { StarPosition } from "../types"

interface StarCelebrationProps {
  stars: StarPosition[]
}

export function StarCelebration({ stars }: StarCelebrationProps) {
  return (
    <>
      {stars.map((star) => (
        <Star
          key={star.id}
          className="absolute text-yellow-400 fill-yellow-400 animate-ping pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: "1.5rem",
            height: "1.5rem",
          }}
        />
      ))}
    </>
  )
}
