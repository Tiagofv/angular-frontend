import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService } from '../login.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(private router : Router, public LoginService: LoginService) { }
  ngOnInit(): void {
  }

  logout(){
    console.log('Logging Out..')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}
