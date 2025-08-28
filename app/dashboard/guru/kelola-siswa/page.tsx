"use client"

import { useEffect, useState } from "react"
import {
  BookOpen,
  Users,
  Search,
  Bell,
  LogOut,
  Settings,
  GraduationCap,
  FileText,
  Trophy,
  Target,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface User {
  id: number
  role: string
  nama: string
  username: string
}

interface Student {
  id: number
  nama: string
  username: string
  kelas_id: number
  kelas_nama: string
  total_poin: number
  level: string
  status: "aktif" | "nonaktif"
  tanggal_daftar: string
}

export default function KelolaStudentPage() {
  const [user, setUser] = useState<User | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

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

    // Load students data
    loadStudents()
  }, [])

  const loadStudents = () => {
    const mockStudents: Student[] = [
      {
        id: 1,
        nama: "Ahmad Rizki",
        username: "ahmad.rizki",
        kelas_id: 1,
        kelas_nama: "VIII A",
        total_poin: 450,
        level: "Level 4",
        status: "aktif",
        tanggal_daftar: "2024-01-15",
      },
      {
        id: 2,
        nama: "Siti Nurhaliza",
        username: "siti.nurhaliza",
        kelas_id: 2,
        kelas_nama: "VIII B",
        total_poin: 380,
        level: "Level 4",
        status: "aktif",
        tanggal_daftar: "2024-01-16",
      },
      {
        id: 3,
        nama: "Budi Santoso",
        username: "budi.santoso",
        kelas_id: 1,
        kelas_nama: "VIII A",
        total_poin: 320,
        level: "Level 3",
        status: "aktif",
        tanggal_daftar: "2024-01-17",
      },
      {
        id: 4,
        nama: "Dewi Sartika",
        username: "dewi.sartika",
        kelas_id: 3,
        kelas_nama: "VIII C",
        total_poin: 280,
        level: "Level 3",
        status: "nonaktif",
        tanggal_daftar: "2024-01-18",
      },
      {
        id: 5,
        nama: "Rudi Hermawan",
        username: "rudi.hermawan",
        kelas_id: 2,
        kelas_nama: "VIII B",
        total_poin: 250,
        level: "Level 3",
        status: "aktif",
        tanggal_daftar: "2024-01-19",
      },
    ]
    setStudents(mockStudents)
    setFilteredStudents(mockStudents)
  }

  useEffect(() => {
    let filtered = students

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.username.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedClass !== "all") {
      filtered = filtered.filter((student) => student.kelas_nama === selectedClass)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((student) => student.status === selectedStatus)
    }

    setFilteredStudents(filtered)
  }, [searchTerm, selectedClass, selectedStatus, students])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const handleAddStudent = (formData: FormData) => {
    const newStudent: Student = {
      id: students.length + 1,
      nama: formData.get("nama") as string,
      username: formData.get("username") as string,
      kelas_id: Number.parseInt(formData.get("kelas_id") as string),
      kelas_nama: formData.get("kelas_nama") as string,
      total_poin: 0,
      level: "Level 1",
      status: "aktif",
      tanggal_daftar: new Date().toISOString().split("T")[0],
    }

    const updatedStudents = [...students, newStudent]
    setStudents(updatedStudents)
    setIsAddDialogOpen(false)
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
  }

  const handleDeleteStudent = (studentId: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus siswa ini?")) {
      const updatedStudents = students.filter((s) => s.id !== studentId)
      setStudents(updatedStudents)
    }
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
                placeholder="Cari siswa..."
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
                  href="/dashboard/guru"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Dashboard</span>
                </a>
                <a
                  href="/dashboard/guru/kelas"
                  className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Kelola Kelas</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-green-50 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Kelola Siswa</span>
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
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Kelola Siswa</h1>
                <p className="text-gray-600 mt-2">Kelola data siswa dan monitor aktivitas mereka</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Siswa
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Siswa Baru</DialogTitle>
                  </DialogHeader>
                  <form action={handleAddStudent} className="space-y-4">
                    <div>
                      <Label htmlFor="nama">Nama Lengkap</Label>
                      <Input id="nama" name="nama" required />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" name="username" required />
                    </div>
                    <div>
                      <Label htmlFor="kelas_nama">Kelas</Label>
                      <Select name="kelas_nama" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VIII A">VIII A</SelectItem>
                          <SelectItem value="VIII B">VIII B</SelectItem>
                          <SelectItem value="VIII C">VIII C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <input type="hidden" name="kelas_id" value="1" />
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Tambah Siswa
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter Kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kelas</SelectItem>
                      <SelectItem value="VIII A">VIII A</SelectItem>
                      <SelectItem value="VIII B">VIII B</SelectItem>
                      <SelectItem value="VIII C">VIII C</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="aktif">Aktif</SelectItem>
                      <SelectItem value="nonaktif">Non-aktif</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="ml-auto bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Students Table */}
            <Card>
              <CardHeader>
                <CardTitle>Daftar Siswa ({filteredStudents.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Siswa</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Kelas</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Total Poin</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Level</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Tanggal Daftar</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>
                                  {student.nama
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{student.nama}</p>
                                <p className="text-sm text-gray-500">@{student.username}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{student.kelas_nama}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-green-600">{student.total_poin}</span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className="bg-blue-100 text-blue-700">{student.level}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={student.status === "aktif" ? "default" : "secondary"}
                              className={
                                student.status === "aktif" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                              }
                            >
                              {student.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {new Date(student.tanggal_daftar).toLocaleDateString("id-ID")}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditStudent(student)}>
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:bg-red-50 bg-transparent"
                                onClick={() => handleDeleteStudent(student.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
