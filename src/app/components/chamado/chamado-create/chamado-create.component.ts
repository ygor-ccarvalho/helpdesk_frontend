import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-chamado-create.component',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './chamado-create.component.html',
  styleUrl: './chamado-create.component.css',
})

export class ChamadoCreateComponent implements OnInit {

  form = new FormGroup({
    prioridade: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    titulo: new FormControl(null, [Validators.required]),
    descricao: new FormControl(null, [Validators.required]),
    tecnico: new FormControl(null, [Validators.required]),
    cliente: new FormControl(null, [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {

  }

  validaCampos(): boolean{
    return this.form.valid;
  }

}
