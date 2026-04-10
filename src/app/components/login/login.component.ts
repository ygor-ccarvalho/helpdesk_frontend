import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login.component',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private toastr: ToastrService) { }
  ngOnInit(): void { }

  validaCampos(): boolean {
    return this.form.valid;
  }

  logar() {
    this.toastr.error('Usuário ou senha inválidos!', 'Login');
    this.form.get('senha')?.setValue('');


  }
}


