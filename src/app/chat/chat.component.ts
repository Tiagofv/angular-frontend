import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../login.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  formChat : FormGroup;
  constructor(private fb : FormBuilder, private LoginService : LoginService, private router: Router){  }
  ngOnInit(): void {
    this.initLogin()
  }
  user = JSON.parse(localStorage.getItem('currentUser'))._id
  messages : any
  time = new Date().toLocaleDateString('pt-br');
  initLogin(){

    this.formChat = this.fb.group({
      message: this.fb.control('',[Validators.required]),
    })

    this.LoginService.getMessages().subscribe(res => {
      this.messages = res
      console.log(this.messages)
    }, err => {
      console.error(err)
    })
  }

  submit(){
    if(this.formChat.valid){
      this.LoginService.newMessage({...this.formChat.value}).subscribe(res => {
        this.messages.push(res)
      }, err => {
        console.error(err)
      })
    } else {
      console.log(this.formChat.value)
    }
    
    }
    get loginFormControl() { return this.formChat.controls }

}
