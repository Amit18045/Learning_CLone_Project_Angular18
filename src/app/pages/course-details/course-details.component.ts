import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { IApiResponse, User, Video } from '../../model/master.mode';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  activeRoute = inject(ActivatedRoute);
  couseId: number = 0;
  courseSrc = inject(CourseService);
  loggedUserData: User = new User();
  videoList:Video []=[];
  currentVideoUrl:string='';
  safeURL: SafeResourceUrl | undefined;

  constructor(private sanitize: DomSanitizer){
    const userData = localStorage.getItem('learningData');
    if (userData != null) {
      const parsData = JSON.parse(userData);
      this.loggedUserData = parsData;
    }
    this.activeRoute.params.subscribe((res: any) => {
      this.couseId = res.id;
      this.getCourseVideo();
    })
  }
  sanitizeURL(url: string): SafeResourceUrl {
    return this.sanitize.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${url}`);
  }
  getCourseVideo() {
    this.courseSrc.getCourseVideosbyCourseId(this.couseId).subscribe((res: IApiResponse) => {
      if (res.result) {
        this.videoList = res.data;

      }
    })
  }
  watchVideo(videoUrl:string){
    debugger
this.safeURL=this.sanitizeURL(videoUrl);
  }
}
