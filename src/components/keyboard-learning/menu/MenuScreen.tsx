"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { CategorySelector } from "./CategorySelector"
import { LearningModeSelector } from "./LearningModeSelector"
import { LetterCaseSelector } from "./LetterCaseSelector"
import { OrderSelector } from "./OrderSelector"
import { LanguageSelector } from "./LanguageSelector"
import { NumberRangeInput } from "./NumberRangeInput"
import { EnterToggle } from "./EnterToggle"
import type { MenuScreenProps } from "../types"

export function MenuScreen({
  settings,
  onSettingsChange,
  onStartLesson,
}: MenuScreenProps) {
  const showLetterOptions =
    settings.category === "letters" || settings.category === "both"
  const showNumberOptions =
    settings.category === "numbers" || settings.category === "both"

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-cyan-200 to-blue-200 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl border-2 sm:border-4 border-sky-400 mx-2 sm:mx-0">
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 mb-1 sm:mb-2">
              Keyboard Fun!
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 font-bold">
              Learn letters & numbers
            </p>
          </div>

          {/* Settings */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <CategorySelector
              value={settings.category}
              onChange={(category) =>
                onSettingsChange({ ...settings, category })
              }
            />

            {showLetterOptions && (
              <>
                <LearningModeSelector
                  value={settings.learningMode}
                  onChange={(learningMode) =>
                    onSettingsChange({ ...settings, learningMode })
                  }
                />

                <LetterCaseSelector
                  value={settings.letterCase}
                  onChange={(letterCase) =>
                    onSettingsChange({ ...settings, letterCase })
                  }
                  learningMode={settings.learningMode}
                />
              </>
            )}

            <OrderSelector
              value={settings.mode}
              onChange={(mode) => onSettingsChange({ ...settings, mode })}
            />

            <LanguageSelector
              value={settings.language}
              onChange={(language) =>
                onSettingsChange({ ...settings, language })
              }
            />

            {showNumberOptions && (
              <NumberRangeInput
                min={settings.numberMin}
                max={settings.numberMax}
                onMinChange={(numberMin) =>
                  onSettingsChange({ ...settings, numberMin })
                }
                onMaxChange={(numberMax) =>
                  onSettingsChange({ ...settings, numberMax })
                }
              />
            )}

            <EnterToggle
              checked={settings.requireEnter}
              onChange={(requireEnter) =>
                onSettingsChange({ ...settings, requireEnter })
              }
            />
          </div>

          {/* Start Button */}
          <Button
            onClick={onStartLesson}
            className="w-full mt-6 sm:mt-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black py-4 sm:py-6 md:py-8 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 hover:from-orange-600 hover:via-pink-600 hover:to-rose-600 text-white rounded-xl sm:rounded-2xl shadow-xl active:scale-[0.98] transition-transform"
          >
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-2 sm:mr-4" />
            Start Learning!
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ml-2 sm:ml-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
