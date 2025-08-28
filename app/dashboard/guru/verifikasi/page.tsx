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
  GraduationCap,
  FileText,
  Trophy,
  Target,
  TrendingUp,
  Users,
  ArrowLeft,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { dataStore } from "@/lib/data-store"

export default function VerifikasiAktivitas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterKelas, setFilterKelas] = useState("Semua Kelas")
  const [filterStatus, setFilterStatus] = useState("Semua Status")
  const [selectedAktivitas, setSelectedAktivitas] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [verifikasiData, setVerifikasiData] = useState({
    status: "",
    catatan: "",
  })

  const [aktivitasList, setAktivitasList] = useState([])

  useEffect(() => {
    setAktivitasList(dataStore.getAktivitas())
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const handleVerifikasi = (aktivitas) => {
    setSelectedAktivitas(aktivitas)
    setVerifikasiData({ status: "", catatan: "" })
    setIsDetailOpen(true)
  }

  const handleSubmitVerifikasi = () => {
    if (!selectedAktivitas || !verifikasiData.status) return

    dataStore.updateAktivitas(selectedAktivitas.id, {
      status: verifikasiData.status,
      catatan_verifikasi: verifikasiData.catatan,
    })

    setAktivitasList(dataStore.getAktivitas())
    setIsDetailOpen(false)
    setSelectedAktivitas(null)
    setVerifikasiData({ status: "", catatan: "" })
  }

  const filteredAktivitas = aktivitasList.filter((aktivitas) => {
    const matchSearch =
      aktivitas.siswa_nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aktivitas.judul_bacaan.toLowerCase().includes(searchTerm.toLowerCase())
    const matchKelas = !filterKelas || aktivitas.kelas === filterKelas
    const matchStatus = !filterStatus || aktivitas.status === filterStatus

    return matchSearch && matchKelas && matchStatus
  })

  const statusCounts = {
    menunggu: aktivitasList.filter((a) => a.status === "Menunggu").length,
    disetujui: aktivitasList.filter((a) => a.status === "Disetujui").length,
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
                placeholder="Cari siswa atau judul bacaan..."
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
                  href="/dashboard/guru/kelola-siswa"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <Users className="w-5 h-5" />
                  <span>Kelola Siswa</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-green-50 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Verifikasi Aktivitas</span>
                </a>
                <a
                  href="/dashboard/guru/leaderboard"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Leaderboard</span>
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
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="sm" asChild>
                <a href="/dashboard/guru" className="flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </a>
              </Button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Verifikasi Aktivitas</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Verifikasi Aktivitas</h1>
                <p className="text-gray-600">Verifikasi aktivitas membaca yang diajukan siswa</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Menunggu Verifikasi</p>
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

            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="filter-kelas">Filter Kelas</Label>
                    <Select value={filterKelas} onValueChange={setFilterKelas}>
                      <SelectTrigger>
                        <SelectValue placeholder="Semua Kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Semua Kelas">Semua Kelas</SelectItem>
                        <SelectItem value="VIII A">VIII A</SelectItem>
                        <SelectItem value="VIII B">VIII B</SelectItem>
                        <SelectItem value="VIII C">VIII C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="filter-status">Filter Status</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Semua Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Semua Status">Semua Status</SelectItem>
                        <SelectItem value="Menunggu">Menunggu</SelectItem>
                        <SelectItem value="Disetujui">Disetujui</SelectItem>
                        <SelectItem value="Ditolak">Ditolak</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table */}
            <Card>
              <CardHeader>
                <CardTitle>Daftar Aktivitas ({filteredAktivitas.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Siswa</TableHead>
                      <TableHead>Judul Bacaan</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Durasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAktivitas.map((aktivitas) => (
                      <TableRow key={aktivitas.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{aktivitas.siswa_nama}</div>
                            <div className="text-sm text-gray-500">{aktivitas.kelas}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{aktivitas.judul_bacaan}</div>
                            <div className="text-sm text-gray-500">{aktivitas.penulis_sumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>{aktivitas.jenis_bacaan}</TableCell>
                        <TableCell>{aktivitas.durasi_menit} menit</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>
                          {new Date(aktivitas.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerifikasi(aktivitas)}
                            className="bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredAktivitas.length === 0 && (
                  <div className="text-center py-8 text-gray-500">Tidak ada aktivitas yang ditemukan</div>
                )}
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
                  <Label className="text-sm font-medium text-gray-600">Nama Siswa</Label>
                  <p className="text-gray-900">{selectedAktivitas.siswa_nama}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Kelas</Label>
                  <p className="text-gray-900">{selectedAktivitas.kelas}</p>
                </div>
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
                  <Label className="text-sm font-medium text-gray-600">Status Saat Ini</Label>
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

              {selectedAktivitas.status === "Menunggu" && (
                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Verifikasi Aktivitas</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="status">Status Verifikasi</Label>
                      <Select
                        value={verifikasiData.status}
                        onValueChange={(value) => setVerifikasiData((prev) => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Disetujui">Disetujui</SelectItem>
                          <SelectItem value="Ditolak">Ditolak</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="catatan">Catatan {verifikasiData.status === "Ditolak" && "(Wajib diisi)"}</Label>
                      <Textarea
                        id="catatan"
                        value={verifikasiData.catatan}
                        onChange={(e) => setVerifikasiData((prev) => ({ ...prev, catatan: e.target.value }))}
                        placeholder={
                          verifikasiData.status === "Ditolak"
                            ? "Jelaskan alasan penolakan..."
                            : "Catatan tambahan (opsional)"
                        }
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={handleSubmitVerifikasi}
                        disabled={
                          !verifikasiData.status || (verifikasiData.status === "Ditolak" && !verifikasiData.catatan)
                        }
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Simpan Verifikasi
                      </Button>
                      <Button variant="outline" onClick={() => setIsDetailOpen(false)} className="bg-transparent">
                        Batal
                      </Button>
                    </div>
                  </div>
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
