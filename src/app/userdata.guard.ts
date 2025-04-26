import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userdataGuard: CanActivateFn = (route, state) => {

  const router=inject(Router)
  if(typeof localStorage!=='undefined'){
  if(localStorage.getItem('token')){
    return true;

  }}

  router.navigate(['signin'])
  return false
};
