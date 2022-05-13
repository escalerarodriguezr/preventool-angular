import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../service/login/login.service";
import {loginResponseInterface} from "../service/login/interface/login-response.interface";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup;
  public invalidEmailResponse:boolean = false;
  public invalidPasswordResponse:boolean = false;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private loginService:LoginService
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
          this.router.navigateByUrl('/admin/dashboard')
        },
        error: (error:HttpErrorResponse) => {
          if( error.status == 404 ){
            this.invalidEmailResponse = true;
          }else if ( error.status == 401 ){
            this.invalidPasswordResponse = true;
          }else if( error.status == 409 ){
            if((error.error.class).includes('UserAccountNotActiveException')){
              Swal.fire('Info', 'El usuario que intentas modificar no tienen cuenta activa', 'info');
            }
          }else{
            Swal.fire('Error', 'Se ha producido un error inesperado', 'error' );
          }
        }
      })
  }
}
