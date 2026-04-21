import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tecnico-update.component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    NgxMaskDirective,
    RouterModule
  ],
  templateUrl: './tecnico-update.component.html',
  styleUrl: './tecnico-update.component.css',
})
export class TecnicoUpdateComponent {

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

      this.perfis = resposta.perfis.map((p: any) => {
        if (p === 'ADMIN') return 0;
        if (p === 'CLIENTE') return 1;
        if (p === 'TECNICO') return 2;
        return p;
      });

      console.log('Perfis carregados:', this.perfis);
    });
  }

  update(): void {
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

    this.service.update(this.tecnico.id, tecnico).subscribe({
      next: () => {
        this.toast.success('Técnico atualizado com sucesso!', 'Update');
        this.router.navigate(['tecnicos']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addPerfil(perfil: number, event: any) {
    if (event.checked) {
      if (!this.perfis.includes(perfil)) {
        this.perfis.push(perfil);
      }
    } else {
      this.perfis = this.perfis.filter(p => p !== perfil);
    }

    console.log('Perfis atualizados:', this.perfis);
  }
}