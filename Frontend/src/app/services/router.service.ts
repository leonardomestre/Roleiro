import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor() { }
  router = inject(Router)

  goTo(path:string){
    this.router.navigate([path])
  }
}
