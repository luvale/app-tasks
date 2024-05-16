import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

class MockRouter {
  navigateByUrl(url: string) { return url; }
}

describe('LoginComponent', () => {
  let store: Store<any>;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: AuthService, useValue: { login: () => of(true) } },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle incorrect login credentials', () => {
    spyOn(authService, 'login').and.returnValue(of(false));
    component.username = 'incorrect';
    component.password = 'incorrect';
    component.logIn();
    
    setTimeout(() => {
      expect(component.errorMessage).toBe('');
    }, 5000);
    expect(component.errorMessage).toBe('Usuario o contraseña incorrectos');
  });
});
