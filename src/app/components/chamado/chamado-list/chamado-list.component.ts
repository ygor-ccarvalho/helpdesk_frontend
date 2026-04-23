import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Chamado } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';
import { error } from 'console';

@Component({
  selector: 'app-chamado-list.component',
  imports: [MatTableModule, MatPaginatorModule, MatFormField, MatLabel, MatInputModule, MatButton, RouterLink, MatSelect, MatOption],
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.css',
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  selected = 'nenhum'

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ChamadoService
  ) { }

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
      error: err => {
        console.error('ERRO COMPLETO:', err);
        console.error('STATUS:', err.status);
        console.error('BODY:', err.error);
      }
    });
  }

  retornaStatus(status: any): string {
    switch (status) {
      case 0:
        return 'Aberto';
      case 1:
        return 'Em Andamento';
      case 2:
        return 'Encerrado';
      default:
        return 'Desconhecido';
    }
  }

  retornaPrioridade(prioridade: any): string {
    switch (prioridade) {
      case 0:
        return 'Baixa';
      case 1:
        return 'Média';
      case 2:
        return 'Alta';
      default:
        return 'Desconhecida';
    }
  }

  orderByStatus(status: number | null): void {
    if (status === null) {
      this.dataSource.data = this.ELEMENT_DATA;
    } else {
      this.dataSource.data = this.ELEMENT_DATA.filter(
        e => e.status === status
      );
    }
  }


    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

