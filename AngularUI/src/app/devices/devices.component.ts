import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeviceService } from '../shared/device.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeviceComponent } from './device/device.component';
import { Device } from '../shared/device.model';
import { User } from '../shared/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
   
  user: any;
  constructor(private service: DeviceService,
    private dialog: MatDialog,
    private toastr: ToastrService, ) { }

  ngOnInit() { 
    
    var selfRef = this;
 
    this.service.getDeviceList().then(res => {
      if(res != 0){
      this.service.deviceList = res as Device[];
       console.log(res, this.service.deviceList)
      for (var i = 0; i < this.service.deviceList.length; i++)          
        this.service.getDeviceOwner(this.service.deviceList[i].UserID).then(result =>
          this.user  = result['UserName']);
          this.service.formData = {
            DeviceID: this.service.deviceList[this.service.deviceList.length-1].DeviceID,
            DName: '',
            DType: '',
            Manufacturer: '',
            OS: '',
            OSVersion: 1,
            Processor: '',
            RAM: 0,
            UserID: 1,
            UserName: this.user
          };
    
      } else {
        this.service.deviceList = [];
        this.service.formData = {
          DeviceID: 1,
          DName: '',
          DType: '',
          Manufacturer: '',
          OS: '',
          OSVersion: 0,
          Processor: '',
          RAM: 0,
          UserID: 1,
          UserName: this.user
        };
      }
    });  
      
      
  }
 

  AddEditDevice(deviceIndex, DeviceID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { deviceIndex, DeviceID };
    this.dialog.open(DeviceComponent, dialogConfig)
    this.service.getDeviceList().then(res => {
      if(res != null){
        this.service.deviceList = res as Device[];
        console.log(this.service.deviceList);}
      else this.service.deviceList = [];
  });
}

  DeleteDevice(DeviceID) {
    if (confirm("Are you sure you want to delete this device?")) {
      this.service.deleteDevice(DeviceID).then(res => {
        this.service.getDeviceList().then(res => {
          if(res != null)
            this.service.deviceList = res as Device[];
          else this.service.deviceList = [];
        this.toastr.warning("Device deleted succesfully from database.");
      });
      
    });
    }

  }
}
