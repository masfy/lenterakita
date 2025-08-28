// Google Apps Script untuk Backend Lentera Literacy System
// Deploy sebagai Web App dengan akses untuk semua orang

// JSDoc untuk Google Apps Script globals
/* global SpreadsheetApp, ContentService, Utilities */

// Import Google Apps Script globals
const ContentService = ContentService
const Utilities = Utilities
const SpreadsheetApp = SpreadsheetApp

// Konfigurasi Spreadsheet - ganti dengan ID spreadsheet Anda
const SPREADSHEET_ID = "1zyRdxqzVK1t7JpwAA-N8Kn4EgZGXJTJV_y40tDa8hnw"

// Nama sheet untuk setiap tabel
const SHEETS = {
  USERS: "users",
  CLASSES: "classes",
  STUDENTS: "students",
  ACTIVITIES: "activities",
  SETTINGS: "settings",
}

function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID)
}

// Fungsi utama untuk menangani HTTP requests
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const action = data.action

    switch (action) {
      // Auth endpoints
      case "login":
        return login(data.email, data.password, data.role)
      case "register":
        return register(data)

      // User management
      case "getUsers":
        return getUsers(data.role)
      case "updateUser":
        return updateUser(data)

      // Class management
      case "getClasses":
        return getClasses(data.teacherId)
      case "addClass":
        return addClass(data)
      case "updateClass":
        return updateClass(data)
      case "deleteClass":
        return deleteClass(data.id)

      // Student management
      case "getStudents":
        return getStudents(data.classId)
      case "addStudent":
        return addStudent(data)
      case "updateStudent":
        return updateStudent(data)
      case "deleteStudent":
        return deleteStudent(data.id)

      // Activity management
      case "getActivities":
        return getActivities(data.studentId, data.status)
      case "addActivity":
        return addActivity(data)
      case "updateActivity":
        return updateActivity(data)
      case "verifyActivity":
        return verifyActivity(data)
      case "getActivitiesForVerification":
        return getActivitiesForVerification(data.teacherId)

      // Leaderboard
      case "getLeaderboard":
        return getLeaderboard(data.classId)

      // Database initialization
      case "initializeDatabase":
        return initializeDatabase()

      default:
        return createResponse(false, "Action tidak dikenali")
    }
  } catch (error) {
    return createResponse(false, "Error: " + error.toString())
  }
}

// Fungsi untuk GET requests
function doGet(e) {
  const action = e.parameter.action

  switch (action) {
    case "test":
      return createResponse(true, "API berjalan dengan baik")
    case "init":
      return initializeDatabase()
    default:
      return createResponse(false, "GET action tidak dikenali")
  }
}

// Helper function untuk membuat response
function createResponse(success, data, message = "") {
  const response = {
    success: success,
    data: data,
    message: message,
    timestamp: new Date().toISOString(),
  }

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON)
}

// Helper function untuk mendapatkan sheet
function getSheet(sheetName) {
  const ss = getSpreadsheet()
  let sheet = ss.getSheetByName(sheetName)
  if (!sheet) {
    sheet = ss.insertSheet(sheetName)
    initializeSheet(sheetName, sheet)
  }
  return sheet
}

// Inisialisasi struktur sheet
function initializeSheet(sheetName, sheet) {
  let headers = []

  switch (sheetName) {
    case SHEETS.USERS:
      headers = ["id", "email", "password", "name", "role", "phone", "address", "school", "createdAt", "updatedAt"]
      break
    case SHEETS.CLASSES:
      headers = ["id", "name", "description", "teacherId", "teacherName", "studentCount", "createdAt", "updatedAt"]
      break
    case SHEETS.STUDENTS:
      headers = [
        "id",
        "name",
        "email",
        "classId",
        "className",
        "nisn",
        "phone",
        "address",
        "parentName",
        "parentPhone",
        "totalPoints",
        "level",
        "createdAt",
        "updatedAt",
      ]
      break
    case SHEETS.ACTIVITIES:
      headers = [
        "id",
        "studentId",
        "studentName",
        "classId",
        "className",
        "bookTitle",
        "author",
        "pages",
        "duration",
        "summary",
        "date",
        "status",
        "points",
        "teacherNote",
        "verifiedBy",
        "verifiedAt",
        "createdAt",
        "updatedAt",
      ]
      break
    case SHEETS.SETTINGS:
      headers = ["key", "value", "description", "updatedAt"]
      break
  }

  if (headers.length > 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold")
  }
}

// AUTH FUNCTIONS
function login(email, password, role) {
  const sheet = getSheet(SHEETS.USERS)
  const data = sheet.getDataRange().getValues()

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (row[1] === email && row[2] === password && row[4] === role) {
      return createResponse(true, {
        id: row[0],
        email: row[1],
        name: row[3],
        role: row[4],
        phone: row[5],
        address: row[6],
        school: row[7],
      })
    }
  }

  return createResponse(false, null, "Email, password, atau role tidak valid")
}

function register(userData) {
  const sheet = getSheet(SHEETS.USERS)
  const id = generateId()
  const now = new Date().toISOString()

  const newRow = [
    id,
    userData.email,
    userData.password,
    userData.name,
    userData.role,
    userData.phone || "",
    userData.address || "",
    userData.school || "",
    now,
    now,
  ]

  sheet.appendRow(newRow)

  return createResponse(true, {
    id: id,
    email: userData.email,
    name: userData.name,
    role: userData.role,
  })
}

// USER MANAGEMENT
function getUsers(role) {
  const sheet = getSheet(SHEETS.USERS)
  const data = sheet.getDataRange().getValues()
  const users = []

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!role || row[4] === role) {
      users.push({
        id: row[0],
        email: row[1],
        name: row[3],
        role: row[4],
        phone: row[5],
        address: row[6],
        school: row[7],
        createdAt: row[8],
      })
    }
  }

  return createResponse(true, users)
}

function updateUser(userData) {
  const sheet = getSheet(SHEETS.USERS)
  const data = sheet.getDataRange().getValues()

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === userData.id) {
      const row = i + 1
      sheet.getRange(row, 4).setValue(userData.name)
      sheet.getRange(row, 6).setValue(userData.phone)
      sheet.getRange(row, 7).setValue(userData.address)
      sheet.getRange(row, 8).setValue(userData.school)
      sheet.getRange(row, 10).setValue(new Date().toISOString())

      return createResponse(true, userData)
    }
  }

  return createResponse(false, null, "User tidak ditemukan")
}

// CLASS MANAGEMENT
function getClasses(teacherId) {
  const sheet = getSheet(SHEETS.CLASSES)
  const data = sheet.getDataRange().getValues()
  const classes = []

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!teacherId || row[3] === teacherId) {
      classes.push({
        id: row[0],
        name: row[1],
        description: row[2],
        teacherId: row[3],
        teacherName: row[4],
        studentCount: row[5],
        createdAt: row[6],
      })
    }
  }

  return createResponse(true, classes)
}

function addClass(classData) {
  const sheet = getSheet(SHEETS.CLASSES)
  const id = generateId()
  const now = new Date().toISOString()

  const newRow = [
    id,
    classData.name,
    classData.description,
    classData.teacherId,
    classData.teacherName,
    0, // studentCount
    now,
    now,
  ]

  sheet.appendRow(newRow)

  return createResponse(true, {
    id: id,
    name: classData.name,
    description: classData.description,
    teacherId: classData.teacherId,
    teacherName: classData.teacherName,
    studentCount: 0,
  })
}

function updateClass(classData) {
  const sheet = getSheet(SHEETS.CLASSES)
  const data = sheet.getDataRange().getValues()

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === classData.id) {
      const row = i + 1
      sheet.getRange(row, 2).setValue(classData.name)
      sheet.getRange(row, 3).setValue(classData.description)
      sheet.getRange(row, 8).setValue(new Date().toISOString())

      return createResponse(true, classData)
    }
  }

  return createResponse(false, null, "Kelas tidak ditemukan")
}

function deleteClass(classId) {
  const sheet = getSheet(SHEETS.CLASSES)
  const data = sheet.getDataRange().getValues()

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === classId) {
      sheet.deleteRow(i + 1)
      return createResponse(true, null, "Kelas berhasil dihapus")
    }
  }

  return createResponse(false, null, "Kelas tidak ditemukan")
}

// STUDENT MANAGEMENT
function getStudents(classId) {
  const sheet = getSheet(SHEETS.STUDENTS)
  const data = sheet.getDataRange().getValues()
  const students = []

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!classId || row[3] === classId) {
      students.push({
        id: row[0],
        name: row[1],
        email: row[2],
        classId: row[3],
        className: row[4],
        nisn: row[5],
        phone: row[6],
        address: row[7],
        parentName: row[8],
        parentPhone: row[9],
        totalPoints: row[10],
        level: row[11],
        createdAt: row[12],
      })
    }
  }

  return createResponse(true, students)
}

function addStudent(studentData) {
  const sheet = getSheet(SHEETS.STUDENTS)
  const id = generateId()
  const now = new Date().toISOString()

  const newRow = [
    id,
    studentData.name,
    studentData.email,
    studentData.classId,
    studentData.className,
    studentData.nisn,
    studentData.phone || "",
    studentData.address || "",
    studentData.parentName || "",
    studentData.parentPhone || "",
    0, // totalPoints
    1, // level
    now,
    now,
  ]

  sheet.appendRow(newRow)

  // Update student count in class
  updateClassStudentCount(studentData.classId)

  return createResponse(true, {
    id: id,
    name: studentData.name,
    email: studentData.email,
    classId: studentData.classId,
    className: studentData.className,
    nisn: studentData.nisn,
    totalPoints: 0,
    level: 1,
  })
}

function updateStudent(studentData) {
  const sheet = getSheet(SHEETS.STUDENTS)
  const data = sheet.getDataRange().getValues()

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === studentData.id) {
      const row = i + 1
      sheet.getRange(row, 2).setValue(studentData.name)
      sheet.getRange(row, 3).setValue(studentData.email)
      sheet.getRange(row, 6).setValue(studentData.nisn)
      sheet.getRange(row, 7).setValue(studentData.phone)
      sheet.getRange(row, 8).setValue(studentData.address)
      sheet.getRange(row, 9).setValue(studentData.parentName)
      sheet.getRange(row, 10).setValue(studentData.parentPhone)
      sheet.getRange(row, 14).setValue(new Date().toISOString())

      return createResponse(true, studentData)
    }
  }

  return createResponse(false, null, "Siswa tidak ditemukan")
}

function deleteStudent(studentId) {
  const sheet = getSheet(SHEETS.STUDENTS)
  const data = sheet.getDataRange().getValues()

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === studentId) {
      const classId = data[i][3]
      sheet.deleteRow(i + 1)

      // Update student count in class
      updateClassStudentCount(classId)

      return createResponse(true, null, "Siswa berhasil dihapus")
    }
  }

  return createResponse(false, null, "Siswa tidak ditemukan")
}

// ACTIVITY MANAGEMENT
function getActivities(studentId, status) {
  const sheet = getSheet(SHEETS.ACTIVITIES)
  const data = sheet.getDataRange().getValues()
  const activities = []

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if ((!studentId || row[1] === studentId) && (!status || row[11] === status)) {
      activities.push({
        id: row[0],
        studentId: row[1],
        studentName: row[2],
        classId: row[3],
        className: row[4],
        bookTitle: row[5],
        author: row[6],
        pages: row[7],
        duration: row[8],
        summary: row[9],
        date: row[10],
        status: row[11],
        points: row[12],
        teacherNote: row[13],
        verifiedBy: row[14],
        verifiedAt: row[15],
        createdAt: row[16],
      })
    }
  }

  return createResponse(true, activities)
}

function addActivity(activityData) {
  const sheet = getSheet(SHEETS.ACTIVITIES)
  const id = generateId()
  const now = new Date().toISOString()

  // Calculate points based on duration (1 point per minute)
  const points = activityData.duration || 0

  const newRow = [
    id,
    activityData.studentId,
    activityData.studentName,
    activityData.classId,
    activityData.className,
    activityData.bookTitle,
    activityData.author,
    activityData.pages,
    activityData.duration,
    activityData.summary,
    activityData.date,
    "pending", // status
    points,
    "", // teacherNote
    "", // verifiedBy
    "", // verifiedAt
    now,
    now,
  ]

  sheet.appendRow(newRow)

  return createResponse(true, {
    id: id,
    studentId: activityData.studentId,
    bookTitle: activityData.bookTitle,
    author: activityData.author,
    pages: activityData.pages,
    duration: activityData.duration,
    summary: activityData.summary,
    date: activityData.date,
    status: "pending",
    points: points,
  })
}

function updateActivity(activityData) {
  const sheet = getSheet(SHEETS.ACTIVITIES)
  const data = sheet.getDataRange().getValues()

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === activityData.id) {
      const row = i + 1
      sheet.getRange(row, 2).setValue(activityData.studentId)
      sheet.getRange(row, 3).setValue(activityData.studentName)
      sheet.getRange(row, 5).setValue(activityData.bookTitle)
      sheet.getRange(row, 6).setValue(activityData.author)
      sheet.getRange(row, 7).setValue(activityData.pages)
      sheet.getRange(row, 8).setValue(activityData.duration)
      sheet.getRange(row, 9).setValue(activityData.summary)
      sheet.getRange(row, 10).setValue(activityData.date)
      sheet.getRange(row, 11).setValue(activityData.status)
      sheet.getRange(row, 12).setValue(activityData.points)
      sheet.getRange(row, 13).setValue(activityData.teacherNote)
      sheet.getRange(row, 18).setValue(new Date().toISOString())

      return createResponse(true, activityData)
    }
  }

  return createResponse(false, null, "Aktivitas tidak ditemukan")
}

function verifyActivity(verificationData) {
  const sheet = getSheet(SHEETS.ACTIVITIES)
  const data = sheet.getDataRange().getValues()

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === verificationData.activityId) {
      const row = i + 1
      const studentId = data[i][1]
      const points = verificationData.status === "approved" ? data[i][12] : 0

      sheet.getRange(row, 12).setValue(verificationData.status)
      sheet.getRange(row, 14).setValue(verificationData.teacherNote || "")
      sheet.getRange(row, 15).setValue(verificationData.verifiedBy)
      sheet.getRange(row, 16).setValue(new Date().toISOString())
      sheet.getRange(row, 18).setValue(new Date().toISOString())

      // Update student points if approved
      if (verificationData.status === "approved") {
        updateStudentPoints(studentId, points)
      }

      return createResponse(true, {
        activityId: verificationData.activityId,
        status: verificationData.status,
        teacherNote: verificationData.teacherNote,
        points: points,
      })
    }
  }

  return createResponse(false, null, "Aktivitas tidak ditemukan")
}

function getActivitiesForVerification(teacherId) {
  // Get all classes for this teacher
  const classSheet = getSheet(SHEETS.CLASSES)
  const classData = classSheet.getDataRange().getValues()
  const teacherClassIds = []

  for (let i = 1; i < classData.length; i++) {
    if (classData[i][3] === teacherId) {
      teacherClassIds.push(classData[i][0])
    }
  }

  // Get activities from teacher's classes
  const activitySheet = getSheet(SHEETS.ACTIVITIES)
  const activityData = activitySheet.getDataRange().getValues()
  const activities = []

  for (let i = 1; i < activityData.length; i++) {
    const row = activityData[i]
    if (teacherClassIds.includes(row[3])) {
      activities.push({
        id: row[0],
        studentId: row[1],
        studentName: row[2],
        classId: row[3],
        className: row[4],
        bookTitle: row[5],
        author: row[6],
        pages: row[7],
        duration: row[8],
        summary: row[9],
        date: row[10],
        status: row[11],
        points: row[12],
        teacherNote: row[13],
        createdAt: row[16],
      })
    }
  }

  return createResponse(true, activities)
}

// LEADERBOARD
function getLeaderboard(classId) {
  const sheet = getSheet(SHEETS.STUDENTS)
  const data = sheet.getDataRange().getValues()
  const students = []

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    if (!classId || row[3] === classId) {
      students.push({
        id: row[0],
        name: row[1],
        className: row[4],
        totalPoints: row[10],
        level: row[11],
      })
    }
  }

  // Sort by points descending
  students.sort((a, b) => b.totalPoints - a.totalPoints)

  // Add ranking
  students.forEach((student, index) => {
    student.rank = index + 1
  })

  return createResponse(true, students)
}

// HELPER FUNCTIONS
function generateId() {
  return "id_" + Utilities.getUuid().replace(/-/g, "")
}

function updateClassStudentCount(classId) {
  const studentSheet = getSheet(SHEETS.STUDENTS)
  const studentData = studentSheet.getDataRange().getValues()
  let count = 0

  for (let i = 1; i < studentData.length; i++) {
    if (studentData[i][3] === classId) {
      count++
    }
  }

  const classSheet = getSheet(SHEETS.CLASSES)
  const classData = classSheet.getDataRange().getValues()

  for (let i = 1; i < classData.length; i++) {
    if (classData[i][0] === classId) {
      classSheet.getRange(i + 1, 6).setValue(count)
      break
    }
  }
}

function updateStudentPoints(studentId, additionalPoints) {
  const sheet = getSheet(SHEETS.STUDENTS)
  const data = sheet.getDataRange().getValues()

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === studentId) {
      const row = i + 1
      const currentPoints = data[i][10] || 0
      const newPoints = currentPoints + additionalPoints
      const newLevel = Math.floor(newPoints / 100) + 1 // 100 points per level

      sheet.getRange(row, 11).setValue(newPoints)
      sheet.getRange(row, 12).setValue(newLevel)
      sheet.getRange(row, 14).setValue(new Date().toISOString())

      break
    }
  }
}

// INITIALIZATION FUNCTION
function initializeDatabase() {
  // Create all sheets with headers
  Object.values(SHEETS).forEach((sheetName) => {
    getSheet(sheetName)
  })

  // Add sample data
  addSampleData()

  return createResponse(true, "Database berhasil diinisialisasi")
}

function addSampleData() {
  // Add sample teachers
  const teacherData = {
    email: "guru@lentera.com",
    password: "guru123",
    name: "Ibu Sarah",
    role: "guru",
    phone: "081234567890",
    address: "Jl. Pendidikan No. 1",
    school: "SDN 01 Jakarta",
  }
  register(teacherData)

  // Add sample student
  const studentUserData = {
    email: "siswa@lentera.com",
    password: "siswa123",
    name: "Ahmad Rizki",
    role: "siswa",
    phone: "081234567891",
    address: "Jl. Belajar No. 2",
    school: "SDN 01 Jakarta",
  }
  register(studentUserData)
}
