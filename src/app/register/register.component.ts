import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../login.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister : FormGroup;
  constructor(private fb : FormBuilder, private LoginService: LoginService, private router: Router){  }
  error: string
  ngOnInit(): void {
    this.initLogin()
  }
 
  initLogin(){
    this.formRegister = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('',[Validators.required, Validators.email]),
       occupation: this.fb.control('', [Validators.required]),
       password: this.fb.control('', [Validators.required, Validators.minLength(6)]),

    })
  }

  submit(){
    if(this.formRegister.valid){
      const req =  this.LoginService.register(this.formRegister.value).subscribe(res =>{
        if(res)
        console.log('sucesso')
        this.router.navigate(['/'])
      }, err => {
        console.log(err)
        this.error = err.error.error || err.message
      })
    } else {
      console.log(this.formRegister.value)

    }
    
    }
    get loginFormControl() { return this.formRegister.controls }
}
