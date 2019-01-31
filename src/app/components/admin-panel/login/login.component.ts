import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from './../../../service/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    '../../../../assets/admin-panel/assets/vendor_components/bootstrap/dist/css/bootstrap.min.css',
    '../../../../assets/admin-panel/main/css/bootstrap-extend.css',
    '../../../../assets/admin-panel/main/css/master_style.css',
    '../../../../assets/admin-panel/main/css/skins/_all-skins.css'
  ]
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  isInvalid = false;

  constructor(
    private fb: FormBuilder,
    private httpService: ApiServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isInvalid = false;
    if (this.loginForm.valid) {
      this.httpService.post('api/admin/login', this.loginForm.value).subscribe(
        res => {
          if (res) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['admin/dashboard']);
          }
        },
        error => {
          this.isInvalid = true;
        }
      );
    }
  }
}
