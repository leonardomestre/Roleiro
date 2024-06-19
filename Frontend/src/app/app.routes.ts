import { Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CostComponent } from './components/pages/cost/cost.component';
import { BuynsaleComponent } from './components/pages/buynsale/buynsale.component';
import { InfoComponent } from './components/pages/info/info.component';
import { RegisterComponent } from './components/pages/register/register.component';

export const routes: Routes = [{path:'', component:DashboardComponent},
    {path:'cost', component:CostComponent},
    {path:'search', component:InfoComponent},
    {path:'buynsale', component:BuynsaleComponent},
    {path:'register/:id', component:RegisterComponent},
    {path:'register', component:RegisterComponent}
];
