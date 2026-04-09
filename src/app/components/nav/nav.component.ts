import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from "@angular/router";
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";


@Component({
  selector: 'sidenav-content',
  standalone: true,
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css'],
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    HeaderComponent
],
})
export class NavComponent implements OnInit{
  showFiller = false

  constructor(private router: Router) { }
  
  ngOnInit(): void{
    this.router.navigate(['home'])
  }
}