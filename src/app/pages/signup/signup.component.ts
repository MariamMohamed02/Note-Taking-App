import { AuthorizationService } from './../../core/services/authorization.service';
import { authorization } from './../../core/interfaces/authorization';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private readonly authorizationService =inject(AuthorizationService);
  private readonly router =inject(Router);

  apiErr:string='';
  isLoading : boolean=false;



  registerForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)],),
    email:new FormControl('',[Validators.required,Validators.email],),
    password:new FormControl('',[Validators.required,Validators.pattern(/^\w{6,}$/)],),
    phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)],),
    age:new FormControl('',[Validators.required],),

  })

  registerSubmit(form:FormGroup){
    this.isLoading=true
    this.authorizationService.handleRegister(form.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.router.navigate(['/signin'])
      },
      error:(err)=>{
        console.log(err);
        this.apiErr=err.error.msg;
        this.isLoading=false


      }
    })

  }

}
