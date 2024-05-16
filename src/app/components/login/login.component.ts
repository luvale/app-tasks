import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { loginSuccess } from '../../state/actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage:string = '';

  constructor(
    private router:Router, 
    private authService: AuthService, 
    private store: Store<AppState>
  ){}

  logIn() { 
    this.authService.login(this.username, this.password).subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.store.dispatch(loginSuccess({username: this.username}));
        this.router.navigate(['/tasks']); 
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000); 
      }
    });
  }  
}
