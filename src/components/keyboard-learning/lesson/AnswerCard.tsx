"use client"

import { Card } from "@/components/ui/card"
import { FeedbackOverlay } from "./FeedbackOverlay"
import type { Feedback } from "../types"

interface AnswerCardProps {
  userInput: string
  feedback: Feedback
  requireEnter: boolean
  autoSubmitDelay: number
}

export function AnswerCard({
  userInput,
  feedback,
  requireEnter,
  autoSubmitDelay,
}: AnswerCardProps) {
  return (
    <Card className="bg-white border-2 sm:border-4 border-dashed border-slate-300 shadow-2xl p-4 sm:p-8 md:p-12 min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[450px]">
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-6 h-full relative">
        <div className="text-slate-600 text-lg sm:text-2xl md:text-3xl font-bold text-center">
          Your answer:
        </div>
        <div className="text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] font-black text-sky-600 leading-none">
          {userInput || "?"}
        </div>

        {requireEnter ? (
          <div className="text-slate-500 text-sm sm:text-lg md:text-xl font-medium mt-2 sm:mt-4 text-center">
            Press{" "}
            <kbd className="px-2 py-1 sm:px-3 sm:py-2 bg-green-500 text-white rounded-lg text-base sm:text-xl md:text-2xl font-bold">
              Enter
            </kbd>{" "}
            to check
          </div>
        ) : (
          userInput &&
          !feedback && (
            <div className="text-slate-500 text-sm sm:text-base md:text-lg font-medium mt-2 sm:mt-4 text-center animate-pulse">
              Checking in {autoSubmitDelay / 1000} seconds...
            </div>
          )
        )}

        <FeedbackOverlay feedback={feedback} />
      </div>
    </Card>
  )
}
