import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Chamado } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-chamado-read',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './chamado-read.component.html',
  styleUrl: './chamado-read.component.css',
})
export class ChamadoReadComponent implements OnInit {

  chamado: Chamado | null = null;

  constructor(
    private chamadoService: ChamadoService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.findById(Number(id));
    }
  }

  findById(id: number): void {
    this.chamadoService.findById(id).subscribe({
      next: resposta => {
        this.chamado = resposta;
        this.cdr.detectChanges();
      },
      error: err => console.error('Erro:', err)
    });
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

  voltar() {
    this.router.navigate(['chamados']);
  }
}
