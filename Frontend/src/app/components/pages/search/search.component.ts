import { Component, OnInit, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FipeData } from '../../../models/fipeData.model';
import { FipeService } from '../../../services/fipe.service';
import { finalize } from 'rxjs';
import { FipeModelData } from '../../../models/fipeModelData.model';
import { Car } from '../../../models/car.model';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  
  formBuilderService = inject(NonNullableFormBuilder)
  fipeService = inject(FipeService)
  protected form = this.formBuilderService.group({
    vehicles:['carros'],
    brand:[''],
    model:[''],
    year:['']
  })
  brands:FipeData[] = []
  models:FipeModelData = {
    modelos:[{
      nome:'',
      codigo:'',
    }],
    anos:[{
      nome:'',
      codigo:''
    }]
  }
  years:FipeData[] = []



  car:Car={
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
  
  sendCar = output<Car>()
  sendData = output<any>()
  product = input<Product>()
  
  data = {
    vehicles:'',
    brand:'',
    model:'',
    year:''
  }

  
  constructor(){
    effect(() =>{
      if(this.product()!.vehiclesType != ''){
        this.form.controls.vehicles.setValue(this.product()!.vehiclesType)
        this.selectVehicle(this.product()!.vehiclesType)
        this.form.controls.brand.setValue(this.product()!.brand.id)
        this.selectModel()
        this.form.controls.model.setValue(this.product()!.model.id)
        this.selectYear()
        this.form.controls.year.setValue(this.product()!.year.id)
        this.selectCar()
      }
    })
  }
  
  ngOnInit(): void {
    this.selectVehicle('carros')
  }

  selectVehicle(vehicles:string){
    this.data.vehicles = vehicles
    this.form.controls.brand.setValue('')
    this.form.controls.model.setValue('')
    this.form.controls.year.setValue('')
    this.fipeService.getBrand(vehicles).subscribe(brand => this.brands = brand)
  }

  selectModel(){
    this.form.controls.year.setValue('')
    this.form.controls.model.setValue('')
    this.fipeService.getModels(this.form.controls.vehicles.value, this.form.controls.brand.value).subscribe(model => this.models = model)
  }
  selectYear(){
    this.fipeService.getYears(this.form.controls.vehicles.value, this.form.controls.brand.value, this.form.controls.model.value).subscribe(year => this.years = year)
  }
  selectCar(){
    this.data.brand = this.form.controls.brand.value
    this.data.model = this.form.controls.model.value
    this.data.year = this.form.controls.year.value
    this.fipeService.getCar(this.form.controls.vehicles.value, this.form.controls.brand.value, this.form.controls.model.value, this.form.controls.year.value)
      .pipe(finalize(() =>{
        this.sendCar.emit(this.car)
        this.sendData.emit(this.data)
      } )).subscribe(car => this.car = car)
  }
  
}
