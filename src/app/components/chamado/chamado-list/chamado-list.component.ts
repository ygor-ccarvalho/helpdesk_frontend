import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Chamado } from '../../../models/chamado';

@Component({
  selector: 'app-chamado-list.component',
  imports: [MatTableModule, MatPaginatorModule, MatFormField, MatLabel, MatInputModule, MatButton, RouterLink, MatSelect, MatOption],
  templateUrl: './chamado-list.component.html',
  styleUrl: './chamado-list.component.css',
})
export class ChamadoListComponent {

  ELEMENT_DATA: Chamado[] = [
    {
      id: 1,
      dataAbertura: '2023-01-01',
      dataFechamento: '2023-01-02',
      prioridade: 'ALTA',
      status: 'ANDAMENTO',
      titulo: 'Problema no sistema',
      descricao: 'O sistema está apresentando erros.',
      tecnico: 1,
      cliente: 1,
      nomeCliente: 'João Silva',
      nomeTecnico: 'Maria Souza'
    }

  ];

  selected = 'option2'

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngOnInit() {
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
