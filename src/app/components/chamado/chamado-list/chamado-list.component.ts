import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Chamado } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
  ],
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.css',
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ChamadoService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe({
      next: resposta => {
        this.ELEMENT_DATA = resposta;
        this.dataSource = new MatTableDataSource<Chamado>(resposta);
        this.dataSource.paginator = this.paginator;
      },
      error: err => console.error('Erro ao carregar chamados:', err)
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

  orderByStatus(status: number | null): void {
    this.dataSource.data = status === null
      ? this.ELEMENT_DATA
      : this.ELEMENT_DATA.filter(e => e.status === status);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}