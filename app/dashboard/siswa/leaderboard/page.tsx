"use client"
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
  FileText,
  TrendingUp,
  Plus,
  ArrowLeft,
  Target,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LeaderboardEntry {
  posisi: number
  siswa_id: number
  nama: string
  total_poin: number
  level: string
  total_durasi: number
  jumlah_aktivitas: number
  aktivitas_terakhir: string
  isCurrentUser?: boolean
}

export default function SiswaLeaderboard() {
  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  // Mock data - current user is Ahmad Rizki (posisi 1)
  const currentUserId = 1
  const kelasName = "VIII A"

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
      isCurrentUser: true,
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

  const currentUser = leaderboardData.find((s) => s.siswa_id === currentUserId)
  const nextUser = leaderboardData.find((s) => s.posisi === (currentUser?.posisi || 0) - 1)

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
                placeholder="Cari teman sekelas..."
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
              <span className="text-sm font-medium">Ahmad Rizki</span>
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
                  href="/dashboard/siswa"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Dashboard</span>
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
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-green-50 rounded-lg">
                  <Trophy className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Leaderboard</span>
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
                <a href="/dashboard/siswa" className="flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </a>
              </Button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Leaderboard</span>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Leaderboard Kelas {kelasName}</h1>
              <p className="text-gray-600">Lihat peringkat Anda dan teman-teman sekelas berdasarkan poin literasi</p>
            </div>

            {/* Current User Status */}
            {currentUser && (
              <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center">{getRankIcon(currentUser.posisi)}</div>
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="/diverse-students-studying.png" />
                        <AvatarFallback>AR</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Posisi Anda: #{currentUser.posisi}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getRankBadgeColor(currentUser.posisi)}>
                            {currentUser.posisi === 1 ? "Juara 1" : `Peringkat ${currentUser.posisi}`}
                          </Badge>
                          <Badge variant="secondary">{currentUser.level}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">{currentUser.total_poin}</div>
                      <div className="text-sm text-gray-600">Total Poin</div>
                      {nextUser && (
                        <div className="mt-2 text-sm text-gray-500">
                          Butuh {nextUser.total_poin - currentUser.total_poin + 1} poin lagi untuk naik peringkat
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {leaderboardData.slice(0, 3).map((siswa, index) => (
                <Card
                  key={siswa.siswa_id}
                  className={`${index === 0 ? "ring-2 ring-yellow-200" : ""} ${siswa.isCurrentUser ? "bg-green-50 border-green-200" : ""}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">{getRankIcon(siswa.posisi)}</div>
                    <Avatar className="w-16 h-16 mx-auto mb-4">
                      <AvatarImage
                        src={siswa.isCurrentUser ? "/diverse-students-studying.png" : `/student-${siswa.siswa_id}.png`}
                      />
                      <AvatarFallback>
                        {siswa.nama
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className={`font-semibold mb-1 ${siswa.isCurrentUser ? "text-green-700" : "text-gray-900"}`}>
                      {siswa.isCurrentUser ? "Anda" : siswa.nama}
                    </h3>
                    <Badge className={`mb-3 ${getRankBadgeColor(siswa.posisi)}`}>
                      {siswa.posisi === 1 ? "Juara 1" : `Peringkat ${siswa.posisi}`}
                    </Badge>
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

            {/* Full Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-600" />
                  Leaderboard Lengkap - {kelasName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.map((siswa) => (
                    <div
                      key={siswa.siswa_id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        siswa.isCurrentUser
                          ? "bg-green-50 border-green-200 ring-2 ring-green-100"
                          : siswa.posisi <= 3
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
                          <AvatarImage
                            src={
                              siswa.isCurrentUser ? "/diverse-students-studying.png" : `/student-${siswa.siswa_id}.png`
                            }
                          />
                          <AvatarFallback>
                            {siswa.nama
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className={`font-semibold ${siswa.isCurrentUser ? "text-green-700" : "text-gray-900"}`}>
                            {siswa.isCurrentUser ? "Anda" : siswa.nama}
                            {siswa.isCurrentUser && <span className="ml-2 text-sm text-green-600">(Anda)</span>}
                          </h3>
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
              </CardContent>
            </Card>

            {/* Motivation Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Tips Meningkatkan Peringkat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Konsisten Membaca</h4>
                    <p>Baca setiap hari minimal 30 menit untuk mengumpulkan poin secara konsisten.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Variasi Bacaan</h4>
                    <p>Baca berbagai jenis buku dan artikel untuk memperluas wawasan dan poin.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Kualitas Refleksi</h4>
                    <p>Tulis refleksi yang mendalam agar aktivitas mudah disetujui guru.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Kompetisi Sehat</h4>
                    <p>Jadikan leaderboard sebagai motivasi untuk terus meningkatkan literasi.</p>
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
