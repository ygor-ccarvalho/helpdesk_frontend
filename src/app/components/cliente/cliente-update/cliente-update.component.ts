import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-update.component',
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
    RouterModule
  ],
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.css',
})
export class ClienteUpdateComponent {

  perfis: number[] = [];

  cliente: Cliente = {
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
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.cliente.id = Number(id);
      this.findById();
    }
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      this.cliente = resposta;

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

    const cliente: Cliente = {
      id: this.cliente.id,
      nome: formValue.nome!,
      cpf: formValue.cpf!,
      email: formValue.email!,
      senha: formValue.senha!,
      perfis: this.perfis
    };

    console.log('ENVIANDO:', cliente);

    this.service.update(this.cliente.id, cliente).subscribe({
      next: () => {
        this.toast.success('Cliente atualizado com sucesso!', 'Update');
        this.router.navigate(['clientes']);
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