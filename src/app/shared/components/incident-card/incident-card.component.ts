import { Component, Input } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { ICONS_MAP, IIncident } from '../../../core/services/incidents/incidents.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ci-incident-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './incident-card.component.html',
  styleUrl: './incident-card.component.scss'
})
export class IncidentCardComponent {
  @Input({ required: true }) incident!: IIncident;
  protected readonly ICONS_MAP = ICONS_MAP;
}
