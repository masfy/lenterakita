interface User {
  id: number
  role: string
  nama: string
  username: string
  kelas_id?: number
}

interface Kelas {
  id: number
  nama_kelas: string
  jumlah_siswa: number
  wali_guru: string
  created_at: string
}

interface Aktivitas {
  id: number
  siswa_id: number
  siswa_nama: string
  kelas: string
  judul_bacaan: string
  jenis_bacaan: string
  penulis_sumber: string
  tanggal_baca: string
  durasi_menit: number
  ringkasan: string
  refleksi: string
  bukti_url?: string
  status: "Menunggu" | "Disetujui" | "Ditolak"
  catatan_verifikasi?: string
  created_at: string
}

class DataStore {
  private static instance: DataStore

  private constructor() {}

  static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  // Kelas Management
  getKelas(): Kelas[] {
    const stored = localStorage.getItem("lentera_kelas")
    if (stored) {
      return JSON.parse(stored)
    }

    const defaultKelas: Kelas[] = [
      {
        id: 1,
        nama_kelas: "VIII A",
        jumlah_siswa: 32,
        wali_guru: "Ibu Sari Dewi",
        created_at: "2024-01-15",
      },
      {
        id: 2,
        nama_kelas: "VIII B",
        jumlah_siswa: 30,
        wali_guru: "Bapak Ahmad Yani",
        created_at: "2024-01-15",
      },
      {
        id: 3,
        nama_kelas: "VIII C",
        jumlah_siswa: 28,
        wali_guru: "Ibu Ratna Sari",
        created_at: "2024-01-15",
      },
    ]

    this.saveKelas(defaultKelas)
    return defaultKelas
  }

  saveKelas(kelas: Kelas[]): void {
    localStorage.setItem("lentera_kelas", JSON.stringify(kelas))
  }

  addKelas(kelas: Omit<Kelas, "id">): Kelas {
    const kelasList = this.getKelas()
    const newKelas: Kelas = {
      ...kelas,
      id: Date.now(),
    }
    kelasList.push(newKelas)
    this.saveKelas(kelasList)
    return newKelas
  }

  updateKelas(id: number, updates: Partial<Kelas>): void {
    const kelasList = this.getKelas()
    const index = kelasList.findIndex((k) => k.id === id)
    if (index !== -1) {
      kelasList[index] = { ...kelasList[index], ...updates }
      this.saveKelas(kelasList)
    }
  }

  deleteKelas(id: number): void {
    const kelasList = this.getKelas().filter((k) => k.id !== id)
    this.saveKelas(kelasList)
  }

  // Aktivitas Management
  getAktivitas(): Aktivitas[] {
    const stored = localStorage.getItem("lentera_aktivitas")
    if (stored) {
      return JSON.parse(stored)
    }

    const defaultAktivitas: Aktivitas[] = [
      {
        id: 1,
        siswa_id: 1,
        siswa_nama: "Ahmad Rizki",
        kelas: "VIII A",
        judul_bacaan: "Laskar Pelangi",
        jenis_bacaan: "Novel",
        penulis_sumber: "Andrea Hirata",
        tanggal_baca: "2024-08-25",
        durasi_menit: 45,
        ringkasan:
          "Novel ini menceritakan tentang perjuangan anak-anak Belitung untuk mendapatkan pendidikan. Mereka belajar di sekolah sederhana namun memiliki semangat yang luar biasa.",
        refleksi:
          "Saya sangat terkesan dengan semangat belajar tokoh-tokoh dalam novel ini. Mereka mengajarkan bahwa pendidikan adalah hal yang sangat berharga.",
        status: "Menunggu",
        created_at: "2024-08-25T10:30:00",
      },
      {
        id: 2,
        siswa_id: 2,
        siswa_nama: "Siti Nurhaliza",
        kelas: "VIII B",
        judul_bacaan: "Bumi Manusia",
        jenis_bacaan: "Novel",
        penulis_sumber: "Pramoedya Ananta Toer",
        tanggal_baca: "2024-08-24",
        durasi_menit: 60,
        ringkasan:
          "Novel yang mengisahkan kehidupan Minke, seorang pribumi yang mendapat pendidikan Eropa dan perjuangannya melawan ketidakadilan kolonial.",
        refleksi:
          "Novel ini membuka mata saya tentang sejarah Indonesia dan pentingnya perjuangan melawan ketidakadilan.",
        status: "Menunggu",
        created_at: "2024-08-24T14:20:00",
      },
      {
        id: 3,
        siswa_id: 1,
        siswa_nama: "Ahmad Rizki",
        kelas: "VIII A",
        judul_bacaan: "Ayat-Ayat Cinta",
        jenis_bacaan: "Novel",
        penulis_sumber: "Habiburrahman El Shirazy",
        tanggal_baca: "2024-08-23",
        durasi_menit: 50,
        ringkasan: "Novel yang menceritakan perjalanan spiritual dan cinta seorang mahasiswa Indonesia di Mesir.",
        refleksi:
          "Novel ini mengajarkan tentang nilai-nilai agama dan pentingnya menjaga akhlak dalam kehidupan sehari-hari.",
        status: "Disetujui",
        created_at: "2024-08-23T09:15:00",
      },
    ]

    this.saveAktivitas(defaultAktivitas)
    return defaultAktivitas
  }

  saveAktivitas(aktivitas: Aktivitas[]): void {
    localStorage.setItem("lentera_aktivitas", JSON.stringify(aktivitas))
  }

  addAktivitas(aktivitas: Omit<Aktivitas, "id">): Aktivitas {
    const aktivitasList = this.getAktivitas()
    const newAktivitas: Aktivitas = {
      ...aktivitas,
      id: Date.now(),
    }
    aktivitasList.push(newAktivitas)
    this.saveAktivitas(aktivitasList)

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "lentera_aktivitas",
        newValue: JSON.stringify(aktivitasList),
      }),
    )

    return newAktivitas
  }

  updateAktivitas(id: number, updates: Partial<Aktivitas>): void {
    const aktivitasList = this.getAktivitas()
    const index = aktivitasList.findIndex((a) => a.id === id)
    if (index !== -1) {
      aktivitasList[index] = { ...aktivitasList[index], ...updates }
      this.saveAktivitas(aktivitasList)

      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "lentera_aktivitas",
          newValue: JSON.stringify(aktivitasList),
        }),
      )
    }
  }

  deleteAktivitas(id: number): void {
    const aktivitasList = this.getAktivitas().filter((a) => a.id !== id)
    this.saveAktivitas(aktivitasList)
  }

  getAktivitasByStatus(status: string): Aktivitas[] {
    return this.getAktivitas().filter((a) => a.status === status)
  }

  getAktivitasBySiswa(siswaId: number): Aktivitas[] {
    return this.getAktivitas().filter((a) => a.siswa_id === siswaId)
  }
}

export const dataStore = DataStore.getInstance()
export type { User, Kelas, Aktivitas }
