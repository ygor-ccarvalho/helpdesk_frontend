import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChamadoService } from '../../services/chamado.service';
import { AuthService } from '../../services/auth.service';
import { Chamado } from '../../models/chamado';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatTableModule, CommonModule, RouterLink, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  chamadosRecentes: Chamado[] = [];
  totalChamados = 0;
  totalAbertos = 0;
  totalAndamento = 0;
  totalEncerrados = 0;
  colunasTabela = ['titulo', 'cliente', 'status', 'prioridade'];
  nomeUsuario = '';
  iniciaisUsuario = '';

  constructor(
    private chamadoService: ChamadoService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.chamadoService.findAll().subscribe(chamados => {
      this.totalChamados = chamados.length;
      this.totalAbertos = chamados.filter(c => c.status === 0).length;
      this.totalAndamento = chamados.filter(c => c.status === 1).length;
      this.totalEncerrados = chamados.filter(c => c.status === 2).length;
      this.chamadosRecentes = chamados.slice(0, 5);
      this.nomeUsuario = this.authService.getNomeUsuario();
      this.iniciaisUsuario = this.gerarIniciais(this.nomeUsuario);
      this.cdr.detectChanges();
    });
  }

  gerarIniciais(nome: string): string {
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
  }

  retornaStatus(status: number): string {
    if (status === 0) return 'Aberto';
    if (status === 1) return 'Em andamento';
    return 'Encerrado';
  }

  retornaPrioridade(prioridade: number): string {
    if (prioridade === 0) return 'Baixa';
    if (prioridade === 1) return 'Média';
    return 'Alta';
  }
}