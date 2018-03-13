import { Component, HostListener } from "@angular/core";

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @HostListener("window:onbeforeunload", ["$event"])
  clearLocalStorage(event) {
    localStorage.removeItem('cedula');
    localStorage.removeItem('nombre');
    localStorage.removeItem('privilegio');
  }
}
