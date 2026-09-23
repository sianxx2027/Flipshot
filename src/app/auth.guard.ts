import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const currentUser = sessionStorage.getItem('flipshotCurrentUser');

  return currentUser ? true : router.createUrlTree(['/login']);
};
