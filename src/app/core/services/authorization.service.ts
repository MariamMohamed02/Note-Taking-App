import { HttpClient } from '@angular/common/http';
import { inject,Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { authorization } from '../interfaces/authorization';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }
  private readonly httpClient=inject(HttpClient)
  private readonly router=inject(Router)

  userToken:BehaviorSubject<any> = new BehaviorSubject(null)

  setUserToken():void{
    let token =localStorage.getItem('token')
    if(token!==null){
        this.userToken.next(token);
    }
  }

  //userInfo is the body from the given request. it is of the same type of the interface created
  handleRegister(userInfo: authorization):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'signUp',userInfo);
  }

  handleLogin(userInfo:authorization):Observable<any>{
return this.httpClient.post(environment.baseUrl + 'signIn',userInfo)
  }

  logOut():void{
    localStorage.removeItem('token')
    this.router.navigate(['/signin'])
  }


}
