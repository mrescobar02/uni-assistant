"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Search,
  User,
  Calendar,
  FileText,
  BookMarked,
  ArrowLeft,
  ThumbsUp,
  Star,
  TrendingUp,
  Lightbulb,
  Sun,
  Moon,
  Settings,
  LogOut,
  Info,
} from "lucide-react"
import { useTheme } from "next-themes"

// Tipos para las sugerencias
type Suggestion = {
  id: string
  text: string
  category: string
  tags: string[]
  popular?: boolean
}

export default function SuggestionsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")

  // Asegurar que el tema solo se renderice del lado del cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Datos de sugerencias organizados por categorías
  const suggestions: Suggestion[] = [
    // Profesores y Cursos
    {
      id: "prof1",
      text: "¿Cómo es el profesor Martínez de Matemáticas?",
      category: "profesores",
      tags: ["profesores", "evaluación", "matemáticas"],
      popular: true,
    },
    {
      id: "prof2",
      text: "¿Qué metodología usa la profesora García en sus clases?",
      category: "profesores",
      tags: ["profesores", "metodología", "literatura"],
    },
    {
      id: "prof3",
      text: "¿Cuál es el estilo de evaluación del profesor Rodríguez?",
      category: "profesores",
      tags: ["profesores", "evaluación", "física"],
    },
    {
      id: "prof4",
      text: "¿Qué profesores recomiendan para Programación I?",
      category: "profesores",
      tags: ["profesores", "recomendaciones", "programación"],
      popular: true,
    },

    // Trámites Académicos
    {
      id: "tram1",
      text: "¿Cómo solicitar una revisión de examen?",
      category: "tramites",
      tags: ["trámites", "exámenes", "revisión"],
      popular: true,
    },
    {
      id: "tram2",
      text: "¿Cuál es el proceso para retirar una materia?",
      category: "tramites",
      tags: ["trámites", "retiro", "materias"],
    },
    {
      id: "tram3",
      text: "¿Cómo solicitar un certificado de estudios?",
      category: "tramites",
      tags: ["trámites", "certificados", "documentos"],
    },
    {
      id: "tram4",
      text: "¿Cuáles son los requisitos para cambio de carrera?",
      category: "tramites",
      tags: ["trámites", "cambio", "carrera"],
    },

    // Normativas
    {
      id: "norm1",
      text: "¿Cuál es el porcentaje mínimo de asistencia requerido?",
      category: "normativas",
      tags: ["normativas", "asistencia", "requisitos"],
      popular: true,
    },
    {
      id: "norm2",
      text: "¿Cuántas veces puedo reprobar una materia?",
      category: "normativas",
      tags: ["normativas", "reprobación", "materias"],
    },
    {
      id: "norm3",
      text: "¿Cuáles son los criterios para obtener una beca?",
      category: "normativas",
      tags: ["normativas", "becas", "requisitos"],
    },
    {
      id: "norm4",
      text: "¿Qué establece el reglamento sobre plagio académico?",
      category: "normativas",
      tags: ["normativas", "plagio", "ética"],
      popular: true,
    },

    // Calendario Académico
    {
      id: "cal1",
      text: "¿Cuándo inicia el próximo semestre?",
      category: "calendario",
      tags: ["calendario", "semestre", "fechas"],
    },
    {
      id: "cal2",
      text: "¿Cuál es el período de matrícula para el próximo semestre?",
      category: "calendario",
      tags: ["calendario", "matrícula", "fechas"],
      popular: true,
    },
    {
      id: "cal3",
      text: "¿Cuándo son las fechas de exámenes finales?",
      category: "calendario",
      tags: ["calendario", "exámenes", "fechas"],
    },
    {
      id: "cal4",
      text: "¿Cuáles son los días feriados del semestre actual?",
      category: "calendario",
      tags: ["calendario", "feriados", "fechas"],
    },
  ]

  // Filtrar sugerencias basadas en la búsqueda
  const filteredSuggestions = searchQuery
    ? suggestions.filter(
        (suggestion) =>
          suggestion.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          suggestion.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : suggestions

  // Obtener sugerencias populares
  const popularSuggestions = suggestions.filter((suggestion) => suggestion.popular)

  // Manejar clic en sugerencia
  const handleSuggestionClick = (text: string) => {
    router.push(`/?query=${encodeURIComponent(text)}`)
  }

  // Iconos por categoría
  const categoryIcons: Record<string, React.ReactNode> = {
    profesores: <User className="h-4 w-4" />,
    tramites: <FileText className="h-4 w-4" />,
    normativas: <BookMarked className="h-4 w-4" />,
    calendario: <Calendar className="h-4 w-4" />,
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
          <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white" onClick={() => router.push("/")}>
            <BookOpen className="h-4 w-4 mr-2" />
            Nuevo Chat
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
              onClick={() => router.push("/sobre")}
            >
              <Info className="h-4 w-4 mr-2" />
              Sobre AsistenteU
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white"
              onClick={() => router.push("/sugerencias")}
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Sugerencias
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
              onClick={() => router.push("/configuracion")}
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-zinc-200 dark:border-zinc-800 p-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => router.push("/")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-purple-600" />
                Sugerencias
              </h1>
            </div>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Buscar sugerencias..."
                className="pl-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="todas" className="w-full">
              <TabsList className="mb-6 grid grid-cols-5 max-w-2xl mx-auto">
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="populares">Populares</TabsTrigger>
                <TabsTrigger value="profesores">Profesores</TabsTrigger>
                <TabsTrigger value="tramites">Trámites</TabsTrigger>
                <TabsTrigger value="normativas">Normativas</TabsTrigger>
              </TabsList>

              <TabsContent value="todas">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((suggestion) => (
                      <Card
                        key={suggestion.id}
                        className="cursor-pointer hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
                        onClick={() => handleSuggestionClick(suggestion.text)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                              {categoryIcons[suggestion.category]}
                            </div>
                            <div>
                              <p className="font-medium">{suggestion.text}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {suggestion.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                                {suggestion.popular && (
                                  <Badge className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    Popular
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                      <Search className="h-12 w-12 text-zinc-400 mb-4" />
                      <h3 className="text-lg font-medium mb-1">No se encontraron sugerencias</h3>
                      <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
                        No hay sugerencias que coincidan con tu búsqueda. Intenta con otros términos o categorías.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="populares">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularSuggestions.map((suggestion) => (
                    <Card
                      key={suggestion.id}
                      className="cursor-pointer hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
                      onClick={() => handleSuggestionClick(suggestion.text)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                            {categoryIcons[suggestion.category]}
                          </div>
                          <div>
                            <p className="font-medium">{suggestion.text}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {suggestion.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              <Badge className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                Popular
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {["profesores", "tramites", "normativas", "calendario"].map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSuggestions
                      .filter((s) => s.category === category)
                      .map((suggestion) => (
                        <Card
                          key={suggestion.id}
                          className="cursor-pointer hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
                          onClick={() => handleSuggestionClick(suggestion.text)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                                {categoryIcons[suggestion.category]}
                              </div>
                              <div>
                                <p className="font-medium">{suggestion.text}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {suggestion.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="secondary"
                                      className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                  {suggestion.popular && (
                                    <Badge className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                                      <ThumbsUp className="h-3 w-3 mr-1" />
                                      Popular
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Tendencias */}
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Tendencias de consultas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      Profesores más consultados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>Profesor Martínez</span>
                        <Badge variant="outline">120 consultas</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Profesora García</span>
                        <Badge variant="outline">98 consultas</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Profesor Rodríguez</span>
                        <Badge variant="outline">87 consultas</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      Trámites populares
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>Revisión de examen</span>
                        <Badge variant="outline">145 consultas</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Retiro de materia</span>
                        <Badge variant="outline">112 consultas</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Certificado de estudios</span>
                        <Badge variant="outline">78 consultas</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      Normativas frecuentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>Asistencia mínima</span>
                        <Badge variant="outline">167 consultas</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Plagio académico</span>
                        <Badge variant="outline">103 consultas</Badge>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Requisitos de becas</span>
                        <Badge variant="outline">92 consultas</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
