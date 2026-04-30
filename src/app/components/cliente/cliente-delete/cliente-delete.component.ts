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
import { Cliente } from "../../../models/cliente";
import { ClienteService } from "../../../services/cliente.service";

@Component({
  selector: 'app-cliente-delete',
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
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.css',
})

export class ClienteDeleteComponent implements OnInit {

  perfisNomes: string[] = [];

  cliente: Cliente | null = null;

  constructor(
    private service: ClienteService,
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
        this.cliente = resposta;
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
    if (!this.cliente) return;
    this.service.delete(this.cliente.id!, this.cliente).subscribe({
      next: () => {
        this.toast.success('Cliente deletado com sucesso!', 'Delete');
        this.router.navigate(['clientes']);
      },
      error: (err) => {
        this.toast.error(err.error.message, 'Delete');
      }
    });
  }

}


// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Cliente } from '../../../models/cliente';
// import { ClienteService } from '../../../services/cliente.service';

// @Component({
//   selector: 'app-cliente-delete.component',
//   imports: [CommonModule,
//     ReactiveFormsModule,
//     MatCheckboxModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatIconModule,
//     MatButtonModule,
//     MatDividerModule,
//     RouterModule],
//   templateUrl: './cliente-delete.component.html',
//   styleUrl: './cliente-delete.component.css',
// })
// export class ClienteDeleteComponent {

//   perfis: number[] = [];

//   cliente: Cliente = {
//     id: 0,
//     nome: '',
//     cpf: '',
//     email: '',
//     senha: '',
//     perfis: [],
//     dataCriacao: ''
//   };

//   form = new FormGroup({
//     nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
//     cpf: new FormControl('', Validators.required),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     senha: new FormControl('', [Validators.required, Validators.minLength(3)])
//   });

//   constructor(
//     private service: ClienteService,
//     private toast: ToastrService,
//     private router: Router,
//     private route: ActivatedRoute,
//   ) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');

//     if (id) {
//       this.cliente.id = Number(id);
//       this.findById();
//     }
//   }

//   findById(): void {
//     this.service.findById(this.cliente.id).subscribe(resposta => {
//       this.cliente = resposta;

//       this.form.patchValue({
//         nome: resposta.nome,
//         cpf: resposta.cpf,
//         email: resposta.email,
//         senha: resposta.senha
//       });

//       this.form.get('nome')?.disable();
//       this.form.get('cpf')?.disable();
//       this.form.get('email')?.disable();
//       this.form.get('senha')?.disable();


//       this.perfis = resposta.perfis.map((p: any) => {
//         if (p === 'ADMIN') return 0;
//         if (p === 'CLIENTE') return 1;
//         if (p === 'TECNICO') return 2;
//         return p;
//       });

//       console.log('Perfis carregados:', this.perfis);
//     });
//   }

//   delete(): void {
//     if (this.form.invalid) return;

//     const formValue = this.form.value;

//     const cliente: Cliente = {
//       id: this.cliente.id,
//       nome: formValue.nome!,
//       cpf: formValue.cpf!,
//       email: formValue.email!,
//       senha: formValue.senha!,
//       perfis: this.perfis
//     };

//     console.log('ENVIANDO:', cliente);

//     this.service.delete(this.cliente.id, cliente).subscribe({
//       next: () => {
//         this.toast.success('Cliente deletado com sucesso!', 'Delete');
//         this.router.navigate(['clientes']);
//       },
//       error: (error) => {
//         this.toast.error(error.error.message, 'Delete');
//       }
//     });
//   }
// }