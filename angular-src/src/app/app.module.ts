import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

//guards
import { AuthGuard } from './Guards/auth.guard'
import { Level1Guard } from './Guards/level1.guard'
import { Level2Guard } from './Guards/level2.guard'
import { Level3Guard } from './Guards/level3.guard'

import { AgmCoreModule } from '@agm/core';

//services
import { ClientesService } from './services/clientes.service'
import { IngresarService } from './Services/ingresar.service'
import { EmpleadosService } from './services/empleados.service'
import { ProyectosService } from './services/proyectos.service'
import { CarpetasService } from './services/carpetas.service'
import { ArchivosService } from './services/archivos.service'

import { AppComponent } from './app.component'
import { NgxPaginationModule } from 'ngx-pagination'
import { RegisterComponent } from './Components/register/register.component'
import { MaterializeModule } from 'angular2-materialize'
import { MainPageComponent } from './Components/main-page/main-page.component'
import { ClienteComponent } from './Components/cliente/cliente.component'
import { IngresarComponent } from './Components/ingresar/ingresar.component'
import { EmpleadosComponent } from './Components/empleados/empleados.component'
import { ProyectosComponent } from './Components/proyectos/proyectos.component'
import { NavbarComponent } from './Components/navbar/navbar.component'
import { FooterComponent } from './Components/footer/footer.component'
import { GoogleComponent } from './Components/google/google.component';
import { HistorialComponent } from './Components/historial/historial.component';
import { ArchivosComponent } from './Components/archivos/archivos.component';
import { FilterClientePipe } from './Filters/filter-cliente.pipe'
import { FilterProyectoPipe } from './Filters/filter-proyecto.pipe';
import { FilterPapeleraPipe } from './Filters/filter-papelera.pipe';


const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard, Level1Guard] },
  { path: 'inicio', component: MainPageComponent },
  { path: 'ingresar', component: IngresarComponent },
  { path: 'historial', component: HistorialComponent, canActivate: [AuthGuard, Level3Guard] },
  { path: 'archivos', component: ArchivosComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'empleado', component: EmpleadosComponent, canActivate: [AuthGuard, Level3Guard] },
  { path: 'proyecto', component: ProyectosComponent, canActivate: [AuthGuard, Level2Guard] },
  { path: 'google', component: GoogleComponent, canActivate: [AuthGuard, Level1Guard] }
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
    HistorialComponent,
    ArchivosComponent,
    FilterProyectoPipe,
    FilterClientePipe,
    FilterPapeleraPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    MaterializeModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCojg33P1ZSFRgnjLFJqAtivnT1bm_krRU'
    })

  ],
  providers: [ClientesService, IngresarService, EmpleadosService, ProyectosService, CarpetasService, ArchivosService ,AuthGuard, Level1Guard, Level2Guard, Level3Guard],
  bootstrap: [AppComponent]
})

export class AppModule { }