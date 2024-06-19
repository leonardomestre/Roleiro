import { Component, inject } from '@angular/core';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-navigate',
  standalone: true,
  imports: [],
  templateUrl: './navigate.component.html',
  styleUrl: './navigate.component.scss'
})
export class NavigateComponent {

  _routerService = inject(RouterService)
  oldPath = ''

  goTo(path:string){
    const elementAdd = document.getElementById(path)
    if(this.oldPath != ''){
      const elementRemove = document.getElementById(this.oldPath)
      elementRemove?.classList.remove('selected')
    }
    this.oldPath = path
    elementAdd?.classList.add('selected')
    this._routerService.goTo(path)
  }
}
