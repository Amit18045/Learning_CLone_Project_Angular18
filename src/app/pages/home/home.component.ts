import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { EnrollMent, IApiResponse, ICourse, ICourseVideo, User } from '../../model/master.mode';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private courseSrc = inject(CourseService);
  courseList = signal<ICourse[]>([]);
  @ViewChild('courseModel') Model: ElementRef | undefined;
  courseVideo: ICourseVideo[] = [];
  loggedUserData: User = new User();

  ngOnInit(): void {
   
    const userData = localStorage.getItem('learningData');
    if (userData != null) {
      const parsData = JSON.parse(userData);
      this.loggedUserData = parsData;
    }
    this.loadCousre();
  }
  loadCousre() {
    debugger
    this.courseSrc.getAllCourse().subscribe((res: IApiResponse) => {
      this.courseList.set(res.data);
    })
  }
  closeCourseModel() {
    if (this.Model) {
      this.Model.nativeElement.style.display = 'none';

    }
  }
  openCourseModel(couseId: number) {
    if (this.Model) {
      this.Model.nativeElement.style.display = 'block';
      this.getCourseVideo(couseId);
    }
  }

  getCourseVideo(couseID: number) {
    this.courseSrc.getCourseVideosbyCourseId(couseID).subscribe((res: IApiResponse) => {
      this.courseVideo = res.data;
    })
  }

  onEnroll(courseId: number) {
    if (this.loggedUserData.userId == 0) {
      alert("Please login first for enroll");
    } else {
      const enrolObj: EnrollMent = {
        courseId: courseId,
        enrolledDate: new Date(),
        userId: this.loggedUserData.userId,
        enrollmentId: 0,
        isCompleted: false
      };
      this.courseSrc.userEnrollment(enrolObj).subscribe((res:IApiResponse)=>{
        if(res.result){
          alert("user Enrollment");
        }
      })
    }
  }
}
