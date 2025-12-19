"use client"

import { useState, useCallback } from "react"
import type { Settings, Feedback, StarPosition } from "../types"
import {
  ENGLISH_ALPHABET,
  SPANISH_ALPHABET,
  CELEBRATION_STAR_COUNT,
} from "../constants"

interface UseLessonReturn {
  currentChar: string
  userInput: string
  feedback: Feedback
  stars: StarPosition[]
  sequenceIndex: number
  setUserInput: (input: string) => void
  setFeedback: (feedback: Feedback) => void
  getNextChar: () => string
  createStars: () => void
  resetLesson: () => void
  requiresShift: (char: string) => boolean
}

export function useLesson(settings: Settings): UseLessonReturn {
  const [currentChar, setCurrentChar] = useState("")
  const [userInput, setUserInput] = useState("")
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [sequenceIndex, setSequenceIndex] = useState(0)
  const [stars, setStars] = useState<StarPosition[]>([])
  const [starId, setStarId] = useState(0)

  const generateAvailableChars = useCallback(() => {
    const { category, language, letterCase, numberMin, numberMax } = settings
    let chars: string[] = []

    if (category === "letters" || category === "both") {
      const alphabet = language === "english" ? ENGLISH_ALPHABET : SPANISH_ALPHABET

      if (letterCase === "uppercase") {
        chars = [...chars, ...alphabet]
      } else if (letterCase === "lowercase") {
        chars = [...chars, ...alphabet.map((letter) => letter.toLowerCase())]
      } else {
        chars = [...chars, ...alphabet, ...alphabet.map((letter) => letter.toLowerCase())]
      }
    }

    if (category === "numbers" || category === "both") {
      for (let i = numberMin; i <= numberMax; i++) {
        chars.push(i.toString())
      }
    }

    return chars
  }, [settings])

  const getNextChar = useCallback(() => {
    const chars = generateAvailableChars()

    if (settings.mode === "random") {
      const randomIndex = Math.floor(Math.random() * chars.length)
      const nextChar = chars[randomIndex]
      setCurrentChar(nextChar)
      return nextChar
    } else {
      const nextIndex = sequenceIndex % chars.length
      const nextChar = chars[nextIndex]
      setSequenceIndex(nextIndex + 1)
      setCurrentChar(nextChar)
      return nextChar
    }
  }, [generateAvailableChars, settings.mode, sequenceIndex])

  const createStars = useCallback(() => {
    const newStars = Array.from({ length: CELEBRATION_STAR_COUNT }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      id: starId + i,
    }))
    setStars(newStars)
    setStarId((prev) => prev + CELEBRATION_STAR_COUNT)

    setTimeout(() => setStars([]), 2000)
  }, [starId])

  const resetLesson = useCallback(() => {
    setSequenceIndex(0)
    setUserInput("")
    setFeedback(null)
    setStars([])
  }, [])

  const requiresShift = useCallback(
    (char: string): boolean => {
      if (settings.learningMode === "just-starting") {
        // Just Starting: shift needed for lowercase letters
        return /[a-zñ]/.test(char)
      } else {
        // Keyboard Lessons: shift needed for uppercase letters
        return /[A-ZÑ]/.test(char)
      }
    },
    [settings.learningMode]
  )

  return {
    currentChar,
    userInput,
    feedback,
    stars,
    sequenceIndex,
    setUserInput,
    setFeedback,
    getNextChar,
    createStars,
    resetLesson,
    requiresShift,
  }
}
