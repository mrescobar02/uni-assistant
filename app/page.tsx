"use client"

import type React from "react"

import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { BookOpen, Send, Mic, User, Bot, Info, Lightbulb, Settings, LogOut, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [showWelcome, setShowWelcome] = useState(true)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Ensure theme toggle only renders client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
    setShowWelcome(false)
  }

  return (
    <div className="flex h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      {/* Sidebar */}
      <div className="w-64 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-purple-700 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-medium">AsistenteU</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Asistencia Universitaria</p>
            </div>
          </div>
          <Button
            className="w-full bg-purple-700 hover:bg-purple-800 text-white"
            onClick={() => {
              setShowWelcome(true)
            }}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Nuevo Chat
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
            >
              <Info className="h-4 w-4 mr-2" />
              Sobre AsistenteU
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
              onClick={() => router.push("/sugerencias")}
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Sugerencias
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
          </div>
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          {mounted && (
            <Button
              variant="outline"
              size="sm"
              className="mb-2 w-full justify-between border-zinc-300 dark:border-zinc-700"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  <span>Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  <span>Modo Oscuro</span>
                </>
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {showWelcome && messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-purple-700 flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Bienvenido a AsistenteU</h1>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-md">
                Tu asistente universitario con información sobre profesores y estatutos
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                <Card className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-750 cursor-pointer">
                  <h3 className="font-medium mb-2">Experiencias Estudiantiles</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Consulta opiniones sobre profesores y cursos
                  </p>
                </Card>
                <Card className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-750 cursor-pointer">
                  <h3 className="font-medium mb-2">Estatuto Universitario</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Información sobre normativas y procedimientos
                  </p>
                </Card>
                <Card className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-750 cursor-pointer">
                  <h3 className="font-medium mb-2">Trámites Académicos</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Guía para procesos administrativos</p>
                </Card>
              </div>

              <div className="mt-8 w-full max-w-2xl">
                <h2 className="text-lg font-medium mb-3">Preguntas sugeridas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="justify-start border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() =>
                      handleInputChange({ target: { value: "¿Cómo es el profesor Martínez de Matemáticas?" } } as any)
                    }
                  >
                    ¿Cómo es el profesor Martínez?
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() =>
                      handleInputChange({
                        target: { value: "¿Cuál es el proceso para solicitar una revisión de examen?" },
                      } as any)
                    }
                  >
                    ¿Cómo solicitar revisión de examen?
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() =>
                      handleInputChange({
                        target: { value: "¿Cuál es el porcentaje mínimo de asistencia requerido?" },
                      } as any)
                    }
                  >
                    ¿Porcentaje mínimo de asistencia?
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() =>
                      handleInputChange({ target: { value: "¿Cómo es la metodología de la profesora García?" } } as any)
                    }
                  >
                    ¿Metodología de la profesora García?
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-6 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-start max-w-[80%]">
                    <div
                      className={`rounded-full h-8 w-8 flex items-center justify-center mr-3 ${
                        message.role === "user" ? "bg-purple-600" : "bg-purple-700"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-purple-600 text-white"
                          : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mb-6 flex justify-start">
                  <div className="flex items-start max-w-[80%]">
                    <div className="rounded-full h-8 w-8 bg-purple-700 flex items-center justify-center mr-3">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="h-2 w-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
          <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto relative">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Escribe tu pregunta aquí..."
              className="bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 pr-24 py-6 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="bg-purple-700 hover:bg-purple-800 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <p className="text-xs text-zinc-500 text-center mt-2">
            AsistenteU puede generar información incorrecta. Verifica los datos importantes.
          </p>
        </div>
      </div>
    </div>
  )
}
