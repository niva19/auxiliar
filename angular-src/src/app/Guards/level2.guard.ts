import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { IngresarService } from '../services/ingresar.service';
import * as Materialize from 'angular2-materialize'


@Injectable()
export class Level2Guard implements CanActivate {
    constructor(private ingresarService: IngresarService, private router: Router) {

    }

    canActivate() {
        var privilegio = this.ingresarService.get('privilegio')
        if (privilegio == "dos" || privilegio == "uno") {
            console.log('Guard nivel 2 superado')
            return true;
        } else {
            Materialize.toast('Error de seguridad', 3000, 'red rounded')
            this.router.navigate(['/inicio']);
            return false;
        }
    }
}