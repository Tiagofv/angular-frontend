import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  apiUrl: string = 'http://localhost:3100';
  headers_object = new HttpHeaders();
  auth : boolean
  httpOptions = {
    headers: this.headers_object
  };

  constructor(private http: HttpClient, private router: Router) {
    this.auth = this.checkAuth()
    this.setToken()
  }
  setToken(){
    this.headers_object.append('Content-Type', 'application/json');
    this.headers_object.append("Authorization", "Bearer " + localStorage.getItem('token'));
  }
  checkAuth(){
    if(localStorage.getItem('currentUser') && localStorage.getItem('token')) return true
    this.router.navigate(['/'])
    return false 
   }

  login(data) {
    const {email , password}  =  data //desestruturar
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
        .pipe(map((user: any) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.user));
            localStorage.setItem('token', user.token);
            this.auth =  this.checkAuth();
            this.setToken()
            return user;
        }));
  }
  register(data) {
    return this.http.post<any>(`${this.apiUrl}/register`, data)
        .pipe(map((user: any) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return user;
        }));
  }
  newMessage(data) {
    console.log(this.httpOptions)
    return this.http.post<any>(`${this.apiUrl}/messages`, data, this.httpOptions)
        .pipe(map((user: any) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return user;
        }));
  }
  getMessages() {
    return this.http.get<any>(`${this.apiUrl}/messages`, this.httpOptions)
        .pipe(map((messages: any) => {
            // store messages details and jwt token in local storage to keep messages logged in between page refreshes
            return messages;
        }));
  }
// Handle Errors 
error(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}

}
