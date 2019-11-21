import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/components/common/shared';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        SharedModule,
        PanelModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgbModule,
        NgbCarouselModule
      ]
    })
      .compileComponents();
  });

  beforeEach(async() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable Login button when no email and password are given', () => {
    const userName = fixture.nativeElement.querySelector('#username');
    userName.value = '';
    userName.dispatchEvent(new Event('input'));

    const password = fixture.nativeElement.querySelector('#password');
    password.value = '';
    password.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const loginBtn = fixture.nativeElement.querySelector('#login-btn');

    expect(loginBtn.disabled).toBeTruthy();
  });

  it('should disable Login Button when email is not given', () => {
    const userName = fixture.nativeElement.querySelector('#username');
    userName.value = '';
    userName.dispatchEvent(new Event('input'));

    const password = fixture.nativeElement.querySelector('#password');
    password.value = 'pass';
    password.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const loginBtn = fixture.nativeElement.querySelector('#login-btn');
    expect(loginBtn.disabled).toBeTruthy();
  });

  it('should disable Login button when password is not given', () => {
    const userName = fixture.nativeElement.querySelector('#username');
    userName.value = 'user';
    userName.dispatchEvent(new Event('input'));

    const password = fixture.nativeElement.querySelector('#password');
    password.value = '';
    password.dispatchEvent(new Event('input'));
    const loginBtn = fixture.nativeElement.querySelector('#login-btn');

    fixture.detectChanges();
    expect(loginBtn.disabled).toBeTruthy();
  });
  it('should display h3 properly', () => {
    const login = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Beton Tár');
  });

  it('should display h4 properly', () => {
    const login = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('Concrete Database for Civil Engineers');
  });


});
