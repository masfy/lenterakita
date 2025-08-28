"use client"

import type React from "react"
import { dataStore } from "@/lib/data-store"
import { useState } from "react"
import { BookOpen, Plus, Search, Bell, LogOut, Settings, FileText, Trophy, TrendingUp, ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TambahAktivitas() {
  const [formData, setFormData] = useState({
    judul_bacaan: "",
    jenis_bacaan: "",
    penulis_sumber: "",
    tanggal_baca: "",
    durasi_menit: "",
    ringkasan: "",
    refleksi: "",
    bukti_url: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const userData = localStorage.getItem("user")
      if (!userData) {
        throw new Error("User not found")
      }
      const user = JSON.parse(userData)

      dataStore.addAktivitas({
        siswa_id: user.id,
        siswa_nama: user.nama,
        kelas: "VIII A", // This should come from user data
        judul_bacaan: formData.judul_bacaan,
        jenis_bacaan: formData.jenis_bacaan,
        penulis_sumber: formData.penulis_sumber,
        tanggal_baca: formData.tanggal_baca,
        durasi_menit: Number.parseInt(formData.durasi_menit),
        ringkasan: formData.ringkasan,
        refleksi: formData.refleksi,
        bukti_url: formData.bukti_url,
        status: "Menunggu",
        created_at: new Date().toISOString(),
      })

      // Reset form
      setFormData({
        judul_bacaan: "",
        jenis_bacaan: "",
        penulis_sumber: "",
        tanggal_baca: "",
        durasi_menit: "",
        ringkasan: "",
        refleksi: "",
        bukti_url: "",
      })

      alert("Aktivitas berhasil ditambahkan dan menunggu verifikasi!")
      window.location.href = "/dashboard/siswa"
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan aktivitas")
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const requiredFields = [
      "judul_bacaan",
      "jenis_bacaan",
      "penulis_sumber",
      "tanggal_baca",
      "durasi_menit",
      "ringkasan",
      "refleksi",
    ]
    const isValid = requiredFields.every((field) => formData[field as keyof typeof formData])
    const isDurationValid = Number.parseInt(formData.durasi_menit) > 0
    const isRingkasanValid = formData.ringkasan.split(".").filter((s) => s.trim()).length >= 2
    const isRefleksiValid = formData.refleksi.split(".").filter((s) => s.trim()).length >= 1
    const isTanggalValid = new Date(formData.tanggal_baca) <= new Date()

    return isValid && isDurationValid && isRingkasanValid && isRefleksiValid && isTanggalValid
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
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-green-50 rounded-lg">
                  <Plus className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Tambah Aktivitas</span>
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
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="sm" asChild>
                <a href="/dashboard/siswa" className="flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </a>
              </Button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Tambah Aktivitas</span>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Tambah Aktivitas Membaca</h1>
              <p className="text-gray-600">Catat aktivitas membaca Anda untuk mendapatkan poin</p>
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  Form Aktivitas Membaca
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="judul_bacaan">Judul Bacaan *</Label>
                      <Input
                        id="judul_bacaan"
                        value={formData.judul_bacaan}
                        onChange={(e) => setFormData((prev) => ({ ...prev, judul_bacaan: e.target.value }))}
                        placeholder="Contoh: Laskar Pelangi"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jenis_bacaan">Jenis Bacaan *</Label>
                      <Select
                        value={formData.jenis_bacaan}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, jenis_bacaan: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis bacaan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Novel">Novel</SelectItem>
                          <SelectItem value="Cerpen">Cerpen</SelectItem>
                          <SelectItem value="Artikel">Artikel</SelectItem>
                          <SelectItem value="Komik">Komik</SelectItem>
                          <SelectItem value="PDF">PDF</SelectItem>
                          <SelectItem value="Tautan Web">Tautan Web</SelectItem>
                          <SelectItem value="Majalah">Majalah</SelectItem>
                          <SelectItem value="Koran">Koran</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="penulis_sumber">Penulis/Sumber *</Label>
                      <Input
                        id="penulis_sumber"
                        value={formData.penulis_sumber}
                        onChange={(e) => setFormData((prev) => ({ ...prev, penulis_sumber: e.target.value }))}
                        placeholder="Contoh: Andrea Hirata"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tanggal_baca">Tanggal Baca *</Label>
                      <Input
                        id="tanggal_baca"
                        type="date"
                        value={formData.tanggal_baca}
                        onChange={(e) => setFormData((prev) => ({ ...prev, tanggal_baca: e.target.value }))}
                        max={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="durasi_menit">Durasi Membaca (menit) *</Label>
                      <Input
                        id="durasi_menit"
                        type="number"
                        min="1"
                        value={formData.durasi_menit}
                        onChange={(e) => setFormData((prev) => ({ ...prev, durasi_menit: e.target.value }))}
                        placeholder="Contoh: 45"
                        required
                      />
                      <p className="text-xs text-gray-500">Poin yang didapat = durasi membaca</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bukti_url">Bukti/Link (Opsional)</Label>
                      <Input
                        id="bukti_url"
                        type="url"
                        value={formData.bukti_url}
                        onChange={(e) => setFormData((prev) => ({ ...prev, bukti_url: e.target.value }))}
                        placeholder="https://contoh.com/artikel"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ringkasan">Ringkasan Bacaan (Minimal 2 kalimat) *</Label>
                    <Textarea
                      id="ringkasan"
                      value={formData.ringkasan}
                      onChange={(e) => setFormData((prev) => ({ ...prev, ringkasan: e.target.value }))}
                      placeholder="Tuliskan ringkasan singkat tentang apa yang Anda baca. Minimal 2 kalimat yang menjelaskan isi bacaan."
                      rows={4}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Kalimat saat ini: {formData.ringkasan.split(".").filter((s) => s.trim()).length}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="refleksi">Refleksi Pribadi (Minimal 1 kalimat) *</Label>
                    <Textarea
                      id="refleksi"
                      value={formData.refleksi}
                      onChange={(e) => setFormData((prev) => ({ ...prev, refleksi: e.target.value }))}
                      placeholder="Tuliskan refleksi atau pendapat pribadi Anda tentang bacaan tersebut. Apa yang Anda pelajari atau rasakan?"
                      rows={3}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Kalimat saat ini: {formData.refleksi.split(".").filter((s) => s.trim()).length}
                    </p>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={!validateForm() || isLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isLoading ? "Menyimpan..." : "Simpan Aktivitas"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.history.back()}
                      className="bg-transparent"
                    >
                      Batal
                    </Button>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Tips Mengisi Form:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Pastikan tanggal baca tidak di masa depan</li>
                      <li>• Durasi membaca akan menjadi poin yang Anda dapatkan</li>
                      <li>• Ringkasan harus minimal 2 kalimat yang jelas</li>
                      <li>• Refleksi minimal 1 kalimat tentang pendapat pribadi Anda</li>
                      <li>• Aktivitas akan menunggu verifikasi dari guru sebelum poin diberikan</li>
                    </ul>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
