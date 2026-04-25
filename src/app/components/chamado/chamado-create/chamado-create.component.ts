import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Cliente } from '../../../models/cliente';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';
import { ClienteService } from '../../../services/cliente.service';
import { ChamadoService } from '../../../services/chamado.service';
import { Chamado } from '../../../models/chamado';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-chamado-create.component',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink],
  templateUrl: './chamado-create.component.html',
  styleUrl: './chamado-create.component.css',
})

export class ChamadoCreateComponent implements OnInit {

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];


  form = new FormGroup({
    prioridade: new FormControl<number | null>(null, Validators.required),
    status: new FormControl<number | null>(null, Validators.required),
    titulo: new FormControl<string>('', Validators.required),
    observacoes: new FormControl<string>('', Validators.required),
    tecnico: new FormControl<number | null>(null, Validators.required),
    cliente: new FormControl<number | null>(null, Validators.required),
  });

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();

    const chamado: Chamado = {
      titulo: formValue.titulo!,
      observacoes: formValue.observacoes!,
      prioridade: formValue.prioridade!,
      status: formValue.status!,
      tecnico: formValue.tecnico!,
      cliente: formValue.cliente!,
      nomeCliente: '',
      nomeTecnico: ''
    };

    this.chamadoService.create(chamado).subscribe({
      next: () => {
        this.toast.success('Chamado cadastrado com sucesso!', 'Cadastro');
        this.router.navigate(['chamados']);
      },
      error: (error) => {
        this.toast.error('Erro ao criar chamado!', 'Erro');

        if (error.error?.errors) {
          error.error.errors.forEach((err: any) => {
            this.toast.error(err.message, 'Erro');
          });
        } else {
          this.toast.error(error.error?.message, 'Erro');
        }
      }
    });
  }


  findAllClientes(): void {
    this.clienteService.findAll().subscribe((resposta) => {
      this.clientes = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
    });
  }

  validaCampos(): boolean{
    return this.form.valid;
  }

}
