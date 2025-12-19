"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { OptionButton } from "./OptionButton"
import type { LearningMode } from "../types"

interface LearningModeSelectorProps {
  value: LearningMode
  onChange: (value: LearningMode) => void
}

export function LearningModeSelector({
  value,
  onChange,
}: LearningModeSelectorProps) {
  return (
    <div>
      <Label className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 mb-2 sm:mb-3 block">
        Learning Mode
      </Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as LearningMode)}
        className="flex flex-col sm:flex-row gap-2 sm:gap-4"
      >
        <OptionButton
          value="just-starting"
          id="just-starting"
          label="Just Starting"
          colorClass="bg-emerald-400 text-white"
        />
        <OptionButton
          value="keyboard-lessons"
          id="keyboard-lessons"
          label="Keyboard Lessons"
          colorClass="bg-teal-400 text-white"
        />
      </RadioGroup>
      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
        {value === "just-starting"
          ? "Match what's printed on your keyboard keys (uppercase = just press, lowercase = hold Shift)"
          : "Learn how keyboards really work (press key = lowercase, Shift + key = uppercase)"}
      </p>
    </div>
  )
}
