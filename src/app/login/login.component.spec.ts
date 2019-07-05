import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/components/common/shared';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        CommonModule,
        SharedModule,
        PanelModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgbModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable Login button when no email and password are given', () => {
    component.user.name = '';
    component.user.password = '';
    const loginBtn = fixture.nativeElement.querySelector('#login-btn');

    fixture.detectChanges();
    expect(loginBtn.disabled).toBeTruthy();
  });

  it('should disable Login Button when email is not given', () => {
    component.user.name = '';
    component.user.password = 'someSoStrongPswd';
    const loginBtn = fixture.nativeElement.querySelector('#login-btn');

    fixture.detectChanges();
    expect(loginBtn.disabled).toBeTruthy();
  });

  it('should disable Login button when password is not given', () => {
    component.user.name = 'user@example.com';
    component.user.password = '';
    const loginBtn = fixture.nativeElement.querySelector('#login-btn');

    fixture.detectChanges();
    expect(loginBtn.disabled).toBeTruthy();
  });
});
