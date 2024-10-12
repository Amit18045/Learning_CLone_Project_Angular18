import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { EnrollMent, IApiResponse, Login, User } from '../model/master.mode';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private baseURL = environment.API_KEY;

  getAllCourse(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.baseURL}GetAllCourse`);
  }

  getCourseVideosbyCourseId(cousrId: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.baseURL}GetCourseVideosbyCourseId?courseId=${cousrId}`)
  }

  addNewUser(obj: User): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${this.baseURL}AddNewUser`, obj)
  }

  userLogin(obj: Login): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${this.baseURL}login`, obj)
  }

  userEnrollment(objEnrollment: EnrollMent): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${this.baseURL}CreateNewEnrollment`, objEnrollment);
  }
  getEnrolledCourseByUserId(userId:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.baseURL}GetEnrolledCourseByUserId?userid=${userId}`)
  }
}
