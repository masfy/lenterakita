// API Client untuk Frontend Lentera
// Ganti dengan URL Web App Anda setelah deploy

const API_BASE_URL = "https://script.google.com/macros/s/AKfycbzzrX7I-V1nA9k__0sxDG1_JYayTREOqMr4n6zluquEZo0aAeWtYOw8nv5QMbOhTtdg/exec"

class LenteraAPI {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async makeRequest(data) {
    try {
      const response = await fetch(this.baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("API Error:", error)
      return {
        success: false,
        message: "Terjadi kesalahan koneksi",
      }
    }
  }

  // Auth methods
  async login(email, password, role) {
    return await this.makeRequest({
      action: "login",
      email,
      password,
      role,
    })
  }

  async register(userData) {
    return await this.makeRequest({
      action: "register",
      ...userData,
    })
  }

  // User methods
  async getUsers(role = null) {
    return await this.makeRequest({
      action: "getUsers",
      role,
    })
  }

  async updateUser(userData) {
    return await this.makeRequest({
      action: "updateUser",
      ...userData,
    })
  }

  // Class methods
  async getClasses(teacherId = null) {
    return await this.makeRequest({
      action: "getClasses",
      teacherId,
    })
  }

  async addClass(classData) {
    return await this.makeRequest({
      action: "addClass",
      ...classData,
    })
  }

  async updateClass(classData) {
    return await this.makeRequest({
      action: "updateClass",
      ...classData,
    })
  }

  async deleteClass(id) {
    return await this.makeRequest({
      action: "deleteClass",
      id,
    })
  }

  // Student methods
  async getStudents(classId = null) {
    return await this.makeRequest({
      action: "getStudents",
      classId,
    })
  }

  async addStudent(studentData) {
    return await this.makeRequest({
      action: "addStudent",
      ...studentData,
    })
  }

  async updateStudent(studentData) {
    return await this.makeRequest({
      action: "updateStudent",
      ...studentData,
    })
  }

  async deleteStudent(id) {
    return await this.makeRequest({
      action: "deleteStudent",
      id,
    })
  }

  // Activity methods
  async getActivities(studentId = null, status = null) {
    return await this.makeRequest({
      action: "getActivities",
      studentId,
      status,
    })
  }

  async addActivity(activityData) {
    return await this.makeRequest({
      action: "addActivity",
      ...activityData,
    })
  }

  async verifyActivity(verificationData) {
    return await this.makeRequest({
      action: "verifyActivity",
      ...verificationData,
    })
  }

  async getActivitiesForVerification(teacherId) {
    return await this.makeRequest({
      action: "getActivitiesForVerification",
      teacherId,
    })
  }

  // Leaderboard methods
  async getLeaderboard(classId = null) {
    return await this.makeRequest({
      action: "getLeaderboard",
      classId,
    })
  }
}

// Export untuk digunakan di frontend
if (typeof module !== "undefined" && module.exports) {
  module.exports = LenteraAPI
} else {
  window.LenteraAPI = LenteraAPI
}

// Contoh penggunaan:
/*
const api = new LenteraAPI();

// Login
const loginResult = await api.login('guru@lentera.com', 'guru123', 'guru');
if (loginResult.success) {
  console.log('Login berhasil:', loginResult.data);
}

// Tambah aktivitas
const activityResult = await api.addActivity({
  studentId: 'student_id',
  studentName: 'Ahmad Rizki',
  classId: 'class_id',
  className: '5A',
  bookTitle: 'Laskar Pelangi',
  author: 'Andrea Hirata',
  pages: 50,
  duration: 60,
  summary: 'Cerita tentang anak-anak di Belitung...',
  date: '2024-01-15'
});
*/
