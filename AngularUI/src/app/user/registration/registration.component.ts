import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../shared/user.model';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userList:User[];
  validuser : boolean = true;
  constructor(public service: UserService,
    private toastr: ToastrService,
    private router : Router,
    ) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  checkUserName(e){
  this.service.getUserList().then(res => {
    this.userList = res as User[];
    for(var i=0; i<this.userList.length;i++){
      console.log(e.target.value)
      if (this.userList[i].UserName == e.target.value){ this.validuser=false; return;}
    }
  this.validuser = true;
  return;  
  });
    
   console.log(this.validuser)
}

  onSubmit(){
    this.service.userRegister().subscribe(
      (res: any) => {
        if(res != null){
          this.service.formModel.reset();
          this.toastr.success('Registation successfull!!', 'You can now add device!');
          this.router.navigate(['/devices']);
        } else{ console.log(res.errors); }
      },
      (err)=>{
        console.log(err);
      }
    )
  }
}
