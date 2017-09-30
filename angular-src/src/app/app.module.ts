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
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';

const appRoutes: Routes = [
  {path:'cliente', component: ClienteComponent},
  {path:'inicio', component: MainPageComponent},
  {path:'ingresar', component: IngresarComponent},
  {path:'register', component: RegisterComponent},
  {path:'empleados', component: EmpleadosComponent},
  {path:'proyectos', component: ProyectosComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MainPageComponent,
    ClienteComponent,
    IngresarComponent,
    EmpleadosComponent,
    ProyectosComponent,
    NavbarComponent,
    FooterComponent
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
