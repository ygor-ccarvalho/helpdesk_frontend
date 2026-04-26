import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Tecnico } from '../../../models/tecnico';
import { Cliente } from '../../../models/cliente';
import { Chamado } from '../../../models/chamado';
import { ChamadoService } from '../../../services/chamado.service';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chamado-update.component',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink, RouterModule],
  templateUrl: './chamado-update.component.html',
  styleUrl: './chamado-update.component.css',
})
export class ChamadoUpdateComponent implements OnInit {


  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.chamado.id = Number(id);
      this.findById();
    }
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  chamado: Chamado = {
    prioridade: 0,
    status: 0,
    titulo: '',
    observacoes: '',
    tecnico: 0,
    cliente: 0,
    nomeCliente: '',
    nomeTecnico: ''
  };


  form = new FormGroup({
    prioridade: new FormControl<number | null>(null, Validators.required),
    status: new FormControl<number | null>(null, Validators.required),
    titulo: new FormControl<string>('', Validators.required),
    observacoes: new FormControl<string>('', Validators.required),
    tecnico: new FormControl<number | null>(null, Validators.required),
    cliente: new FormControl<number | null>(null, Validators.required),
    nomeCliente: new FormControl<string>({ value: '', disabled: true }),
    nomeTecnico: new FormControl<string>({ value: '', disabled: true }),
  
  });


  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;

      this.form.patchValue({
        prioridade: resposta.prioridade,
        status: resposta.status,
        titulo: resposta.titulo,
        observacoes: resposta.observacoes,
        tecnico: resposta.tecnico,
        cliente: resposta.cliente,
        nomeCliente: resposta.nomeCliente,
        nomeTecnico: resposta.nomeTecnico
      });
    });
  }

  update(): void {
    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();

    const chamado: Chamado = {
      id: this.chamado.id,
      prioridade: formValue.prioridade!,
      status: formValue.status!,
      titulo: formValue.titulo!,
      observacoes: formValue.observacoes!,
      tecnico: formValue.tecnico!,
      cliente: formValue.cliente!,
      nomeCliente: '',
      nomeTecnico: ''
    };

    this.chamadoService.update(chamado).subscribe({
      next: () => {
        this.toast.success('Chamado atualizado com sucesso!', 'Atualização');
        this.router.navigate(['chamados']);
      },
      error: (error) => {
        this.toast.error('Erro ao atualizar chamado. Verifique os dados e tente novamente.', 'Erro');
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

  validaCampos(): boolean {
    return this.form.valid;
  }
}
