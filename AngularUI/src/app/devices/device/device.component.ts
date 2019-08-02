import { Component, OnInit, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Device } from '../../shared/device.model';
import { NgForm } from '@angular/forms';
import { DeviceService } from '../../shared/device.service';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  userList: User[];
  isValid: boolean = true;
  formData : Device;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DeviceComponent>,
    private service: DeviceService,
    private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.userService.getUserList().then(res => this.userList = res as User[]);
    this.service.getDeviceList().then(res => this.service.deviceList = res as Device[]);
    console.log(this.data)
     if (this.data.deviceIndex == null){
       this.formData = {
        DeviceID: this.data.DeviceID,
        DName: '',
        DType: '0',
        Manufacturer: '',
        OS: '0',
        OSVersion: 0,
        Processor: '',
        RAM: 0,
        UserID: 0,
        UserName: ''
       }; 
     } else {this.formData = Object.assign({},this.service.deviceList[this.data.deviceIndex]);        }
     
  }

  validateForm(formData: Device) {
    this.isValid = true;
    if (formData.DName == '') this.isValid = false;
    if (formData.DType == '') this.isValid = false;
    if (formData.Manufacturer == '') this.isValid = false;
    if (formData.OS == '') this.isValid = false;
    if (formData.OSVersion == 0) this.isValid = false;
    if (formData.RAM == 0) this.isValid = false;
    return this.isValid 
  }
   
  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if(this.data.deviceIndex == null){
        this.service.insertDevice(form).subscribe(res => {
          this.toastr.success('Device added successfully to database!', 'Project Task');
        });
        this.service.deviceList.push(form.value);
    } else {
        this.service.updateDevice(this.data.DeviceID, form).then(res=>{
          this.service.getDeviceList().then(res2 => {
            if(res2 != 0)
              this.service.deviceList = res2 as Device[];
            else this.service.deviceList = [];
            console.log(this.service.deviceList)
            this.toastr.success('Device updated succesfully!','Project Task');
          });
        });
        this.service.deviceList[this.data.deviceIndex] = form.value;
      }
      this.dialogRef.close();
    }
  }
}
