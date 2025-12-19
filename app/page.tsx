"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Sparkles, Star, Trophy, Heart } from "lucide-react"

type Category = "letters" | "numbers" | "both"
type Mode = "random" | "sequence"
type Language = "english" | "spanish"
type LetterCase = "uppercase" | "lowercase" | "both"
type LearningMode = "just-starting" | "keyboard-lessons"

interface Settings {
  category: Category
  mode: Mode
  language: Language
  letterCase: LetterCase
  learningMode: LearningMode
  numberMin: number
  numberMax: number
  requireEnter: boolean
}

const ENGLISH_ALPHABET  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
const SPANISH_ALPHABET  = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("")
const AUTO_SUBMIT_DELAY = 1000 // milliseconds

export default function KeyboardLearning() {
  const [screen, setScreen] = useState<"menu" | "lesson">("menu")
  const [settings, setSettings] = useState<Settings>({
    category: "letters",
    mode: "random",
    language: "english",
    letterCase: "uppercase",
    learningMode: "just-starting",
    numberMin: 1,
    numberMax: 10,
    requireEnter: false,
  })

  const [currentChar, setCurrentChar] = useState("")
  const [userInput, setUserInput] = useState("")
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [availableChars, setAvailableChars] = useState<string[]>([])
  const [sequenceIndex, setSequenceIndex] = useState(0)
  const [stars, setStars] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [starId, setStarId] = useState(0)
  const [autoSubmitTimer, setAutoSubmitTimer] = useState<NodeJS.Timeout | null>(null)

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
    setAvailableChars(chars)

    if (settings.mode === "random") {
      const randomIndex = Math.floor(Math.random() * chars.length)
      return chars[randomIndex]
    } else {
      const nextIndex = sequenceIndex % chars.length
      setSequenceIndex(nextIndex + 1)
      return chars[nextIndex]
    }
  }, [generateAvailableChars, settings.mode, sequenceIndex])

  const startLesson = () => {
    setScreen("lesson")
    setSequenceIndex(0)
    setCurrentChar(getNextChar())
    setUserInput("")
    setFeedback(null)
  }

  const requiresShift = (char: string): boolean => {
    if (settings.learningMode === "just-starting") {
      // Just Starting: shift needed for lowercase letters
      return /[a-zñ]/.test(char)
    } else {
      // Keyboard Lessons: shift needed for uppercase letters (standard keyboard behavior)
      return /[A-ZÑ]/.test(char)
    }
  }

  useEffect(() => {
    if (screen !== "lesson") return

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()

      if (e.ctrlKey && e.key === "Escape") {
        setScreen("menu")
        setUserInput("")
        setFeedback(null)
        if (autoSubmitTimer) {
          clearTimeout(autoSubmitTimer)
          setAutoSubmitTimer(null)
        }
        return
      }

      if (["Control", "Shift", "Alt", "Meta"].includes(e.key)) return

      if (autoSubmitTimer) {
        clearTimeout(autoSubmitTimer)
        setAutoSubmitTimer(null)
      }

      if (settings.requireEnter) {
        if (e.key === "Enter") {
          checkAnswer(userInput)
        } else if (e.key === "Backspace") {
          setUserInput("")
        } else if (e.key.length === 1 || e.key === "-") {
          if (e.key === "-") {
            setUserInput("-")
          } else {
            setUserInput(e.key)
          }
        }
      } else {
        const isNegativeNumber = currentChar.startsWith("-")

        if (isNegativeNumber) {
          if (e.key === "-") {
            setUserInput("-")
          } else if (e.key.length === 1 && userInput === "-") {
            const fullInput = "-" + e.key
            setUserInput(fullInput)
            const timer = setTimeout(() => {
              checkAnswer(fullInput)
            }, AUTO_SUBMIT_DELAY)
            setAutoSubmitTimer(timer)
          } else if (e.key.length === 1 && userInput === "") {
            setUserInput(e.key)
            const timer = setTimeout(() => {
              checkAnswer(e.key)
            }, AUTO_SUBMIT_DELAY)
            setAutoSubmitTimer(timer)
          } else if (e.key.length === 1) {
            setUserInput(e.key)
            const timer = setTimeout(() => {
              checkAnswer(e.key)
            }, AUTO_SUBMIT_DELAY)
            setAutoSubmitTimer(timer)
          }
        } else if (e.key.length === 1) {
          // Handle letter input based on learning mode
          let displayValue = ""

          if (settings.learningMode === "just-starting") {
            // Just Starting: Shift + Key produces lowercase, Key alone produces uppercase match
            if (/[a-zñ]/.test(currentChar)) {
              // Target is lowercase, need Shift + Key
              if (e.shiftKey) {
                displayValue = e.key.toLowerCase()
              } else {
                displayValue = e.key.toUpperCase()
              }
            } else {
              // Target is uppercase, just press the key
              displayValue = e.key.toUpperCase()
            }
          } else {
            // Keyboard Lessons: standard keyboard behavior
            // Key alone = lowercase, Shift + Key = uppercase
            displayValue = e.key
          }

          setUserInput(displayValue)

          const timer = setTimeout(() => {
            checkAnswer(displayValue)
          }, AUTO_SUBMIT_DELAY)
          setAutoSubmitTimer(timer)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [screen, currentChar, settings.requireEnter, settings.learningMode, userInput, autoSubmitTimer])

  const checkAnswer = (input: string) => {
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
      }, 1500)
    } else {
      setFeedback("incorrect")

      setTimeout(() => {
        setFeedback(null)
        setUserInput("")
      }, 1000)
    }
  }

  const createStars = () => {
    const newStars = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      id: starId + i,
    }))
    setStars(newStars)
    setStarId(starId + 8)

    setTimeout(() => setStars([]), AUTO_SUBMIT_DELAY)
  }

  if (screen === "lesson") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-300 to-cyan-300 flex items-center justify-center p-4 overflow-hidden relative">
        {stars.map((star) => (
          <Star
            key={star.id}
            className="absolute text-yellow-400 fill-yellow-400 animate-ping"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: "2rem",
              height: "2rem",
            }}
          />
        ))}

        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-medium text-slate-700">
          Press <kbd className="px-2 py-1 bg-slate-200 rounded">Ctrl + Esc</kbd> to exit
        </div>

        <div className="w-full max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="bg-gradient-to-br from-orange-400 to-pink-400 border-none shadow-2xl p-12 min-h-[450px]">
              <div className="flex flex-col items-center justify-center gap-6 h-full">
                <div className="text-white/80 text-3xl font-bold">Find this:</div>
                <div className="text-[12rem] font-black text-white leading-none drop-shadow-2xl">{currentChar}</div>
                {requiresShift(currentChar) && (
                  <div className="text-white/90 text-xl font-bold bg-white/20 px-6 py-3 rounded-xl">
                    {settings.learningMode === "just-starting" ? "Hold Shift + Press Key" : "Press Shift + Letter"}
                  </div>
                )}
              </div>
            </Card>

            <Card className="bg-white border-4 border-dashed border-slate-300 shadow-2xl p-12 min-h-[450px]">
              <div className="flex flex-col items-center justify-center gap-6 h-full relative">
                <div className="text-slate-600 text-3xl font-bold text-center">Your answer:</div>
                <div className="text-[12rem] font-black text-sky-600 leading-none">{userInput || "?"}</div>

                {settings.requireEnter ? (
                  <div className="text-slate-500 text-xl font-medium mt-4 text-center">
                    Press <kbd className="px-3 py-2 bg-green-500 text-white rounded-lg text-2xl font-bold">Enter</kbd>{" "}
                    to check
                  </div>
                ) : (
                  userInput &&
                  !feedback && (
                    <div className="text-slate-500 text-lg font-medium mt-4 text-center animate-pulse">
                      Checking in {AUTO_SUBMIT_DELAY / 1000} seconds...
                    </div>
                  )
                )}

                {feedback === "correct" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-400/95 rounded-xl">
                    <div className="flex items-center gap-4 text-white text-5xl font-bold">
                      <Trophy className="w-16 h-16" />
                      <span>Amazing!</span>
                      <Trophy className="w-16 h-16" />
                    </div>
                  </div>
                )}

                {feedback === "incorrect" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-orange-400/95 rounded-xl">
                    <div className="flex items-center gap-4 text-white text-5xl font-bold">
                      <Heart className="w-16 h-16" />
                      <span>Try again!</span>
                      <Heart className="w-16 h-16" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-cyan-200 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl border-4 border-sky-400">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 mb-2">
              Keyboard Fun!
            </h1>
            <p className="text-2xl text-slate-600 font-bold">Learn letters & numbers</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label className="text-2xl font-bold text-slate-700 mb-3 block">What to learn?</Label>
              <RadioGroup
                value={settings.category}
                onValueChange={(value) => setSettings({ ...settings, category: value as Category })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <RadioGroupItem value="letters" id="letters" className="w-6 h-6" />
                  <Label
                    htmlFor="letters"
                    className="text-xl font-bold cursor-pointer bg-orange-400 text-white px-6 py-3 rounded-xl flex-1 text-center"
                  >
                    ABC
                  </Label>
                </div>
                <div className="flex items-center space-x-2 flex-1">
                  <RadioGroupItem value="numbers" id="numbers" className="w-6 h-6" />
                  <Label
                    htmlFor="numbers"
                    className="text-xl font-bold cursor-pointer bg-pink-400 text-white px-6 py-3 rounded-xl flex-1 text-center"
                  >
                    123
                  </Label>
                </div>
                <div className="flex items-center space-x-2 flex-1">
                  <RadioGroupItem value="both" id="both" className="w-6 h-6" />
                  <Label
                    htmlFor="both"
                    className="text-xl font-bold cursor-pointer bg-sky-400 text-white px-6 py-3 rounded-xl flex-1 text-center"
                  >
                    Both
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {(settings.category === "letters" || settings.category === "both") && (
              <div>
                <Label className="text-2xl font-bold text-slate-700 mb-3 block">Learning Mode</Label>
                <RadioGroup
                  value={settings.learningMode}
                  onValueChange={(value) => setSettings({ ...settings, learningMode: value as LearningMode })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="just-starting" id="just-starting" className="w-6 h-6" />
                    <Label
                      htmlFor="just-starting"
                      className="text-xl font-bold cursor-pointer bg-emerald-400 text-white px-6 py-3 rounded-xl flex-1 text-center"
                    >
                      Just Starting
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="keyboard-lessons" id="keyboard-lessons" className="w-6 h-6" />
                    <Label
                      htmlFor="keyboard-lessons"
                      className="text-xl font-bold cursor-pointer bg-teal-400 text-white px-6 py-3 rounded-xl flex-1 text-center"
                    >
                      Keyboard Lessons
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {settings.learningMode === "just-starting"
                    ? "Match what's printed on your keyboard keys (uppercase = just press, lowercase = hold Shift)"
                    : "Learn how keyboards really work (press key = lowercase, Shift + key = uppercase)"}
                </p>
              </div>
            )}

            {(settings.category === "letters" || settings.category === "both") && (
              <div>
                <Label className="text-2xl font-bold text-slate-700 mb-3 block">Letter Case</Label>
                <RadioGroup
                  value={settings.letterCase}
                  onValueChange={(value) => setSettings({ ...settings, letterCase: value as LetterCase })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="uppercase" id="uppercase" className="w-6 h-6" />
                    <Label
                      htmlFor="uppercase"
                      className="text-xl font-bold cursor-pointer bg-purple-400 text-white px-6 py-3 rounded-xl flex-1 text-center"
                    >
                      ABC
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem
                      value="lowercase"
                      id="lowercase"
                      className="w-6 h-6"
                      disabled={settings.learningMode === "just-starting"}
                    />
                    <Label
                      htmlFor="lowercase"
                      className={`text-xl font-bold cursor-pointer px-6 py-3 rounded-xl flex-1 text-center ${
                        settings.learningMode === "just-starting"
                          ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                          : "bg-indigo-400 text-white"
                      }`}
                    >
                      abc
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem
                      value="both"
                      id="case-both"
                      className="w-6 h-6"
                      disabled={settings.learningMode === "just-starting"}
                    />
                    <Label
                      htmlFor="case-both"
                      className={`text-xl font-bold cursor-pointer px-6 py-3 rounded-xl flex-1 text-center ${
                        settings.learningMode === "just-starting"
                          ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                          : "bg-violet-400 text-white"
                      }`}
                    >
                      Both
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            <div>
              <Label className="text-2xl font-bold text-slate-700 mb-3 block">Order</Label>
              <RadioGroup
                value={settings.mode}
                onValueChange={(value) => setSettings({ ...settings, mode: value as Mode })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <RadioGroupItem value="random" id="random" className="w-6 h-6" />
                  <Label
                    htmlFor="random"
                    className="text-xl font-bold cursor-pointer bg-green-400 text-white px-6 py-3 rounded-xl flex-1 text-center"
                  >
                    Random
                  </Label>
                </div>
                <div className="flex items-center space-x-2 flex-1">
                  <RadioGroupItem value="sequence" id="sequence" className="w-6 h-6" />
                  <Label
                    htmlFor="sequence"
                    className="text-xl font-bold cursor-pointer bg-cyan-400 text-white px-6 py-3 rounded-xl flex-1 text-center"
                  >
                    In Order
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-2xl font-bold text-slate-700 mb-3 block">Language</Label>
              <RadioGroup
                value={settings.language}
                onValueChange={(value) => setSettings({ ...settings, language: value as Language })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <RadioGroupItem value="english" id="english" className="w-6 h-6" />
                  <Label
                    htmlFor="english"
                    className="text-xl font-bold cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-xl flex-1 text-center"
                  >
                    English
                  </Label>
                </div>
                <div className="flex items-center space-x-2 flex-1">
                  <RadioGroupItem value="spanish" id="spanish" className="w-6 h-6" />
                  <Label
                    htmlFor="spanish"
                    className="text-xl font-bold cursor-pointer bg-rose-500 text-white px-6 py-3 rounded-xl flex-1 text-center"
                  >
                    Español
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {(settings.category === "numbers" || settings.category === "both") && (
              <div>
                <Label className="text-2xl font-bold text-slate-700 mb-3 block">Number Range</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={settings.numberMin}
                    onChange={(e) => setSettings({ ...settings, numberMin: Number.parseInt(e.target.value) || 0 })}
                    className="text-2xl font-bold h-14 text-center"
                  />
                  <span className="text-2xl font-bold text-slate-600">to</span>
                  <Input
                    type="number"
                    value={settings.numberMax}
                    onChange={(e) => setSettings({ ...settings, numberMax: Number.parseInt(e.target.value) || 10 })}
                    className="text-2xl font-bold h-14 text-center"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between bg-slate-100 rounded-xl p-4">
              <Label htmlFor="requireEnter" className="text-xl font-bold text-slate-700">
                Press Enter to submit answer
              </Label>
              <Switch
                id="requireEnter"
                checked={settings.requireEnter}
                onCheckedChange={(checked) => setSettings({ ...settings, requireEnter: checked })}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>

          <Button
            onClick={startLesson}
            className="w-full mt-8 text-4xl font-black py-8 bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 hover:from-orange-600 hover:via-pink-600 hover:to-rose-600 text-white rounded-2xl shadow-xl"
          >
            <Sparkles className="w-10 h-10 mr-4" />
            Start Learning!
            <Sparkles className="w-10 h-10 ml-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
