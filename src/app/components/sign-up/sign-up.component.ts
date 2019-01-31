import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../../service/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupData: any = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  isError: any = false;
  isInvalid: any = false;
  serverMessage:any = '';

  constructor(private httpService: ApiServiceService,private router: Router) { }

  ngOnInit() { }

  dosignup() {
    this.isError = false;
    if (this.isInValid(this.signupData.fullname) ||
      this.isInValid(this.signupData.email) ||
      this.isInValid(this.signupData.password) ||
      this.isInValid(this.signupData.confirmPassword)) {
      this.isError = true;
      return;
    }

    if (this.signupData.password.length < 6 || this.signupData.confirmPassword.length < 6) {
      this.isError = true;
      return;
    }

    if (this.signupData.password != this.signupData.confirmPassword) {
      this.isError = true;
      return;
    }
    
    if(!this.validateEmail(this.signupData.email)){
      this.isError = true;
      return;
    }

    let params = {
      "fullName": this.signupData.fullname,
      "email": this.signupData.email,
      "password": this.signupData.password,
      "confirmPassword": this.signupData.confirmPassword,
    };
    this.httpService.post('api/signup', params).subscribe(res => {
      if (res) {
        this.router.navigate(['signin']);
      }
    },error=>{
      this.isError = true;
      this.isInvalid = true;
      this.serverMessage = error.msg[0];
    });
  }

  isInValid(outputValue) {
    if (!outputValue || outputValue == "" || outputValue == null) {
      return true;
    };
  }

  validateEmail(sEmail) {
    var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    if (!sEmail.match(reEmail)) {
      return false;
    }
    return true;
  }
}
