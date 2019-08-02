import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private fb:FormBuilder) { }

  formModel = this.fb.group({
    UserName : ['', Validators.required],
    Email : ['', Validators.email],
    FullName : [''],
    Passwords : this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword  : ['', [Validators.required]]
    }),
    UserLocation:['', ]
  })

  

  getUserList() {
    return this.http.get(environment.apiUrl + '/Users').toPromise();
  }

  userRegister(){
    var body = {
      "UserName": this.formModel.value.UserName,
      "Email": this.formModel.value.Email,
      "Password": this.formModel.value.Passwords.Password,
      "FullName": this.formModel.value.FullName,
      "UserLocation": this.formModel.value.UserLocation,
      "UserRole": 'user'
    }  
    return this.http.post(environment.apiUrl+'/Users', body)
  }


}
