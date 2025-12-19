"use client"

import { useEffect, useState } from "react"
import { PromptCard } from "./PromptCard"
import { AnswerCard } from "./AnswerCard"
import { StarCelebration } from "./StarCelebration"
import { VirtualKeyboard } from "./VirtualKeyboard"
import { ExitHint } from "./ExitHint"
import type { LessonScreenProps } from "../types"

export function LessonScreen({
  currentChar,
  userInput,
  feedback,
  settings,
  stars,
  autoSubmitDelay,
  onKeyInput,
  onExit,
}: LessonScreenProps) {
  const [isMobile, setIsMobile] = useState(false)

  // Detect if user is on mobile/tablet (touch device)
  useEffect(() => {
    const checkMobile = () => {
      // Check for touch capability and screen size
      const hasTouchScreen =
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 1024
      setIsMobile(hasTouchScreen && isSmallScreen)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Determine if shift is needed
  const requiresShift = (): boolean => {
    if (settings.learningMode === "just-starting") {
      return /[a-zñ]/.test(currentChar)
    } else {
      return /[A-ZÑ]/.test(currentChar)
    }
  }

  // Handle virtual keyboard input
  const handleVirtualKeyPress = (key: string, shiftKey: boolean) => {
    onKeyInput(key, shiftKey)
  }

  const showNumbers =
    settings.category === "numbers" || settings.category === "both"
  const showLetters =
    settings.category === "letters" || settings.category === "both"

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-300 to-cyan-300 flex flex-col items-center justify-start sm:justify-center p-2 sm:p-4 overflow-hidden relative">
      {/* Star celebration effect */}
      <StarCelebration stars={stars} />

      {/* Exit hint/button */}
      <ExitHint onExit={onExit} isMobile={isMobile} />

      {/* Main content */}
      <div className="w-full max-w-5xl mt-10 sm:mt-0">
        {/* Cards grid - stacked on mobile, side by side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-stretch">
          <PromptCard
            currentChar={currentChar}
            requiresShift={requiresShift()}
            learningMode={settings.learningMode}
          />
          <AnswerCard
            userInput={userInput}
            feedback={feedback}
            requireEnter={settings.requireEnter}
            autoSubmitDelay={autoSubmitDelay}
          />
        </div>

        {/* Virtual keyboard for mobile/tablet */}
        {isMobile && (
          <div className="mt-3 sm:mt-4 md:mt-6">
            <VirtualKeyboard
              onKeyPress={handleVirtualKeyPress}
              learningMode={settings.learningMode}
              showNumbers={showNumbers}
              showLetters={showLetters}
            />
          </div>
        )}
      </div>

      {/* Desktop instruction - only show on non-mobile */}
      {!isMobile && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-slate-600 text-sm sm:text-base font-medium bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
          Type on your keyboard to answer
        </div>
      )}
    </div>
  )
}
