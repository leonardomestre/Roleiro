import { Product } from '../../../models/product.model';
import { RouterService } from '../../../services/router.service';
import { DbService } from './../../../services/db.service';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-buynsale',
  standalone: true,
  imports: [],
  templateUrl: './buynsale.component.html',
  styleUrl: './buynsale.component.scss'
})
export class BuynsaleComponent implements OnInit{

  dbService = inject(DbService)
  routerService = inject(RouterService)
  cars:Product[] = []

  ngOnInit(): void {
    this.dbService.getAllProduct().subscribe(product => this.cars = product)
  }

  register(id:string = ''){
    if(id != '')
      this.routerService.goTo(`/register/${id}`)
    else
      this.routerService.goTo(`/register`)
  }

}
