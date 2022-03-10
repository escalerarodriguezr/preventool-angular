import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControlStatus,
  FormGroup,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {CreateUserService} from "../../service/create-user/create-user.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public createUserForm:FormGroup;

  public nameHasError:boolean = false;
  public surnameHasError:boolean = false;
  public emailRequiredError:boolean = false;
  public emailEmailError:boolean = false;
  public passwordRequiredError:boolean = false;
  public confirmPasswordError:boolean = false;
  public confirmPasswordRequired:boolean = false;

  constructor(
    private fb:FormBuilder,
    private createUserService:CreateUserService
  )
  {

    const formOptions: AbstractControlOptions = { validators: this.confirmPassword('password', 'confirmPassword') };
    this.createUserForm = this.fb.group({
      name:['',Validators.required],
      surname:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      role:['ROLE_ADMIN',Validators.required],
      password:['',Validators.required],
      confirmPassword:['']
    },formOptions);

  }

  ngOnInit(): void {
    this.createUserForm.get('name')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
        this.nameHasError = status == 'INVALID' ? true : false;
      }
    });
    this.createUserForm.get('surname')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
        this.surnameHasError = status == 'INVALID' ? true : false;
      }
    });
    this.createUserForm.get('email')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
        this.emailRequiredError =  this.createUserForm.get('email')?.hasError('required') ? true : false;
        this.emailEmailError = this.createUserForm.get('email')?.hasError('email') ? true : false;

      }
    });
    this.createUserForm.get('password')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
        this.passwordRequiredError = status == 'INVALID' ? true : false;

      }
    });
    this.createUserForm.get('confirmPassword')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
        this.confirmPasswordRequired = this.createUserForm.get('confirmPassword')?.hasError('required') ? true : false;
        if(this.createUserForm.get('confirmPassword')?.value){
          this.confirmPasswordError = this.createUserForm.get('confirmPassword')?.hasError('confirmPassword') ? true : false
        }
      }
    })

  }

  get formValid():boolean
  {
    return this.createUserForm.valid;
  }

  confirmPassword(pass1: string, pass2: string ):any {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ confirmPassword: true })
      }

    }
  }

  public submit()
  {
    if(!this.createUserForm.invalid){
      this.createUserService.invoke(this.createUserForm.value).subscribe({
        next:response=>{
          Swal.fire(
            'Usuario creado',
            `${ this.createUserForm.get('email')?.value } fue creado correctamente`,
            'success'
          );
        },
        error: (error:HttpErrorResponse) => {
          if( error.status == 400 ){
            if((error.error.class).includes('BadRequestHttpException')){
              Swal.fire('Error', 'Campos inválidos: '+error.error.message, 'error' );
            }
          }else if( error.status == 409 ){
            if((error.error.class).includes('UserAlreadyExistsException')){
              Swal.fire('Error', 'Ya existe un usuario registrado con el email: ' + this.createUserForm.get('email')?.value  );
            }
          }else{
            Swal.fire('Error', 'Se ha producido un error inesperado', 'error' );
          }
        }
      });
    }
  }

}
