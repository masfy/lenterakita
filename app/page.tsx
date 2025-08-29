"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { BookOpen, Eye, EyeOff, User, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PWAInstall from "./components/pwa-install"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("siswa")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call - replace with actual authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (activeTab === "guru" && formData.username === "guru1" && formData.password === "password") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: 1,
            role: "guru",
            nama: "Ibu Fithratun Nisa",
            username: "guru1",
          }),
        )
        window.location.href = "/dashboard/guru"
      } else if (activeTab === "siswa" && formData.username === "siswa1" && formData.password === "password") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: 1,
            role: "siswa",
            nama: "Ahmad Rizki",
            username: "siswa1",
            kelas_id: 1,
          }),
        )
        window.location.href = "/dashboard/siswa"
      } else {
        setError("Username atau password salah untuk " + (activeTab === "guru" ? "Guru" : "Siswa"))
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Lentera</span>
          </div>
          <CardTitle className="text-xl text-gray-900">Masuk ke Akun Anda</CardTitle>
          <p className="text-sm text-gray-600">Sistem Aktivitas Literasi</p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="siswa" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Siswa
              </TabsTrigger>
              <TabsTrigger value="guru" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Guru
              </TabsTrigger>
            </TabsList>

            <TabsContent value="siswa" className="mt-4">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Masuk sebagai Siswa</p>
              </div>
            </TabsContent>

            <TabsContent value="guru" className="mt-4">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <GraduationCap className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Masuk sebagai Guru</p>
              </div>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                placeholder="Masukkan username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Masukkan password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}

            <Button
              type="submit"
              className={`w-full ${activeTab === "guru" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : `Masuk sebagai ${activeTab === "guru" ? "Guru" : "Siswa"}`}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Akun Demo:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <div>
                <strong>Guru:</strong> guru1 / password
              </div>
              <div>
                <strong>Siswa:</strong> siswa1 / password
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <PWAInstall />
    </div>
  )
}
