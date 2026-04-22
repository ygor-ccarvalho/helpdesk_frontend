import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { MatFormField, MatLabel } from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-cliente-list',
  standalone: true,
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
  imports: [MatTableModule, MatPaginatorModule, MatFormField, MatLabel, MatInputModule, MatButton, RouterLink]
})

export class ClienteListComponent implements OnInit {

  ELEMENT_DATA: Cliente[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ClienteService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe({
      next: resposta => {
        console.log('SUCESSO:', resposta);
        this.ELEMENT_DATA = resposta;
        this.dataSource = new MatTableDataSource<Cliente>(resposta);
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.error('ERRO COMPLETO:', err);
        console.error('STATUS:', err.status);
        console.error('BODY:', err.error);
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}