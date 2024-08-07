import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-view-mode',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './view-mode.component.html',
  styleUrl: './view-mode.component.css'
})
export class ViewModeComponent {

}
