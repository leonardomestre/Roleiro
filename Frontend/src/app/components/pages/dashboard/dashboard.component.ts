import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DbService } from '../../../services/db.service';
import { Product } from '../../../models/product.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    CanvasJSAngularChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  
  
  date = new Date
  products:Product[] = []
  dbService = inject(DbService)
  chartSellerInstace:any
  chartBrandInstace:any
  chartBnDInstace:any
  chartOptionsSeller = {
    animationEnabled: true,
    title: {
      text: "Quantidade de vendas (" + this.date.getFullYear() + ")"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "Jan",  y: 0  },
        { label: "Fev", y: 0  },
        { label: "Mar", y: 0  },
        { label: "Abr",  y: 0  },
        { label: "Mai",  y: 0  },
        { label: "Jun",  y: 0  },
        { label: "Jul",  y: 0  },
        { label: "Ago",  y: 0  },
        { label: "Set",  y: 0  },
        { label: "Out",  y: 0  },
        { label: "Nov",  y: 0  },
        { label: "Dez",  y: 0  }
      ]
    }]                
  };
  cartOptionbrand = {
    title: {
      text: "Marcas mais vendidas (" + this.date.getFullYear() + ")"
    },
    data: [{
      animationEnabled: true,
      startAngle: -90,
      type: "pie",
      indexLabel: "{name}: {y}",
      dataPoints: [{ y: 14.1, name: "Toys" },  
      ]
    }]                
  };

  cartOptionBnS = {
    theme: "light2",
    title: {
      text: "Compra e Venda (" + this.date.getFullYear() + ")"
    },
    axisX: {
			valueFormatString: "MMM",
			intervalType: "month",
			interval: 1
		},
    axisY: {
			title: "Valor",
		  suffix: "R$"
    },
    toolTip: {
			shared: true
		},
    legend: {
			cursor: "pointer",
			itemclick: function(e: any){
				if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				} else{
					e.dataSeries.visible = true;
				}
				e.chart.render();
			}
		},
    data: [{
      type: "line",
      name: "Compra",
      showInLegend: true,
      yValueFormatString: "#,###R$",
      dataPoints: [{ x: new Date(this.date.getFullYear(), 0, 1), y: 27 },  
      ]
    },{
      type: "line",
      name: "Venda",
      showInLegend: true,
      yValueFormatString: "#,###R$",
      dataPoints: [{ x: new Date(this.date.getFullYear(), 0, 1), y: 27 },  
      ]
    }]                
  };
  getChartInstanceSeller(chart: object) {
    this.chartSellerInstace = chart;
  }
  getChartInstanceBrand(chart: object) {
    this.chartBrandInstace = chart;
  }
  getChartInstanceBnS(chart: object) {
    this.chartBnDInstace = chart;
  }

  ngOnInit(): void {

    this.dbService.getAllProduct().pipe(finalize(()=>this.setData())).subscribe(product => this.products = product)
  }

  setData(){
    let jan= 0
    let fev= 0
    let mar= 0
    let abr= 0
    let mai= 0
    let jun= 0
    let jul= 0
    let ago= 0
    let set= 0
    let out= 0
    let nov= 0
    let dez= 0
    let brand:{
      name:string,
      y:number
    }[] = []
    let bnsS = []
    let bnsB = []
    for(let i = 0; i< 12; i++){
      bnsS.push({ x: new Date(this.date.getFullYear(), i, 1), y: 0 })
      bnsB.push({ x: new Date(this.date.getFullYear(), i, 1), y: 0 })
    }


    let brandAux = false
    for(let i = 0; i < this.products.length; i++){
      if (this.products[i].sellDate.substring(0,4) == this.date.getFullYear().toString()){
        switch(this.products[i].sellDate.substring(5,7)){
          case "01":
            bnsS[0].y += this.products[i].sellValor
            jan++
            break
          case "02":
            bnsS[1].y += this.products[i].sellValor
            fev++
            break
          case "03":
            bnsS[2].y += this.products[i].sellValor
            mar++
            break
          case "04":
            bnsS[3].y += this.products[i].sellValor
            abr++
            break
          case "05":
            bnsS[4].y += this.products[i].sellValor
            mar++
            break
          case "06":
            bnsS[5].y += this.products[i].sellValor
            jun++
            break
          case "07":
            bnsS[6].y += this.products[i].sellValor
            jul++
            break
          case "08":
            bnsS[7].y += this.products[i].sellValor
            ago++
            break
          case "09":
            bnsS[8].y += this.products[i].sellValor
            set++
            break
          case "10":
            bnsS[9].y += this.products[i].sellValor
            out++
            break
          case "11":
            bnsS[10].y += this.products[i].sellValor
            nov++
          break
          case "12":
            bnsS[11].y += this.products[i].sellValor
            dez++
            break
        }
        switch(this.products[i].buyDate.substring(5,7)){
          case "01":
            bnsB[0].y += this.products[i].buyValor
            break
          case "02":
            bnsB[1].y += this.products[i].buyValor
            break
          case "03":
            bnsB[2].y += this.products[i].buyValor
            break
          case "04":
            bnsB[3].y += this.products[i].buyValor
            break
          case "05":
            bnsB[4].y += this.products[i].buyValor
            break
          case "06":
            bnsB[5].y += this.products[i].buyValor
            break
          case "07":
            bnsB[6].y += this.products[i].buyValor
            break
          case "08":
            bnsB[7].y += this.products[i].buyValor
            break
          case "09":
            bnsB[8].y += this.products[i].buyValor
            break
          case "10":
            bnsB[9].y += this.products[i].buyValor
            break
          case "11":
            bnsB[10].y += this.products[i].buyValor
          break
          case "12":
            bnsB[11].y += this.products[i].buyValor
            break
        }
        brand.map(car =>{
          if(car.name == this.products[i].brand.name){
            car.y ++
            brandAux = true
          }
        })
        if(!brandAux){
          brand.push({
            name:this.products[i].brand.name,
            y:1
          })
        }
        
      }
    }
    this.chartOptionsSeller.data[0].dataPoints = [
      { label: "Jan", y: jan  },
      { label: "Fev", y: fev  },
      { label: "Mar", y: mar  },
      { label: "Abr", y: abr  },
      { label: "Mai", y: mai  },
      { label: "Jun", y: jun  },
      { label: "Jul", y: jul  },
      { label: "Ago", y: ago  },
      { label: "Set", y: set  },
      { label: "Out", y: out  },
      { label: "Nov", y: nov  },
      { label: "Dez", y: dez  }
    ]

    this.cartOptionbrand.data[0].dataPoints = brand
    this.cartOptionBnS.data[0].dataPoints = bnsS
    this.cartOptionBnS.data[1].dataPoints = bnsB

    this.chartSellerInstace.render()
    this.chartBnDInstace.render()
    this.chartBrandInstace.render()
    
  }

 
  
}
