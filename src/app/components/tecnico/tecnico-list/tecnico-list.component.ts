import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterLink,
  ]
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe({
      next: resposta => {
        this.dataSource = new MatTableDataSource<Tecnico>(resposta);
        this.dataSource.paginator = this.paginator;
      },
      error: err => console.error('Erro ao carregar técnicos:', err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  }