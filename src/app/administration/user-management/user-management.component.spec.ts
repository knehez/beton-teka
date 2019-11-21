import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementComponent } from './user-management.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CardModule } from 'primeng/card';
import { CrudTableLibModule } from 'projects/crud-table-lib/src/public_api';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        UserManagementComponent
      ],
      imports: [
        CrudTableLibModule,
        CardModule,
        HttpClientTestingModule
      ],
      providers: [
        MessageService,
        AuthenticationService,
        ConfirmationService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
