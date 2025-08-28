"use client"

import { useEffect, useState } from "react"
import {
  BookOpen,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  Bell,
  Search,
  LogOut,
  Settings,
  GraduationCap,
  FileText,
  Trophy,
  Target,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface User {
  id: number
  role: string
  nama: string
  username: string
}

export default function GuruDashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "guru") {
        window.location.href = "/"
        return
      }
      setUser(parsedUser)
    } else {
      window.location.href = "/"
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Lentera</span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari aktivitas, siswa..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/diverse-classroom-teacher.png" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.nama}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">MENU UTAMA</h3>
              <nav className="space-y-2">
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-green-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Dashboard</span>
                </a>
                <a
                  href="/dashboard/guru/kelas"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Kelola Kelas</span>
                </a>
                <a
                  href="/dashboard/guru/kelola-siswa"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <Users className="w-5 h-5" />
                  <span>Kelola Siswa</span>
                </a>
                <a
                  href="/dashboard/guru/verifikasi"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <FileText className="w-5 h-5" />
                  <span>Verifikasi Aktivitas</span>
                </a>
                <a
                  href="/dashboard/guru/leaderboard"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Leaderboard</span>
                </a>
                <a
                  href="/dashboard/guru/level-target"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <Target className="w-5 h-5" />
                  <span>Level & Target</span>
                </a>
              </nav>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">PENGATURAN</h3>
              <nav className="space-y-2">
                <a
                  href="/dashboard/guru/profil"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <Settings className="w-5 h-5" />
                  <span>Profil</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Keluar</span>
                </button>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl">
            {/* Welcome Banner */}
            <Card className="mb-8 overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 border-0">
              <CardContent className="p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Selamat Datang, {user.nama}!</h1>
                    <p className="text-green-100 mb-4">Kelola aktivitas literasi siswa dengan mudah</p>
                    <div className="text-sm opacity-90">
                      Hari ini:{" "}
                      {new Date().toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Kelas</p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Siswa</p>
                      <p className="text-2xl font-bold text-gray-900">89</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Menunggu Verifikasi</p>
                      <p className="text-2xl font-bold text-orange-600">12</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Disetujui Bulan Ini</p>
                      <p className="text-2xl font-bold text-green-600">156</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Aktivitas Menunggu Verifikasi</span>
                    <Button variant="link" className="text-green-600">
                      Lihat Semua
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { nama: "Ahmad Rizki", kelas: "VIII A", judul: "Laskar Pelangi", waktu: "2 jam lalu" },
                      { nama: "Siti Nurhaliza", kelas: "VIII B", judul: "Bumi Manusia", waktu: "4 jam lalu" },
                      { nama: "Budi Santoso", kelas: "VIII A", judul: "Ayat-Ayat Cinta", waktu: "6 jam lalu" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {item.nama
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{item.nama}</p>
                            <p className="text-xs text-gray-500">
                              {item.kelas} • {item.judul}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{item.waktu}</p>
                          <div className="flex gap-1 mt-1">
                            <Button size="sm" className="h-6 text-xs bg-green-600 hover:bg-green-700">
                              Setujui
                            </Button>
                            <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                              Tolak
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Students */}
              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Leaderboard - VIII A</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { nama: "Ahmad Rizki", poin: 450, level: "Level 4", posisi: 1 },
                      { nama: "Siti Nurhaliza", poin: 380, level: "Level 4", posisi: 2 },
                      { nama: "Budi Santoso", poin: 320, level: "Level 3", posisi: 3 },
                      { nama: "Dewi Sartika", poin: 280, level: "Level 3", posisi: 4 },
                      { nama: "Rudi Hermawan", poin: 250, level: "Level 3", posisi: 5 },
                    ].map((siswa, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-sm font-bold text-yellow-700">
                            {siswa.posisi}
                          </div>
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {siswa.nama
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{siswa.nama}</p>
                            <Badge variant="secondary" className="text-xs">
                              {siswa.level}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{siswa.poin} poin</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
