import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../service/api-service.service';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  
  loginData:any = {
    email:'',
    password:''
  }
  isError:any=false;
  isInvalid: any = false;

  constructor( private httpService: ApiServiceService,private router: Router) { 

  }
  
  ngOnInit() {}

  dologin() {
    this.isError = false;
    this.isInvalid = false;
    if (this.isInValid(this.loginData.email) ||
      this.isInValid(this.loginData.password)) {
      this.isError = true;
      return;
    }
    let params = {
      email: this.loginData.email,
      password: this.loginData.password
    };
    this.httpService.post('api/login', params).subscribe(res => {
      if (res) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['product']);
      }
    },error=>{
      this.isError = true;
      this.isInvalid = true;
    })
  }

  isInValid(outputValue) {
    if (!outputValue || outputValue == "" || outputValue == null) {
      return true;
    };
  }
}
