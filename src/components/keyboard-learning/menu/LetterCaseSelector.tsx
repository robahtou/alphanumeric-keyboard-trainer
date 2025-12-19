"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { OptionButton } from "./OptionButton"
import type { LetterCase, LearningMode } from "../types"

interface LetterCaseSelectorProps {
  value: LetterCase
  onChange: (value: LetterCase) => void
  learningMode: LearningMode
}

export function LetterCaseSelector({
  value,
  onChange,
  learningMode,
}: LetterCaseSelectorProps) {
  const isJustStarting = learningMode === "just-starting"

  return (
    <div>
      <Label className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 mb-2 sm:mb-3 block">
        Letter Case
      </Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as LetterCase)}
        className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4"
      >
        <OptionButton
          value="uppercase"
          id="uppercase"
          label="ABC"
          colorClass="bg-purple-400 text-white"
        />
        <OptionButton
          value="lowercase"
          id="lowercase"
          label="abc"
          colorClass="bg-indigo-400 text-white"
          disabled={isJustStarting}
        />
        <OptionButton
          value="both"
          id="case-both"
          label="Both"
          colorClass="bg-violet-400 text-white"
          disabled={isJustStarting}
        />
      </RadioGroup>
    </div>
  )
}
