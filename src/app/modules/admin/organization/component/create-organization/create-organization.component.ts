import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControlStatus, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css']
})
export class CreateOrganizationComponent implements OnInit {

  public createOrganizationForm: FormGroup;

  public nameHasError:boolean = false;
  public emailRequiredError:boolean = false;
  public emailEmailError:boolean = false;

  constructor(
    private fb:FormBuilder
  ) {

    this.createOrganizationForm = this.fb.group({
      name:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      legalDocument:[null],
      address:[null]
    })
  }

  ngOnInit(): void {

    this.createOrganizationForm.get('name')?.statusChanges.subscribe({
      next: (status:FormControlStatus)=>{
        this.nameHasError = status == 'INVALID';
      }
    });

    this.createOrganizationForm.get('email')?.statusChanges.subscribe({
      next:(status:FormControlStatus)=>{
        this.emailRequiredError =  !!this.createOrganizationForm.get('email')?.hasError('required');
        this.emailEmailError = !!this.createOrganizationForm.get('email')?.hasError('email');
      }
    });
    
  }

  get formValid():boolean
  {
    return this.createOrganizationForm.valid;
  }

  get formDirty():boolean
  {
    return this.createOrganizationForm.dirty
  }

  get emailInvalid():boolean
  {
    return this.emailRequiredError || this.emailEmailError;
  }

  get formCanSubmit():boolean
  {
    return (this.formValid && this.formDirty);
  }

  public submit():void
  {
    console.log(this.createOrganizationForm.value);
  }

}
