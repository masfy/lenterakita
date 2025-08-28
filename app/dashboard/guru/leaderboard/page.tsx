"use client"

import { useState } from "react"
import {
  BookOpen,
  Search,
  Trophy,
  Medal,
  Award,
  Crown,
  Bell,
  LogOut,
  Settings,
  GraduationCap,
  FileText,
  Target,
  TrendingUp,
  Users,
  ArrowLeft,
  Download,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LeaderboardEntry {
  posisi: number
  siswa_id: number
  nama: string
  total_poin: number
  level: string
  total_durasi: number
  jumlah_aktivitas: number
  aktivitas_terakhir: string
}

export default function GuruLeaderboard() {
  const [selectedKelas, setSelectedKelas] = useState("VIII A")

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  // Mock data
  const kelasList = ["VIII A", "VIII B", "VIII C"]

  const leaderboardData: LeaderboardEntry[] = [
    {
      posisi: 1,
      siswa_id: 1,
      nama: "Ahmad Rizki",
      total_poin: 450,
      level: "Level 4",
      total_durasi: 420,
      jumlah_aktivitas: 18,
      aktivitas_terakhir: "2024-08-25",
    },
    {
      posisi: 2,
      siswa_id: 2,
      nama: "Siti Nurhaliza",
      total_poin: 380,
      level: "Level 4",
      total_durasi: 350,
      jumlah_aktivitas: 15,
      aktivitas_terakhir: "2024-08-24",
    },
    {
      posisi: 3,
      siswa_id: 3,
      nama: "Budi Santoso",
      total_poin: 320,
      level: "Level 3",
      total_durasi: 310,
      jumlah_aktivitas: 14,
      aktivitas_terakhir: "2024-08-23",
    },
    {
      posisi: 4,
      siswa_id: 4,
      nama: "Dewi Sartika",
      total_poin: 280,
      level: "Level 3",
      total_durasi: 275,
      jumlah_aktivitas: 12,
      aktivitas_terakhir: "2024-08-22",
    },
    {
      posisi: 5,
      siswa_id: 5,
      nama: "Rudi Hermawan",
      total_poin: 250,
      level: "Level 3",
      total_durasi: 240,
      jumlah_aktivitas: 11,
      aktivitas_terakhir: "2024-08-21",
    },
    {
      posisi: 6,
      siswa_id: 6,
      nama: "Maya Putri",
      total_poin: 220,
      level: "Level 3",
      total_durasi: 210,
      jumlah_aktivitas: 10,
      aktivitas_terakhir: "2024-08-20",
    },
    {
      posisi: 7,
      siswa_id: 7,
      nama: "Andi Pratama",
      total_poin: 180,
      level: "Level 2",
      total_durasi: 175,
      jumlah_aktivitas: 8,
      aktivitas_terakhir: "2024-08-19",
    },
    {
      posisi: 8,
      siswa_id: 8,
      nama: "Rina Wati",
      total_poin: 150,
      level: "Level 2",
      total_durasi: 145,
      jumlah_aktivitas: 7,
      aktivitas_terakhir: "2024-08-18",
    },
  ]

  const getRankIcon = (posisi: number) => {
    switch (posisi) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
            {posisi}
          </div>
        )
    }
  }

  const getRankBadgeColor = (posisi: number) => {
    switch (posisi) {
      case 1:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case 2:
        return "bg-gray-100 text-gray-800 border-gray-200"
      case 3:
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const exportLeaderboard = () => {
    // Mock export functionality
    alert("Leaderboard berhasil diekspor ke CSV!")
  }

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
                placeholder="Cari siswa..."
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
              <span className="text-sm font-medium">Ibu Sari Dewi</span>
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
                <a
                  href="/dashboard/guru"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Dashboard</span>
                </a>
                <a
                  href="/dashboard/guru/kelas"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Kelola Kelas</span>
                </a>
                <a
                  href="#"
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
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-green-50 rounded-lg">
                  <Trophy className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Leaderboard</span>
                </a>
                <a
                  href="#"
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
                  href="#"
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
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="sm" asChild>
                <a href="/dashboard/guru" className="flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </a>
              </Button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Leaderboard</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Leaderboard Kelas</h1>
                <p className="text-gray-600">Peringkat siswa berdasarkan total poin aktivitas literasi</p>
              </div>
              <div className="flex gap-3">
                <Select value={selectedKelas} onValueChange={setSelectedKelas}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {kelasList.map((kelas) => (
                      <SelectItem key={kelas} value={kelas}>
                        {kelas}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={exportLeaderboard} variant="outline" className="bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {leaderboardData.slice(0, 3).map((siswa, index) => (
                <Card key={siswa.siswa_id} className={`${index === 0 ? "ring-2 ring-yellow-200" : ""}`}>
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">{getRankIcon(siswa.posisi)}</div>
                    <Avatar className="w-16 h-16 mx-auto mb-4">
                      <AvatarImage src={`/student-${siswa.siswa_id}.png`} />
                      <AvatarFallback>
                        {siswa.nama
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-gray-900 mb-1">{siswa.nama}</h3>
                    <Badge className={`mb-3 ${getRankBadgeColor(siswa.posisi)}`}>Peringkat {siswa.posisi}</Badge>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Poin:</span>
                        <span className="font-bold text-green-600">{siswa.total_poin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Level:</span>
                        <Badge variant="secondary" className="text-xs">
                          {siswa.level}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Aktivitas:</span>
                        <span className="font-medium">{siswa.jumlah_aktivitas}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Full Leaderboard Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-600" />
                  Leaderboard Lengkap - {selectedKelas}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((siswa) => (
                    <div
                      key={siswa.siswa_id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        siswa.posisi <= 3
                          ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
                          : "bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12">
                          {siswa.posisi <= 3 ? (
                            getRankIcon(siswa.posisi)
                          ) : (
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                              {siswa.posisi}
                            </div>
                          )}
                        </div>
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={`/student-${siswa.siswa_id}.png`} />
                          <AvatarFallback>
                            {siswa.nama
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{siswa.nama}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {siswa.level}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Terakhir aktif:{" "}
                              {new Date(siswa.aktivitas_terakhir).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-green-600 text-lg">{siswa.total_poin}</div>
                          <div className="text-gray-500">Poin</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{siswa.total_durasi}</div>
                          <div className="text-gray-500">Menit</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{siswa.jumlah_aktivitas}</div>
                          <div className="text-gray-500">Aktivitas</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {leaderboardData.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">Belum ada data leaderboard</p>
                    <p className="text-sm">Data akan muncul setelah siswa mulai mengumpulkan poin</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Rata-rata Poin</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(leaderboardData.reduce((sum, s) => sum + s.total_poin, 0) / leaderboardData.length)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Aktivitas</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {leaderboardData.reduce((sum, s) => sum + s.jumlah_aktivitas, 0)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Siswa Aktif</p>
                      <p className="text-2xl font-bold text-gray-900">{leaderboardData.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
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
