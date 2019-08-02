import { Injectable } from '@angular/core';
import { Device } from './device.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
 

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  formData: Device;
  deviceList: Device[];
  constructor(private http: HttpClient) { }

  getDeviceList() {
    return this.http.get(environment.apiUrl + '/Devices').toPromise();
  }

  getDeviceOwner(id: Number) {
    return this.http.get(environment.apiUrl + '/Users/' + id).toPromise();
  } //at kell tenni a userbe

  insertDevice(form:NgForm) {
    var body = form.value;
    console.log(body)
    return this.http.post(environment.apiUrl + '/Devices' ,body);
  }

  deleteDevice(id: Number) {
    return this.http.delete(environment.apiUrl + '/Devices/' + id).toPromise();
  }
  
  updateDevice(id: Number, form:NgForm){
    var body=form.value;
    console.log(body);
    return this.http.put(environment.apiUrl+ '/Devices/'+ id, body).toPromise();
  }
}
