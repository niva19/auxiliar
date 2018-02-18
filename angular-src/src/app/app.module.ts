import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AgmCoreModule } from '@agm/core';

//services
import { ClientesService } from './services/clientes.service'
import { IngresarService } from './services/ingresar.service'
import { EmpleadosService } from './services/empleados.service'
import { ProyectosService } from './services/proyectos.service'

import { AppComponent } from './app.component'
import { RegisterComponent } from './Components/register/register.component'
import { MaterializeModule } from 'angular2-materialize'
import { MainPageComponent } from './Components/main-page/main-page.component'
import { ClienteComponent } from './Components/cliente/cliente.component'
import { IngresarComponent } from './Components/ingresar/ingresar.component'
import { EmpleadosComponent } from './Components/empleados/empleados.component'
import { ProyectosComponent } from './Components/proyectos/proyectos.component'
import { NavbarComponent } from './Components/navbar/navbar.component'
import { FooterComponent } from './Components/footer/footer.component'
import { PrivilegiosComponent } from './Components/privilegios/privilegios.component'

import { GoogleComponent } from './Components/google/google.component'

const appRoutes: Routes = [
  { path: 'cliente', component: ClienteComponent },
  { path: 'inicio', component: MainPageComponent },
  { path: 'ingresar', component: IngresarComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'google', component: GoogleComponent },
  { path: 'privilegios', component: PrivilegiosComponent }
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
    FooterComponent,
    GoogleComponent,
    PrivilegiosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    MaterializeModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCojg33P1ZSFRgnjLFJqAtivnT1bm_krRU'
    })

  ],
  providers: [ClientesService, IngresarService, EmpleadosService, ProyectosService],
  bootstrap: [AppComponent]
})

export class AppModule { }