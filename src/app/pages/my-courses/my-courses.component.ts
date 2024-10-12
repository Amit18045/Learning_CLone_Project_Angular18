import { Component, inject, OnInit } from '@angular/core';
import { IApiResponse, IEnrollment, User } from '../../model/master.mode';
import { CourseService } from '../../services/course.service';
import { SlicePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [SlicePipe, RouterLink],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  loggedUserData: User = new User();
  courseSrc = inject(CourseService);
  enrollmentObj: IEnrollment[] = [];


  constructor() {
    const userData = localStorage.getItem('learningData');
    if (userData != null) {
      const parsData = JSON.parse(userData);
      this.loggedUserData = parsData;
    }
   
  }
  ngOnInit(): void {
    this.getEnrollmentBYUserId();
  }

  getEnrollmentBYUserId() {
    this.courseSrc.getEnrolledCourseByUserId(this.loggedUserData.userId).subscribe((res: IApiResponse) => {
      if (res.result) {
        this.enrollmentObj = res.data;

      }
    })
  }

 
}
