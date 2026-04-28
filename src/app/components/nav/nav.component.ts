import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutModule, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import { ChamadoService } from '../../services/chamado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sidenav-content',
  standalone: true,
  templateUrl: 'nav.component.html',
  styleUrls: ['nav.component.css'],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    LayoutModule,
  ],
})
export class NavComponent implements OnInit {

  isMobile = false;
  totalChamados = 0;
  nomeUsuario = '';
  iniciaisUsuario = '';
  isDarkMode = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService,
    private chamadoService: ChamadoService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') this.applyTheme(true);

    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => this.isMobile = result.matches);


    this.nomeUsuario = this.authService.getNomeUsuario();
    this.iniciaisUsuario = this.gerarIniciais(this.nomeUsuario);

    this.router.navigate(['home']);
  }

  toggleTheme() {
    this.applyTheme(!this.isDarkMode);
  }

  applyTheme(dark: boolean) {
    this.isDarkMode = dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  gerarIniciais(nome: string): string {
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toast.info('Logout efetuado com sucesso!', 'Logout', { timeOut: 7000 });
  }
}