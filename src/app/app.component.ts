import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IApiResponse, Login, User } from './model/master.mode';
import { FormsModule } from '@angular/forms';
import { CourseService } from './services/course.service';
import * as CryptoJS from 'crypto-js';
import { Constant } from './constant';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Learning_CLone_Project_Angular18';
  isLoginFormVisiable: boolean = true;
  userRegisterObj: User = new User();
  courseSrc = inject(CourseService);
  loginObj: Login = new Login();
  loggedUserData: User = new User();

  constructor() {
    const userData = localStorage.getItem('learningData');
    if (userData != null) {
      const parsData = JSON.parse(userData);
      this.loggedUserData = parsData;
    }
  }
  loggOff() {
    this.loggedUserData = new User();
    localStorage.removeItem('learningData');
  }

  toggleForm(val: boolean) {
    this.isLoginFormVisiable = val;
  }
  openModel() {
    const model = document.getElementById('myModal');
    if (model) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    const model = document.getElementById('myModal');
    if (model) {
      model.style.display = 'none';
    }
  }

  onRegister() {
    this.courseSrc.addNewUser(this.userRegisterObj).subscribe((res: IApiResponse) => {
      if (res.result) {
        alert("User Registered");
        this.closeModel();
        this.userRegisterObj = new User();
      }
    })
  }

  onLogin() {
    this.courseSrc.userLogin(this.loginObj).subscribe((res: IApiResponse) => {
      debugger
      if (res.result) {
        alert("Login");
        const username=this.encriptData(res.data.fullName);
        const name =this.descriptionData(username);
        localStorage.setItem('learningData', JSON.stringify(res.data));
        this.loggedUserData = res.data;
        this.closeModel();
      }
    })
  }

  encriptData(data: any) {
    return CryptoJS.AES.encrypt(data, Constant.ENDE_KEY).toString();
  }
  descriptionData(data: any){
    const descriptionName= CryptoJS.AES.decrypt(data,Constant.ENDE_KEY);
    return descriptionName.toString(CryptoJS.enc.Utf8);
  }
}
