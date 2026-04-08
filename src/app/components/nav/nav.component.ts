import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sidenav-content',
  standalone: true,
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css'],
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
})
export class NavComponent {
  showFiller = false;
}