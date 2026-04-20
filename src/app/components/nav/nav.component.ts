import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from "@angular/router";
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


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
    RouterModule,
    HeaderComponent
  ],
})
export class NavComponent implements OnInit {
  showFiller = false

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.router.navigate(['tecnicos/create'])
  }

  logout() {
    this.router.navigate(['/login'])
    this.authService.logout();
    this.toast.info('Logout efetuado com sucesso!', 'Logout', { timeOut: 7000 });

  }
}