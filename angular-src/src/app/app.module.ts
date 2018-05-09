import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { NgModule, OnInit } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

//guards
import { AuthGuard } from './Guards/auth.guard'
import { GerenteGuard } from './Guards/gerente.guard'

import { AgmCoreModule } from '@agm/core';

//services
import { ClientesService } from './services/clientes.service'
import { IngresarService } from './services/ingresar.service'
import { EmpleadosService } from './services/empleados.service'
import { ProyectosService } from './services/proyectos.service'
import { ProveedoresService } from './services/proveedores.service'
import { PlanillaService } from './services/planilla.service'
import { CarpetasService } from './services/carpetas.service'
import { ArchivosService } from './services/archivos.service'
import { DataService } from './services/data.service'
import { ReporteService } from './services/reporte.service'
import { ClienteArchivosService } from './services/cliente-archivos.service'

import { AppComponent } from './app.component'
import { NgxPaginationModule } from 'ngx-pagination'
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
import { PlanillaComponent } from './Components/planilla/planilla.component';
import { ProveedoresComponent } from './Components/proveedores/proveedores.component'
import { FilterClientePipe } from './Filters/filter-cliente.pipe'
import { FilterProyectoPipe } from './Filters/filter-proyecto.pipe';
import { FilterPapeleraPipe } from './Filters/filter-papelera.pipe';
import { GerenteBridgeComponent } from './Components/gerente-bridge/gerente-bridge.component';
import { FilterEmpleadoPipe } from './Filters/filter-empleado.pipe';
import { FilterProveedorPipe } from './Filters/filter-proveedor.pipe';
import { FilterPlanillaPipe } from './Filters/filter-planilla.pipe';
import { ReporteComponent } from './Components/reporte/reporte.component';
import { FilterReportePipe } from './Filters/filter-reporte.pipe';
import { ClienteArchivosComponent } from './Components/cliente-archivos/cliente-archivos.component';


const appRoutes: Routes = [
  { path: '', component: ClienteComponent, canActivate: [AuthGuard]},
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'inicio', component: MainPageComponent },
  { path: 'ingresar', component: IngresarComponent },
  { path: 'historial', component: HistorialComponent, canActivate: [AuthGuard, GerenteGuard] },
  { path: 'archivos', component: ArchivosComponent },
  { path: 'gerente_bridge', component: GerenteBridgeComponent },
  { path: 'empleado', component: EmpleadosComponent, canActivate: [AuthGuard, GerenteGuard] },
  { path: 'proyecto', component: ProyectosComponent, canActivate: [AuthGuard] },
  { path: 'google', component: GoogleComponent, canActivate: [AuthGuard] },
  { path: 'planilla', component: PlanillaComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: 'cliente_archivos', component: ClienteArchivosComponent}
]

@NgModule({
  declarations: [
    AppComponent,
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
    PlanillaComponent,
    ProveedoresComponent,
    FilterProyectoPipe,
    FilterClientePipe,
    FilterPapeleraPipe,
    GerenteBridgeComponent,
    FilterEmpleadoPipe,
    FilterProveedorPipe,
    FilterPlanillaPipe,
    ReporteComponent,
    FilterReportePipe,
    ClienteArchivosComponent
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
  providers: [ProveedoresService, PlanillaService, ClientesService, IngresarService, EmpleadosService, ClienteArchivosService,
    ProyectosService, ReporteService, CarpetasService, ArchivosService, DataService, AuthGuard, GerenteGuard],
  bootstrap: [AppComponent]
})

export class AppModule {
}