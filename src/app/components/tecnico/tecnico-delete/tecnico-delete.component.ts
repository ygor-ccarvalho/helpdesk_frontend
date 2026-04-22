import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete.component',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule],
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css',
})
export class TecnicoDeleteComponent {

  perfis: number[] = [];

  tecnico: Tecnico = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  };

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cpf: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.tecnico.id = Number(id);
      this.findById();
    }
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      this.tecnico = resposta;

      this.form.patchValue({
        nome: resposta.nome,
        cpf: resposta.cpf,
        email: resposta.email,
        senha: resposta.senha
      });

      this.form.get('nome')?.disable();
      this.form.get('cpf')?.disable();
      this.form.get('email')?.disable();
      this.form.get('senha')?.disable();


      this.perfis = resposta.perfis.map((p: any) => {
        if (p === 'ADMIN') return 0;
        if (p === 'CLIENTE') return 1;
        if (p === 'TECNICO') return 2;
        return p;
      });

      console.log('Perfis carregados:', this.perfis);
    });
  }

  delete(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const tecnico: Tecnico = {
      id: this.tecnico.id,
      nome: formValue.nome!,
      cpf: formValue.cpf!,
      email: formValue.email!,
      senha: formValue.senha!,
      perfis: this.perfis
    };

    console.log('ENVIANDO:', tecnico);

    this.service.delete(this.tecnico.id, tecnico).subscribe({
      next: () => {
        this.toast.success('Técnico deletado com sucesso!', 'Delete');
        this.router.navigate(['tecnicos']);
      },
      error: (error) => {
        this.toast.error(error.error.message, 'Delete');
      }
    });
  }
}