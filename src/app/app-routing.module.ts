import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import { GuardService } from "./guard.service";
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'cadastrar', component: RegisterComponent},
  {path: 'chat', component: ChatComponent, canActivate: [GuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
