"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { KEYBOARD_ROWS } from "../constants"
import type { LearningMode } from "../types"

interface VirtualKeyboardProps {
  onKeyPress: (key: string, shiftKey: boolean) => void
  learningMode: LearningMode
  showNumbers?: boolean
  showLetters?: boolean
}

export function VirtualKeyboard({
  onKeyPress,
  learningMode,
  showNumbers = true,
  showLetters = true,
}: VirtualKeyboardProps) {
  const [isShiftActive, setIsShiftActive] = useState(false)

  const handleKeyPress = (key: string) => {
    onKeyPress(key, isShiftActive)
    // Reset shift after key press (standard keyboard behavior)
    setIsShiftActive(false)
  }

  const getDisplayKey = (key: string) => {
    if (learningMode === "just-starting") {
      // In just-starting mode, keys show uppercase (what's printed on keyboard)
      // Shift + key produces lowercase
      return isShiftActive ? key.toLowerCase() : key
    } else {
      // In keyboard-lessons mode, standard behavior
      // Key alone = lowercase, Shift + key = uppercase
      return isShiftActive ? key : key.toLowerCase()
    }
  }

  const rowsToShow = KEYBOARD_ROWS.filter((row, index) => {
    if (index === 0) return showNumbers // Number row
    return showLetters // Letter rows
  })

  return (
    <div className="w-full bg-slate-100 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-2">
      {/* Shift indicator */}
      <div className="flex justify-center mb-1 sm:mb-2">
        <Button
          variant={isShiftActive ? "default" : "outline"}
          onClick={() => setIsShiftActive(!isShiftActive)}
          className={`text-xs sm:text-sm md:text-base font-bold px-4 sm:px-6 md:px-8 py-2 sm:py-3 ${
            isShiftActive
              ? "bg-blue-500 text-white"
              : "bg-white border-2 border-slate-300"
          }`}
        >
          ⇧ Shift {isShiftActive && "(ON)"}
        </Button>
      </div>

      {/* Keyboard rows */}
      {rowsToShow.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-0.5 sm:gap-1">
          {row.map((key) => (
            <Button
              key={key}
              variant="outline"
              onClick={() => handleKeyPress(key)}
              className="w-7 h-9 sm:w-9 sm:h-11 md:w-11 md:h-13 lg:w-12 lg:h-14 p-0 text-sm sm:text-lg md:text-xl lg:text-2xl font-bold bg-white border-2 border-slate-300 hover:bg-slate-200 active:bg-slate-300 active:scale-95 transition-all shadow-sm"
            >
              {showLetters && rowIndex > 0 ? getDisplayKey(key) : key}
            </Button>
          ))}
        </div>
      ))}

      {/* Enter/Submit button for requireEnter mode */}
      <div className="flex justify-center gap-1 sm:gap-2 mt-2 sm:mt-3">
        <Button
          variant="outline"
          onClick={() => onKeyPress("Backspace", false)}
          className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-bold bg-slate-200 border-2 border-slate-300 hover:bg-slate-300"
        >
          ⌫ Clear
        </Button>
        <Button
          onClick={() => onKeyPress("Enter", false)}
          className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-bold bg-green-500 text-white hover:bg-green-600"
        >
          Enter ↵
        </Button>
      </div>
    </div>
  )
}
