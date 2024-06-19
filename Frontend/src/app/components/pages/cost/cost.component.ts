import { Cost } from './../../../models/cost.model';
import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DbService } from '../../../services/db.service';
import { finalize } from 'rxjs';
import { MessageboxComponent } from '../messagebox/messagebox.component';

@Component({
  selector: 'app-cost',
  standalone: true,
  imports: [ReactiveFormsModule, MessageboxComponent],
  templateUrl: './cost.component.html',
  styleUrl: './cost.component.scss'
})
export class CostComponent implements OnInit{
  
  private formBuilderService = inject(NonNullableFormBuilder)
  protected form = this.formBuilderService.group({
    profit:[0],
    tax:[0],
    toll:[0],
    gasoline:[0],
    maintenance:[0],
    transference:[0],
    others:[0]
  })
  dbService = inject(DbService)
  cost:Cost = {
    id:1,
    profit:0,
    tax:0,
    toll:0,
    gasoline:0,
    maintenance:0,
    transference:0,
    others:0
  }

  profitAlert = false
  taxAlert = false
  tollAlert = false
  gasolineAlert = false
  maintenanceAlert = false
  transferenceAlert = false
  othersAlert = false
  messageboxUpdate = false
  
  ngOnInit(): void {
    this.dbService.getCost().pipe(finalize(()=> this.setForm())).subscribe(el => this.cost = el)
  }
  setForm(){
    this.form.controls.profit.setValue(Number(this.cost.profit))
    this.form.controls.tax.setValue(Number(this.cost.tax))
    this.form.controls.toll.setValue(Number(this.cost.toll))
    this.form.controls.gasoline.setValue(Number(this.cost.gasoline))
    this.form.controls.maintenance.setValue(Number(this.cost.maintenance))
    this.form.controls.transference.setValue(Number(this.cost.transference))
    this.form.controls.others.setValue(Number(this.cost.others))
  }

  send(){
    if(this.form.controls.profit.value < 0 || this.form.controls.profit.value == null)
      this.profitAlert = true
    else
    this.profitAlert = false
  if(this.form.controls.tax.value < 0 || this.form.controls.tax.value  == null)
    this.taxAlert = true
  else
      this.taxAlert = false
    if(this.form.controls.toll.value < 0 || this.form.controls.toll.value == null)
      this.tollAlert = true
    else
    this.tollAlert = false
  if(this.form.controls.gasoline.value < 0 || this.form.controls.gasoline.value == null)
    this.gasolineAlert = true
  else
  this.gasolineAlert = false
if(this.form.controls.maintenance.value < 0 || this.form.controls.maintenance.value == null)
      this.maintenanceAlert = true
    else
    this.maintenanceAlert = false
  if(this.form.controls.transference.value < 0 || this.form.controls.transference.value == null)
    this.transferenceAlert = true
    else
    this.transferenceAlert = false
    if(this.form.controls.others.value < 0 || this.form.controls.others.value == null)
      this.othersAlert = true
    else
      this.othersAlert = false

    if(!this.profitAlert && !this.taxAlert && !this.tollAlert && !this.gasolineAlert && !this.maintenanceAlert && !this.transferenceAlert && !this.othersAlert)
      console.log("tudo certo")

    this.cost = {
      id:1,
      profit:this.form.controls.profit.value,
      tax:this.form.controls.tax.value,
      toll:this.form.controls.toll.value,
      gasoline:this.form.controls.gasoline.value,
      maintenance:this.form.controls.maintenance.value,
      transference:this.form.controls.transference.value,
      others:this.form.controls.others.value
    }

    this.dbService.updateCost(this.cost).subscribe()
    this.alterMessageboxUpdate()
  }

  getCar(){
    
  }
  alterMessageboxUpdate(){
    this.messageboxUpdate = !this.messageboxUpdate
  }
}
