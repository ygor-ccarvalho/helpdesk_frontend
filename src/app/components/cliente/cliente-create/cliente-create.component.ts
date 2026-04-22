import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cliente-create',
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
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css'],
})
export class ClienteCreateComponent {

  perfis: number[] = [];

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cpf: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(3)]),

  });

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router
  ) { }

  create(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const cliente: Cliente = {
      nome: formValue.nome!,
      cpf: formValue.cpf!,
      email: formValue.email!,
      senha: formValue.senha!,
      perfis: this.perfis
    };

    console.log(cliente);

    this.service.create(cliente).subscribe({
      next: () => {
        this.toast.success('Cliente cadastrado com sucesso!', 'Cadastro');
        this.router.navigate(['clientes']);
      },
      error: (error) => {
        this.toast.error('Erro ao criar cliente!', 'Erro');
        console.log(error);

        if (error.error.errors) {
          error.error.errors.forEach((err: any) => {
            this.toast.error(err.message, 'Erro');
          });
        } else {
          this.toast.error(error.error.message, 'Erro');
        }
      }
    });
  }

  addPerfil(perfil: number, event: any) {
    if (event.checked) {
      if (!this.perfis.includes(perfil)) {
        this.perfis.push(perfil);
        console.log(this.perfis);
      }
    } else {
      this.perfis = this.perfis.filter(p => p !== perfil);
      console.log(this.perfis);
    }
  }
}
