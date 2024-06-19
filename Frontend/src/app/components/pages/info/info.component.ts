import { SearchComponent } from './../search/search.component';
import { Component, OnInit, inject } from '@angular/core';
import { Car } from '../../../models/car.model';
import { DbService } from '../../../services/db.service';
import { Cost } from '../../../models/cost.model';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit{
  
  private dbService = inject(DbService)
  car:Car = {
    TipoVeiculo:0,
    Valor:'',
    Marca:'',
    Modelo:'',
    AnoModelo:0,
    Combustivel:'',
    CodigoFipe:'',
    MesReferencia:'',
    SiglaCombustivel:''
  }
  cost:Cost ={
    id:0,
    profit:0,
    tax:0,
    toll:0,
    gasoline:0,
    maintenance:0,
    transference:0,
    others:0 
  }
  showCost = false
  apprCost = ''
  buyValue = ''

  ngOnInit(): void {
    this.dbService.getCost().subscribe(cost => this.cost = cost)
  }

  async getCar(car:Car){
    this.car = car
    let value = ''
    let apprCostAux = 0
    for (let i = 0; i < this.car.Valor.length; i++){
      if(this.car.Valor[i] != 'R' && this.car.Valor[i] != '$' && this.car.Valor[i] != ' ' && this.car.Valor[i] != '.'){
        if(this.car.Valor[i] == ',')
          value += '.'
        else
          value += this.car.Valor[i]
      }
    } 

    apprCostAux = (this.cost.toll + this.cost.gasoline + this.cost.maintenance + this.cost.transference + this.cost.others + (Number(value) * this.cost.tax/100))
    this.formatCoin(apprCostAux).then(coin => this.apprCost = coin)
    this.formatCoin((Number(value) - this.cost.profit - apprCostAux)).then(coin => this.buyValue = coin)
    this.showCost = true

  }

 async formatCoin(coin:number):Promise<string>{
    const coinString = await coin.toLocaleString('en-US',{
      style: 'currency',
      currency: 'USD'
    })
    let coinAux = ''
    for await(let i of coinString){
      if(i == ',')
        coinAux += '.'
      else if (i == '.')
          coinAux += ','
        else
          coinAux += i
    }
    return coinAux
    
  }
}
