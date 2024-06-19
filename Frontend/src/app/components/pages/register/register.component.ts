import { FipeModelData } from './../../../models/fipeModelData.model';
import { Product } from './../../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { Car } from '../../../models/car.model';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../../services/db.service';
import { FipeService } from '../../../services/fipe.service';
import { finalize, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common'
import { MessageboxComponent } from '../messagebox/messagebox.component';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SearchComponent, ReactiveFormsModule, MessageboxComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  
  routerService = inject(RouterService)
  route = inject(ActivatedRoute)
  formBuilderService = inject(NonNullableFormBuilder)
  dbService = inject(DbService)
  fipeService = inject(FipeService)
  datepipe: DatePipe = new DatePipe('en-US')
  messageboxRegister = false
  messageboxDelete = false
  messageboxUpdate = false

  protected form = this.formBuilderService.group({
    plate:[''],
    renavam:[''],
    sellerName:[''],
    sellerCPF:[''],
    sellValue:[0],
    sellDate:[formatDate(Date.now(), 'yyyy-MM-dd', 'en'), [Validators.required]],
    buyerName:[''],
    buyerCPF:[''],
    buyValue:[0],
    buyDate:[formatDate(Date.now(), 'yyyy-MM-dd', 'en'), [Validators.required]]
  })
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
  product:Product = {
    id:"",
    vehiclesType:"",
    brand:{
      id:"",
      name:""  
    },
    model:{
        id:"",
        name:""
    },
    year:{
        id:"",
        name:""
    },
    buyValor:0,
    buyDate: '',
    sellValor:0,
    sellDate: '',
    plate:"",
    renavam:"",
    status:"",
    seller:{
        name:"",
        cpf:""
    },
    buyer:{
        name:"",
        cpf:""
    }
  }
  update = false
  id:string | null = null
  data:any 
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id != null){
      this.update = true
      this.dbService.getProductID(this.id).pipe(finalize(()=>{
        this.form.controls.plate.setValue(this.product.plate)
        this.form.controls.renavam.setValue(this.product.renavam)
        this.form.controls.sellerName.setValue(this.product.seller.name)
        this.form.controls.sellerCPF.setValue(this.product.seller.cpf)
        this.form.controls.buyValue.setValue(this.product.buyValor)
        this.form.controls.buyDate.setValue(this.product.buyDate.toString())
        this.form.controls.buyerName.setValue(this.product.buyer?.name)
        this.form.controls.buyerCPF.setValue(this.product.buyer?.cpf)
        this.form.controls.sellValue.setValue(this.product.sellValor)
        this.form.controls.sellDate.setValue(this.product.sellDate.toString())
      })).subscribe(product => this.product = product)
    }
  }

  getCar(car:Car){
    this.car = car
  }

  getData(data:any){
    this.data = data
  }

  register(){
    this.alterMessageboxRegister()
    this.setProduct()
    console.log(this.product)
    this.dbService.postProduct(this.product).subscribe()
  }

  save(){
    this.alterMessageboxUpdate()
    this.setProduct()
    this.dbService.updateProduct(this.product, this.id!).subscribe()
  }

  remove(){
    this.alterMessageboxDelete()
    this.dbService.removeProduct(this.id!).pipe(map(obj =>obj)).subscribe()
  }
  setProduct(){
    console.log(this.data)
    if(this.id == null){
      this.product.id = undefined
    }
    this.product.vehiclesType = this.data.vehicles
    this.product.brand.id = this.data.brand
    this.product.brand.name = this.car.Marca
    this.product.model.id = this.data.model
    this.product.model.name = this.car.Modelo
    this.product.year.id = this.data.year
    this.product.year.name = this.car.AnoModelo.toString()
    this.product.plate = this.form.controls.plate.value
    this.product.renavam = this.form.controls.renavam.value
    this.product.seller.name = this.form.controls.sellerName.value
    this.product.seller.cpf  = this.form.controls.sellerCPF.value
    this.product.buyValor = this.form.controls.buyValue.value
    this.product.buyDate = formatDate(this.form.controls.buyDate.value, 'yyyy-MM-dd', 'en')
    this.product.buyer.name = this.form.controls.buyerName.value
    this.product.buyer.cpf = this.form.controls.buyerCPF.value
    this.product.sellValor = this.form.controls.sellValue.value
    this.product.sellDate = formatDate(this.form.controls.sellDate.value, 'yyyy-MM-dd', 'en')

    if(this.product.sellValor != 0){
      this.product.status = "Vendido"
    } else{
      this.product.status = "Comprado"
    }
  }
  alterMessageboxRegister(){
    this.messageboxRegister = !this.messageboxRegister
    if(!this.messageboxRegister){
      console.log("aqui")
      this.routerService.goTo(`/buynsale`)
    }
  }
  alterMessageboxDelete(){
    this.messageboxDelete = !this.messageboxDelete
    if(!this.messageboxDelete){
      console.log("aqui")
      this.routerService.goTo(`/buynsale`)
    }
  }
  alterMessageboxUpdate(){
    this.messageboxUpdate = !this.messageboxUpdate
    if(!this.messageboxUpdate){
      console.log("aqui")
      this.routerService.goTo(`/buynsale`)
    }
  }
}
