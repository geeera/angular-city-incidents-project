import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ClusterPointDirective, GeoJSONSourceComponent,
  MapComponent as NgxMapComponent,
  MarkersForClustersComponent,
  PointDirective,
} from 'ngx-mapbox-gl';
import { ICONS_MAP, IIncident } from '../../../core/services/incidents/incidents.service';
import { MatIcon } from '@angular/material/icon';
import { IncidentToGeoFeatureCollectionPipe } from '../../pipes/incident-to-geo-feature-collection-pipe';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { IncidentCardComponent } from '../../components/incident-card/incident-card.component';

@Component({
  selector: 'ci-map',
  imports: [
    NgxMapComponent,
    MatIcon,
    PointDirective,
    ClusterPointDirective,
    IncidentToGeoFeatureCollectionPipe,
    MarkersForClustersComponent,
    GeoJSONSourceComponent,
    MatIconButton,
    MatMenu,
    IncidentCardComponent,
    MatMenuTrigger,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  @Input({ required: true }) public incidents!: IIncident[];
  @Input({ required: true }) public center!: [number, number];
  @Input() public zoom: number = 15;

  @ViewChild(NgxMapComponent) mapElement!: NgxMapComponent;

  ngOnInit() {}

  protected readonly ICONS_MAP = ICONS_MAP;
}
