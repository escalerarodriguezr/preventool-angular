import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControlStatus,
  FormGroup,
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
  public lastNameHasError:boolean = false;
  public emailRequiredError:boolean = false;
  public emailEmailError:boolean = false;
  public passwordRequiredError:boolean = false;
  public passwordMinError:boolean = false;
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
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      role:['ROLE_ADMIN',Validators.required],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['']
    },formOptions);

  }

  ngOnInit(): void {
    this.createUserForm.get('name')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
        this.nameHasError = status == 'INVALID';
      }
    });
    this.createUserForm.get('lastName')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
        this.lastNameHasError = status == 'INVALID';
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
        this.passwordRequiredError = this.createUserForm.get('password')?.hasError('required') ? true : false;
        this.passwordMinError = this.createUserForm.get('password')?.hasError('minlength') ? true : false;

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
              Swal.fire('Info', 'Campos inválidos: '+error.error.message, 'info' );
            }
          }else if( error.status == 409 ){
            if((error.error.class).includes('UserAlreadyExistsException')){
              Swal.fire('Info', 'Ya existe un usuario registrado con el email: ' + this.createUserForm.get('email')?.value, 'info'  );
            }else if((error.error.class).includes('ActionUserActionNotAllowedException')){
              Swal.fire('Info', 'No tienes permisos suficientes para realizar esta acción', 'info');
            }else{
              Swal.fire('Error', 'Se ha producido un error inesperado', 'error' )
            }
          }else{
            Swal.fire('Error', 'Se ha producido un error inesperado', 'error' );
          }
        }
      });
    }
  }
}
