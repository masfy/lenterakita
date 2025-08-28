"use client"
import { useEffect, useState } from "react"
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Bell,
  LogOut,
  Settings,
  GraduationCap,
  FileText,
  Trophy,
  Target,
  TrendingUp,
  ArrowLeft,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { dataStore } from "@/lib/data-store"

export default function KelolaKelas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingKelas, setEditingKelas] = useState(null)
  const [formData, setFormData] = useState({
    nama_kelas: "",
    wali_guru: "",
  })

  const [kelasList, setKelasList] = useState([])

  useEffect(() => {
    setKelasList(dataStore.getKelas())
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingKelas) {
      dataStore.updateKelas(editingKelas.id, {
        nama_kelas: formData.nama_kelas,
        wali_guru: formData.wali_guru,
      })
    } else {
      dataStore.addKelas({
        nama_kelas: formData.nama_kelas,
        jumlah_siswa: 0,
        wali_guru: formData.wali_guru,
        created_at: new Date().toISOString().split("T")[0],
      })
    }
    setKelasList(dataStore.getKelas())
    setFormData({ nama_kelas: "", wali_guru: "" })
    setEditingKelas(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (kelas) => {
    setEditingKelas(kelas)
    setFormData({
      nama_kelas: kelas.nama_kelas,
      wali_guru: kelas.wali_guru,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus kelas ini?")) {
      dataStore.deleteKelas(id)
      setKelasList(dataStore.getKelas())
    }
  }

  const filteredKelas = kelasList.filter((kelas) => kelas.nama_kelas.toLowerCase().includes(searchTerm.toLowerCase()))

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
                placeholder="Cari kelas..."
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
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-green-50 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Kelola Kelas</span>
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
              <span className="text-gray-900 font-medium">Kelola Kelas</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kelola Kelas</h1>
                <p className="text-gray-600">Kelola data kelas dan informasi wali kelas</p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setEditingKelas(null)
                      setFormData({ nama_kelas: "", wali_guru: "" })
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Kelas
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingKelas ? "Edit Kelas" : "Tambah Kelas Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nama_kelas">Nama Kelas</Label>
                      <Input
                        id="nama_kelas"
                        value={formData.nama_kelas}
                        onChange={(e) => setFormData((prev) => ({ ...prev, nama_kelas: e.target.value }))}
                        placeholder="Contoh: VIII A"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wali_guru">Wali Kelas</Label>
                      <Input
                        id="wali_guru"
                        value={formData.wali_guru}
                        onChange={(e) => setFormData((prev) => ({ ...prev, wali_guru: e.target.value }))}
                        placeholder="Nama wali kelas"
                        required
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="bg-green-600 hover:bg-green-700">
                        {editingKelas ? "Simpan Perubahan" : "Tambah Kelas"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="bg-transparent"
                      >
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Kelas</p>
                      <p className="text-2xl font-bold text-gray-900">{kelasList.length}</p>
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
                      <p className="text-2xl font-bold text-gray-900">
                        {kelasList.reduce((sum, kelas) => sum + kelas.jumlah_siswa, 0)}
                      </p>
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
                      <p className="text-sm font-medium text-gray-600">Rata-rata per Kelas</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {kelasList.length > 0
                          ? Math.round(kelasList.reduce((sum, kelas) => sum + kelas.jumlah_siswa, 0) / kelasList.length)
                          : 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <Card>
              <CardHeader>
                <CardTitle>Daftar Kelas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Kelas</TableHead>
                      <TableHead>Wali Kelas</TableHead>
                      <TableHead>Jumlah Siswa</TableHead>
                      <TableHead>Tanggal Dibuat</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKelas.map((kelas) => (
                      <TableRow key={kelas.id}>
                        <TableCell className="font-medium">{kelas.nama_kelas}</TableCell>
                        <TableCell>{kelas.wali_guru}</TableCell>
                        <TableCell>{kelas.jumlah_siswa} siswa</TableCell>
                        <TableCell>
                          {new Date(kelas.created_at).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(kelas)}
                              className="bg-transparent"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(kelas.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredKelas.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    {searchTerm ? "Tidak ada kelas yang ditemukan" : "Belum ada data kelas"}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
