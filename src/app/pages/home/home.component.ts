import { Component } from '@angular/core';
import { MapComponent } from '../../shared/modules/map/map.component';

@Component({
  selector: 'ci-home',
  imports: [
    MapComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
