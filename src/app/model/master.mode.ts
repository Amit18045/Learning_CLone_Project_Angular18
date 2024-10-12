import { FormControl } from "@angular/forms"

export interface IApiResponse {
  message: string,
  result: boolean,
  data: any
}

export interface ICourse {
  courseId: number
  courseName: string
  createdDate: string
  totalHours: string
  totalVideos: number
  courseDescription: string
  thumbnailUrl: string
}
export interface ICourseVideo {
  courseVideoId: number
  courseId: number
  videoTitle: string
  videoId: number
  videoUrl: string
  totalDuration: string
  videoDescription: string
  videoThumbnail: string
}

export class User {
  userId: number
  userName: string
  emailId: string
  fullName: string
  role: string
  createdDate: Date
  password: string
  projectName: string
  refreshToken: string
  refreshTokenExpiryTime: string
  constructor() {
    this.userId = 0,
      this.userName = '',
      this.emailId = '',
      this.fullName = '',
      this.role = '',
      this.createdDate = new Date(),
      this.password = '',
      this.projectName = '',
      this.refreshToken = '',
      this.refreshTokenExpiryTime = ''
  }
}

export class Login {
  userName: string
  password: string
  constructor() {
    this.userName = '',
      this.password = ''
  }
}

export class EnrollMent {
  enrollmentId: number
  userId: number
  courseId: number
  enrolledDate: Date
  isCompleted: boolean
  constructor() {
    this.enrollmentId = 0,
      this.userId = 0,
      this.courseId = 0,
      this.enrolledDate = new Date(),
      this.isCompleted = false
  }
}
export interface IEnrollment {
  courseId: number
  enrolledDate: string
  enrollmentId: number
  isCompleted: boolean
  userId: number
  courseName: string
  courseDescription: string
  thumbnailUrl: string
}


export class Video {
  videoId: number
  videoUrl: string
  videoTitle: string
  videoDescription: string
  videoThumbnail: string
  totalDuration: string
  constructor() {
    this.videoId = 0,
      this.videoUrl = '',
      this.videoTitle ='',
      this.videoDescription = '',
      this.videoThumbnail = '',
      this.totalDuration = ''
  }
}