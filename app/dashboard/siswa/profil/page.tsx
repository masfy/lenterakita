"use client"

import { useEffect, useState } from "react"
import {
  BookOpen,
  TrendingUp,
  Plus,
  Trophy,
  FileText,
  Search,
  Bell,
  LogOut,
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Award,
  Target,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface UserProfile {
  id: number
  role: string
  nama: string
  username: string
  kelas_id: number
  email?: string
  phone?: string
  address?: string
  bio?: string
  joined_date?: string
}

export default function SiswaProfilPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "siswa") {
        window.location.href = "/"
        return
      }

      // Add mock profile data
      const fullUserData = {
        ...parsedUser,
        email: "siswa@lentera.edu",
        phone: "+62 812-9876-5432",
        address: "Jl. Siswa No. 456, Jakarta",
        bio: "Siswa kelas VIII A yang gemar membaca dan menulis. Suka dengan buku-buku fiksi dan non-fiksi.",
        joined_date: "2024-01-15",
      }

      setUser(fullUserData)
      setFormData({
        nama: fullUserData.nama,
        email: fullUserData.email || "",
        phone: fullUserData.phone || "",
        address: fullUserData.address || "",
        bio: fullUserData.bio || "",
      })
    } else {
      window.location.href = "/"
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        nama: formData.nama,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        bio: formData.bio,
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        nama: user.nama,
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        bio: user.bio || "",
      })
    }
    setIsEditing(false)
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
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-green-50 rounded-lg">
                  <Settings className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Profil</span>
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
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
                <p className="text-gray-600 mt-2">Kelola informasi profil dan lihat progress literasi Anda</p>
              </div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profil
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Batal
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Picture & Basic Info */}
              <Card className="lg:col-span-1">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/diverse-students-studying.png" />
                    <AvatarFallback className="text-2xl">
                      {user.nama
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{user.nama}</h3>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">Kelas VIII A</Badge>

                  {/* Level Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-blue-100 text-blue-700">{currentLevel.nama}</Badge>
                      <span className="text-sm font-bold text-green-600">{totalPoin} poin</span>
                    </div>
                    <Progress value={progressToNext} className="h-2 mb-2" />
                    <p className="text-xs text-gray-500">{Math.round(progressToNext)}% menuju Level 4</p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Bergabung{" "}
                        {new Date(user.joined_date || "").toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Details */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Informasi Profil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nama">Nama Lengkap</Label>
                      {isEditing ? (
                        <Input
                          id="nama"
                          value={formData.nama}
                          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{user.nama}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="username">Username</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-600">@{user.username}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{user.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Alamat</Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{user.address}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1 text-gray-600">{user.bio}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{totalPoin}</h3>
                  <p className="text-gray-600">Total Poin</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{currentLevel.nama}</h3>
                  <p className="text-gray-600">Level Saat Ini</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">19</h3>
                  <p className="text-gray-600">Total Aktivitas</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">#2</h3>
                  <p className="text-gray-600">Ranking Kelas</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
