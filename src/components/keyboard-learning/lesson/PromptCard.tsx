"use client"

import { Card } from "@/components/ui/card"
import type { LearningMode } from "../types"

interface PromptCardProps {
  currentChar: string
  requiresShift: boolean
  learningMode: LearningMode
}

export function PromptCard({
  currentChar,
  requiresShift,
  learningMode,
}: PromptCardProps) {
  return (
    <Card className="bg-gradient-to-br from-orange-400 to-pink-400 border-none shadow-2xl p-4 sm:p-8 md:p-12 min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[450px]">
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-6 h-full">
        <div className="text-white/80 text-lg sm:text-2xl md:text-3xl font-bold">
          Find this:
        </div>
        <div className="text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-black text-white leading-none drop-shadow-2xl">
          {currentChar}
        </div>
        {requiresShift && (
          <div className="text-white/90 text-sm sm:text-lg md:text-xl font-bold bg-white/20 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-center">
            {learningMode === "just-starting"
              ? "Hold Shift + Press Key"
              : "Press Shift + Letter"}
          </div>
        )}
      </div>
    </Card>
  )
}
