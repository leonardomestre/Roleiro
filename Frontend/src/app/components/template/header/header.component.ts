import { Component, inject } from '@angular/core';
import { NavigateComponent } from '../navigate/navigate.component';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavigateComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  _routerService = inject(RouterService)
  
  goTo(path:string){
    this._routerService.goTo(path)
  }
  
}
