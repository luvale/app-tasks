import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for correct login credentials', () => {
    const username = 'test01';
    const password = 'test01';

    service.login(username, password).subscribe(result => {
      expect(result).toBe(true);
    });
  });

  it('should return false for incorrect login credentials', () => {
    const username = 'incorrect';
    const password = 'incorrect';

    service.login(username, password).subscribe(result => {
      expect(result).toBe(false);
    });
  });
});
