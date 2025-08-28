"use client"

import { useEffect, useState } from "react"
import {
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Trophy,
  Target,
  Bell,
  Search,
  LogOut,
  Settings,
  FileText,
  Award,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface User {
  id: number
  role: string
  nama: string
  username: string
  kelas_id: number
}

export default function SiswaDashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "siswa") {
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

  // Mock data
  const currentLevel = { nama: "Level 3", min_poin: 200, max_poin: 349 }
  const totalPoin = 285
  const progressToNext = ((totalPoin - currentLevel.min_poin) / (currentLevel.max_poin - currentLevel.min_poin)) * 100

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
                placeholder="Cari aktivitas..."
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
                <AvatarImage src="/diverse-students-studying.png" />
                <AvatarFallback>AR</AvatarFallback>
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
                  href="/dashboard/siswa/tambah"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Tambah Aktivitas</span>
                </a>
                <a
                  href="/dashboard/siswa/aktivitas"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <FileText className="w-5 h-5" />
                  <span>Daftar Aktivitas</span>
                </a>
                <a
                  href="/dashboard/siswa/leaderboard"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Leaderboard</span>
                </a>
              </nav>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">PENGATURAN</h3>
              <nav className="space-y-2">
                <a
                  href="/dashboard/siswa/profil"
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
                    <h1 className="text-3xl font-bold mb-2">Halo, {user.nama}!</h1>
                    <p className="text-green-100 mb-4">Terus tingkatkan aktivitas literasimu</p>
                    <div className="text-sm opacity-90">
                      Kelas VIII A •{" "}
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
            <div className="grid grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Poin</p>
                      <p className="text-3xl font-bold text-green-600">{totalPoin}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Level Saat Ini</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-blue-100 text-blue-700">{currentLevel.nama}</Badge>
                      </div>
                      <div className="mt-2">
                        <Progress value={progressToNext} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">{Math.round(progressToNext)}% menuju Level 4</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Disetujui</span>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-green-600">15</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Menunggu</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span className="font-bold text-orange-600">3</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Ditolak</span>
                      <div className="flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="font-bold text-red-600">1</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button asChild className="w-full justify-start bg-green-600 hover:bg-green-700">
                      <a href="/dashboard/siswa/tambah">
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Aktivitas Baru
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                      <a href="/dashboard/siswa/aktivitas">
                        <FileText className="w-4 h-4 mr-2" />
                        Lihat Semua Aktivitas
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Trophy className="w-4 h-4 mr-2" />
                      Lihat Leaderboard Kelas
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { judul: "Laskar Pelangi", status: "Disetujui", poin: 45, tanggal: "2 hari lalu" },
                      { judul: "Bumi Manusia", status: "Menunggu", poin: 0, tanggal: "1 hari lalu" },
                      { judul: "Ayat-Ayat Cinta", status: "Disetujui", poin: 60, tanggal: "3 hari lalu" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{item.judul}</p>
                          <p className="text-xs text-gray-500">{item.tanggal}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={item.status === "Disetujui" ? "default" : "secondary"}
                            className={
                              item.status === "Disetujui"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }
                          >
                            {item.status}
                          </Badge>
                          {item.poin > 0 && (
                            <p className="text-xs text-green-600 font-medium mt-1">+{item.poin} poin</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tips Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  Tips Membaca Berkelanjutan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Jadwalkan Waktu Membaca</h4>
                    <p>Sisihkan minimal 30 menit setiap hari untuk membaca. Konsistensi adalah kunci!</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Variasikan Jenis Bacaan</h4>
                    <p>Baca berbagai jenis buku: fiksi, non-fiksi, artikel, dan komik untuk memperluas wawasan.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Buat Catatan Refleksi</h4>
                    <p>Tulis refleksi singkat setelah membaca untuk memperdalam pemahaman.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Diskusi dengan Teman</h4>
                    <p>Bagikan pengalaman membaca dengan teman untuk mendapat perspektif baru.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
