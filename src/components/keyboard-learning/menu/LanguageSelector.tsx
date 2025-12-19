"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { OptionButton } from "./OptionButton"
import type { Language } from "../types"

interface LanguageSelectorProps {
  value: Language
  onChange: (value: Language) => void
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div>
      <Label className="text-lg sm:text-xl md:text-2xl font-bold text-slate-700 mb-2 sm:mb-3 block">
        Language
      </Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as Language)}
        className="flex gap-2 sm:gap-4"
      >
        <OptionButton
          value="english"
          id="english"
          label="English"
          colorClass="bg-blue-500 text-white"
        />
        <OptionButton
          value="spanish"
          id="spanish"
          label="Español"
          colorClass="bg-rose-500 text-white"
        />
      </RadioGroup>
    </div>
  )
}
