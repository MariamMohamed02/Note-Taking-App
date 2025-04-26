import { AuthorizationService } from './../../core/services/authorization.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
private readonly formBuilder=inject(FormBuilder);
private readonly authorizationService=inject(AuthorizationService)
private readonly router=inject(Router)
isLoading:boolean=false;

loginForm:FormGroup=this.formBuilder.group({
  email:['',[Validators.required,Validators.email]],
  password: ['',[Validators.required, Validators.pattern(/^\w{6,}$/)]]
})

loginSubmit(form: FormGroup):void{
  this.isLoading=true
  this.authorizationService.handleLogin(form.value).subscribe({
    next:(res)=>{
      localStorage.setItem('token','3b8ny__'+ res.token)
      this.router.navigate(['/notes'])
    },
    error:(err)=>{
      this.isLoading=false
    }
  })

}
}
