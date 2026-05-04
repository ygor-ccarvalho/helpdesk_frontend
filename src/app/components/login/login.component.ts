import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Credenciais } from '../../models/credenciais';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  standalone: true,
  selector: 'app-login', 
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule,
    ReactiveFormsModule, MatIconModule, MatProgressSpinnerModule,
    MatButtonModule, RouterModule, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loading = false;      
  senhaVisivel = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(3)])
  });


  constructor(
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.service.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  logar() {
    if (this.form.invalid) return;

    this.loading = true; 

    const creds: Credenciais = {
      email: this.form.value.email ?? '',
      senha: this.form.value.senha ?? ''
    };

    this.service.authenticate(creds).subscribe({
      next: resposta => {
        const authHeader = resposta.headers.get('Authorization');
        if (authHeader) {
          this.service.successfullLogin(authHeader);
          this.router.navigate(['']);
        } else {
          this.toastr.error('Token não recebido', 'Erro');
          this.loading = false;
        }
      },
      error: () => {
        this.toastr.error('Usuário ou senha inválidos!', 'Login');
        this.form.get('senha')?.setValue('');
        this.loading = false; 
      }
    });
  }
}