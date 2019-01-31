import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin:any = true;
  constructor(private router: Router) { }
  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token && token != null) {
        this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }

  logoutClick(){
    localStorage.clear();
    this.router.navigate(['signin']);
  }

}
