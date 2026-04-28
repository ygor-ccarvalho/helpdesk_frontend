import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Tecnico } from "../../../models/tecnico";
import { TecnicoService } from "../../../services/tecnico.service";

@Component({
  selector: 'app-tecnico-delete',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    MatSelectModule],
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css',
})

export class TecnicoDeleteComponent implements OnInit {

  perfisNomes: string[] = [];

  tecnico: Tecnico | null = null;

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
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
    this.service.findById(id).subscribe({
      next: resposta => {
        this.tecnico = resposta;
        this.perfisNomes = resposta.perfis.map((p: any) => {
          if (p === 'ADMIN' || p === 0) return 'Admin';
          if (p === 'CLIENTE' || p === 2) return 'Cliente';
          if (p === 'TECNICO' || p === 1) return 'Técnico';
          return p;
          
        });
        this.cdr.detectChanges();
      },
      error: err => console.error('Erro:', err)
    });
  }

  delete(): void {
    if (!this.tecnico) return;
    this.service.delete(this.tecnico.id!, this.tecnico).subscribe({
      next: () => {
        this.toast.success('Técnico deletado com sucesso!', 'Delete');
        this.router.navigate(['tecnicos']);
      },
      error: (err) => {
        this.toast.error(err.error.message, 'Delete');
      }
    });
  }

}