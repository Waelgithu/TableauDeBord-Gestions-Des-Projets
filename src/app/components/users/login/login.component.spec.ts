import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit when form is submitted', () => {
    spyOn(component, 'onSubmit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should display error messages for invalid inputs', () => {
    const usernameInput = component.loginForm.controls['username'];
    usernameInput.setValue('');
    usernameInput.markAsTouched();
    fixture.detectChanges();

    const usernameErrorMessage = fixture.debugElement.query(By.css('.text-danger'));
    expect(usernameErrorMessage).toBeTruthy();
  });

  it('should display error message if username is less than 8 characters', () => {
    const usernameInput = component.loginForm.controls['username'];
    usernameInput.setValue('short');
    usernameInput.markAsTouched();
    fixture.detectChanges();

    const usernameErrorMessage = fixture.debugElement.query(By.css('.text-danger'));
    expect(usernameErrorMessage.nativeElement.textContent).toContain('Username must be at least 8 characters long.');
  });
});
