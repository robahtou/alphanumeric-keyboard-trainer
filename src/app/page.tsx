"use client"

import { useState, useEffect, useCallback } from "react"
import { MenuScreen } from "@/components/keyboard-learning/menu/MenuScreen"
import { LessonScreen } from "@/components/keyboard-learning/lesson/LessonScreen"
import {
  type Settings,
  type Screen,
  type Feedback,
  type StarPosition,
  DEFAULT_SETTINGS,
  ENGLISH_ALPHABET,
  SPANISH_ALPHABET,
  AUTO_SUBMIT_DELAY,
  CORRECT_FEEDBACK_DELAY,
  INCORRECT_FEEDBACK_DELAY,
  CELEBRATION_STAR_COUNT,
} from "@/components/keyboard-learning"

export default function KeyboardLearning() {
  const [screen, setScreen] = useState<Screen>("menu")
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  // Lesson state
  const [currentChar, setCurrentChar] = useState("")
  const [userInput, setUserInput] = useState("")
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [sequenceIndex, setSequenceIndex] = useState(0)
  const [stars, setStars] = useState<StarPosition[]>([])
  const [starId, setStarId] = useState(0)
  const [autoSubmitTimer, setAutoSubmitTimer] = useState<NodeJS.Timeout | null>(
    null
  )

  // Generate available characters based on settings
  const generateAvailableChars = useCallback(() => {
    const { category, language, letterCase, numberMin, numberMax } = settings
    let chars: string[] = []

    if (category === "letters" || category === "both") {
      const alphabet =
        language === "english" ? ENGLISH_ALPHABET : SPANISH_ALPHABET

      if (letterCase === "uppercase") {
        chars = [...chars, ...alphabet]
      } else if (letterCase === "lowercase") {
        chars = [...chars, ...alphabet.map((letter) => letter.toLowerCase())]
      } else {
        chars = [
          ...chars,
          ...alphabet,
          ...alphabet.map((letter) => letter.toLowerCase()),
        ]
      }
    }

    if (category === "numbers" || category === "both") {
      for (let i = numberMin; i <= numberMax; i++) {
        chars.push(i.toString())
      }
    }

    return chars
  }, [settings])

  // Get next character
  const getNextChar = useCallback(() => {
    const chars = generateAvailableChars()

    if (settings.mode === "random") {
      const randomIndex = Math.floor(Math.random() * chars.length)
      return chars[randomIndex]
    } else {
      const nextIndex = sequenceIndex % chars.length
      setSequenceIndex(nextIndex + 1)
      return chars[nextIndex]
    }
  }, [generateAvailableChars, settings.mode, sequenceIndex])

  // Start lesson
  const startLesson = () => {
    setScreen("lesson")
    setSequenceIndex(0)
    setCurrentChar(getNextChar())
    setUserInput("")
    setFeedback(null)
  }

  // Create celebration stars
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

  // Check answer
  const checkAnswer = useCallback(
    (input: string) => {
      if (autoSubmitTimer) {
        clearTimeout(autoSubmitTimer)
        setAutoSubmitTimer(null)
      }

      const isCorrect = input === currentChar

      if (isCorrect) {
        setFeedback("correct")
        createStars()

        setTimeout(() => {
          setCurrentChar(getNextChar())
          setUserInput("")
          setFeedback(null)
        }, CORRECT_FEEDBACK_DELAY)
      } else {
        setFeedback("incorrect")

        setTimeout(() => {
          setFeedback(null)
          setUserInput("")
        }, INCORRECT_FEEDBACK_DELAY)
      }
    },
    [autoSubmitTimer, currentChar, createStars, getNextChar]
  )

  // Handle exit
  const handleExit = useCallback(() => {
    setScreen("menu")
    setUserInput("")
    setFeedback(null)
    if (autoSubmitTimer) {
      clearTimeout(autoSubmitTimer)
      setAutoSubmitTimer(null)
    }
  }, [autoSubmitTimer])

  // Handle key input (from physical keyboard or virtual keyboard)
  const handleKeyInput = useCallback(
    (key: string, shiftKey: boolean = false) => {
      if (autoSubmitTimer) {
        clearTimeout(autoSubmitTimer)
        setAutoSubmitTimer(null)
      }

      // Handle special keys
      if (key === "Backspace") {
        setUserInput("")
        return
      }

      if (key === "Enter") {
        if (settings.requireEnter && userInput) {
          checkAnswer(userInput)
        }
        return
      }

      // Only process single character keys
      if (key.length !== 1 && key !== "-") return

      let displayValue = ""

      if (settings.requireEnter) {
        // With requireEnter, just set the input
        displayValue = key === "-" ? "-" : key
        setUserInput(displayValue)
      } else {
        const isNegativeNumber = currentChar.startsWith("-")

        if (isNegativeNumber) {
          if (key === "-") {
            setUserInput("-")
            return
          } else if (userInput === "-") {
            displayValue = "-" + key
          } else {
            displayValue = key
          }
        } else {
          // Handle letter input based on learning mode
          if (settings.learningMode === "just-starting") {
            // Just Starting: Shift + Key produces lowercase, Key alone produces uppercase
            if (/[a-zñ]/.test(currentChar)) {
              displayValue = shiftKey ? key.toLowerCase() : key.toUpperCase()
            } else {
              displayValue = key.toUpperCase()
            }
          } else {
            // Keyboard Lessons: standard keyboard behavior
            displayValue = shiftKey ? key.toUpperCase() : key.toLowerCase()
          }
        }

        setUserInput(displayValue)

        // Auto-submit after delay
        const timer = setTimeout(() => {
          checkAnswer(displayValue)
        }, AUTO_SUBMIT_DELAY)
        setAutoSubmitTimer(timer)
      }
    },
    [
      autoSubmitTimer,
      checkAnswer,
      currentChar,
      settings.learningMode,
      settings.requireEnter,
      userInput,
    ]
  )

  // Physical keyboard handler
  useEffect(() => {
    if (screen !== "lesson") return

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()

      // Exit shortcut
      if (e.ctrlKey && e.key === "Escape") {
        handleExit()
        return
      }

      // Ignore modifier keys alone
      if (["Control", "Shift", "Alt", "Meta"].includes(e.key)) return

      handleKeyInput(e.key, e.shiftKey)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [screen, handleKeyInput, handleExit])

  // Render based on screen
  if (screen === "lesson") {
    return (
      <LessonScreen
        currentChar={currentChar}
        userInput={userInput}
        feedback={feedback}
        settings={settings}
        stars={stars}
        autoSubmitDelay={AUTO_SUBMIT_DELAY}
        onKeyInput={handleKeyInput}
        onExit={handleExit}
      />
    )
  }

  return (
    <MenuScreen
      settings={settings}
      onSettingsChange={setSettings}
      onStartLesson={startLesson}
    />
  )
}
