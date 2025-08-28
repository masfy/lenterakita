"use client"

import { useState, useEffect } from "react"
import {
  BookOpen,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Bell,
  LogOut,
  Settings,
  FileText,
  Trophy,
  TrendingUp,
  Plus,
  ArrowLeft,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dataStore, type Aktivitas } from "@/lib/data-store"

export default function DaftarAktivitas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAktivitas, setSelectedAktivitas] = useState<Aktivitas | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [aktivitasList, setAktivitasList] = useState<Aktivitas[]>([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      // Filter activities for current user
      const userActivities = dataStore.getAktivitasBySiswa(user.id)
      setAktivitasList(userActivities)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const handleViewDetail = (aktivitas: Aktivitas) => {
    setSelectedAktivitas(aktivitas)
    setIsDetailOpen(true)
  }

  const filteredAktivitas = (status: string) => {
    return aktivitasList.filter((aktivitas) => {
      const matchSearch =
        aktivitas.judul_bacaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aktivitas.penulis_sumber.toLowerCase().includes(searchTerm.toLowerCase())
      const matchStatus = status === "Semua" || aktivitas.status === status

      return matchSearch && matchStatus
    })
  }

  const statusCounts = {
    disetujui: aktivitasList.filter((a) => a.status === "Disetujui").length,
    menunggu: aktivitasList.filter((a) => a.status === "Menunggu").length,
    ditolak: aktivitasList.filter((a) => a.status === "Ditolak").length,
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
                placeholder="Cari judul atau penulis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-green-50 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Daftar Aktivitas</span>
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
              <span className="text-gray-900 font-medium">Daftar Aktivitas</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Daftar Aktivitas Membaca</h1>
                <p className="text-gray-600">Lihat semua aktivitas membaca yang telah Anda catat</p>
              </div>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a href="/dashboard/siswa/tambah">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Aktivitas
                </a>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Disetujui</p>
                      <p className="text-2xl font-bold text-green-600">{statusCounts.disetujui}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Menunggu</p>
                      <p className="text-2xl font-bold text-orange-600">{statusCounts.menunggu}</p>
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
                      <p className="text-sm font-medium text-gray-600">Ditolak</p>
                      <p className="text-2xl font-bold text-red-600">{statusCounts.ditolak}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="Disetujui" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="Disetujui">Disetujui ({statusCounts.disetujui})</TabsTrigger>
                    <TabsTrigger value="Menunggu">Menunggu ({statusCounts.menunggu})</TabsTrigger>
                    <TabsTrigger value="Ditolak">Ditolak ({statusCounts.ditolak})</TabsTrigger>
                  </TabsList>

                  {["Disetujui", "Menunggu", "Ditolak"].map((status) => (
                    <TabsContent key={status} value={status} className="mt-6">
                      <div className="space-y-4">
                        {filteredAktivitas(status).map((aktivitas) => (
                          <Card key={aktivitas.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <BookOpen className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-gray-900 mb-1">{aktivitas.judul_bacaan}</h3>
                                      <p className="text-sm text-gray-600 mb-2">
                                        {aktivitas.penulis_sumber} • {aktivitas.jenis_bacaan}
                                      </p>
                                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                        <span>{aktivitas.durasi_menit} menit</span>
                                        <span>
                                          {new Date(aktivitas.tanggal_baca).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                          })}
                                        </span>
                                        {aktivitas.status === "Disetujui" && (
                                          <span className="text-green-600 font-medium">
                                            +{aktivitas.durasi_menit} poin
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-sm text-gray-700 line-clamp-2">{aktivitas.ringkasan}</p>
                                      {aktivitas.status === "Ditolak" && aktivitas.catatan_verifikasi && (
                                        <div className="mt-3 p-3 bg-red-50 rounded-lg">
                                          <p className="text-sm text-red-800">
                                            <strong>Alasan penolakan:</strong> {aktivitas.catatan_verifikasi}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                  <Badge
                                    variant={
                                      aktivitas.status === "Disetujui"
                                        ? "default"
                                        : aktivitas.status === "Ditolak"
                                          ? "destructive"
                                          : "secondary"
                                    }
                                    className={
                                      aktivitas.status === "Disetujui"
                                        ? "bg-green-100 text-green-700"
                                        : aktivitas.status === "Ditolak"
                                          ? "bg-red-100 text-red-700"
                                          : "bg-orange-100 text-orange-700"
                                    }
                                  >
                                    {aktivitas.status}
                                  </Badge>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleViewDetail(aktivitas)}
                                    className="bg-transparent"
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    Detail
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {filteredAktivitas(status).length === 0 && (
                          <div className="text-center py-12 text-gray-500">
                            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium mb-2">Belum ada aktivitas {status.toLowerCase()}</p>
                            <p className="text-sm">
                              {status === "Disetujui" && "Aktivitas yang disetujui akan muncul di sini"}
                              {status === "Menunggu" && "Aktivitas yang menunggu verifikasi akan muncul di sini"}
                              {status === "Ditolak" && "Aktivitas yang ditolak akan muncul di sini"}
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Aktivitas Membaca</DialogTitle>
          </DialogHeader>
          {selectedAktivitas && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Judul Bacaan</Label>
                  <p className="text-gray-900">{selectedAktivitas.judul_bacaan}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Penulis/Sumber</Label>
                  <p className="text-gray-900">{selectedAktivitas.penulis_sumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Jenis Bacaan</Label>
                  <p className="text-gray-900">{selectedAktivitas.jenis_bacaan}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Durasi Membaca</Label>
                  <p className="text-gray-900">{selectedAktivitas.durasi_menit} menit</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Tanggal Baca</Label>
                  <p className="text-gray-900">
                    {new Date(selectedAktivitas.tanggal_baca).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Status</Label>
                  <Badge
                    variant={
                      selectedAktivitas.status === "Disetujui"
                        ? "default"
                        : selectedAktivitas.status === "Ditolak"
                          ? "destructive"
                          : "secondary"
                    }
                    className={
                      selectedAktivitas.status === "Disetujui"
                        ? "bg-green-100 text-green-700"
                        : selectedAktivitas.status === "Ditolak"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                    }
                  >
                    {selectedAktivitas.status}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Ringkasan</Label>
                <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg text-sm">{selectedAktivitas.ringkasan}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Refleksi</Label>
                <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg text-sm">{selectedAktivitas.refleksi}</p>
              </div>

              {selectedAktivitas.bukti_url && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Bukti/Link</Label>
                  <a
                    href={selectedAktivitas.bukti_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {selectedAktivitas.bukti_url}
                  </a>
                </div>
              )}

              {selectedAktivitas.catatan_verifikasi && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Catatan Verifikasi</Label>
                  <p className="text-gray-900 mt-1 p-3 bg-yellow-50 rounded-lg text-sm">
                    {selectedAktivitas.catatan_verifikasi}
                  </p>
                </div>
              )}

              {selectedAktivitas.status === "Disetujui" && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-medium">
                    Poin yang diperoleh: +{selectedAktivitas.durasi_menit} poin
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
