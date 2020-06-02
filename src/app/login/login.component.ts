import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../login.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin : FormGroup;
  constructor ( private fb : FormBuilder, private LoginService : LoginService, private router: Router){  }
  error: string;
  ngOnInit(): void {
    this.initLogin()
  }
 
  initLogin(){

    if(localStorage.getItem('currentUser')){
      this.router.navigate(['/chat'])
    } 
    this.formLogin = this.fb.group({
      email: this.fb.control('',[Validators.required, Validators.email]),
       password: this.fb.control('', [Validators.required, Validators.minLength(6)])
    })
  }

   submit(){
    if(this.formLogin.valid){
      const req =  this.LoginService.login(this.formLogin.value).subscribe(res =>{
        if(res){
          this.router.navigate(['/chat']);
        }
      }, err => {
        this.error = "Crendenciais inválidas"
      })
    } else {
      console.log(this.formLogin.value)
      this.error = "Crendenciais inválidas"
    }
    
    }
    get loginFormControl() { return this.formLogin.controls }

}
