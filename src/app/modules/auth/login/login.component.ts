import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../service/login/login.service";
import {loginResponseInterface} from "../service/login/interface/login-response.interface";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public invalidEmailResponse:boolean = false;
  public invalidPasswordResponse:boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  )
  {
    this.loginForm = this.fb.group({
      email:[localStorage.getItem('remember'),[Validators.required,Validators.email]],
      password:['',Validators.required],
      remember:[false]
    })
  }

  ngOnInit(): void {
  }

  public login(): void
  {
    this.invalidEmailResponse = false;
    this.invalidPasswordResponse = false;

    const {email,password,remember} = this.loginForm.value;

    this.loginService.login(email,password)
      .subscribe({
        next: (response:loginResponseInterface) =>{
          localStorage.setItem('token', response.token );
          remember ? localStorage.setItem('remember', email) : localStorage.removeItem('remember');
        },
        error: (error:HttpErrorResponse) => {
          if( error.status == 404 ){
            this.invalidEmailResponse = true;
          }
          if( error.status == 401 ){
            this.invalidPasswordResponse = true;
          }
          
        }
      })




  }

}
