import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';

import{ClientesService} from './services/clientes.service';
import { MaterializeModule } from 'angular2-materialize';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { ClienteComponent } from './Components/cliente/cliente.component';
import { IngresarComponent } from './Components/ingresar/ingresar.component';
import { EmpleadosComponent } from './Components/empleados/empleados.component';
import { ProyectosComponent } from './Components/proyectos/proyectos.component';

const appRoutes: Routes = [
  {path:'Cliente', component: ClienteComponent},
  {path:'Inicio', component: MainPageComponent},
  {path:'Ingresar', component: IngresarComponent},
  {path:'Register', component: RegisterComponent},
  {path:'Empleados', component: EmpleadosComponent},
  {path:'Proyectos', component: ProyectosComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MainPageComponent,
    ClienteComponent,
    IngresarComponent,
    EmpleadosComponent,
    ProyectosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [ClientesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
