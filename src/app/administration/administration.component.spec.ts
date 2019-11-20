import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationComponent } from './administration.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthenticationService } from '../_services/authentication.service';
import { InputService, CrudTableLibModule } from 'projects/crud-table-lib/src/public_api';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { StepsModule } from 'primeng/steps';
import { PickListModule } from 'primeng/picklist';
import { SliderModule } from 'primeng/slider';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DropdownModule } from 'primeng/dropdown';
import { By } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const DEFAULT_ACCESS_TOKEN = 'someNiceToken';
const DEFAULT_ROLES = ['admin'];

class AuthenticationServiceMock {

  store = {
    accessToken: DEFAULT_ACCESS_TOKEN,
    roles: DEFAULT_ROLES
  };

  login(username, password) {
    this.store = {
      accessToken: DEFAULT_ACCESS_TOKEN,
      roles: DEFAULT_ROLES
    };
  }

  logout() {
    this.store = {
      accessToken: null,
      roles: null
    };
  }

  getToken() {
    return this.store.accessToken;
  }

  getRoles() {
    return this.store.roles;
  }
}

describe('AdministrationComponent', () => {
  let component: AdministrationComponent;
  let fixture: ComponentFixture<AdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdministrationComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: AdministrationComponent },
          { path: 'users', component: AdministrationComponent }]
        ),
        NgbModule,
        BrowserAnimationsModule,
        FormsModule,
        CrudTableLibModule,
        CardModule,
        DropdownModule,
        ToastModule,
        CheckboxModule,
        StepsModule,
        PickListModule,
        ListboxModule,
        SliderModule,
        PanelModule,
        ChartModule,
        TableModule,
        DialogModule,
        MenubarModule,
        ConfirmDialogModule,
        ButtonModule,
        CalendarModule,
        FullCalendarModule,
        HttpClientTestingModule,
        SidebarModule,
        PanelMenuModule
      ],
      providers: [
        MessageService,
        AuthenticationService,
        InputService,
        ConfirmationService
      ]
    })
      .overrideComponent(AdministrationComponent, {
        set: {
          providers: [
            {
              provide: AuthenticationService,
              useClass: AuthenticationServiceMock
            },
            MessageService,
            InputService,
            ConfirmationService
          ]
        }
      })
      .compileComponents();
  }), 15000);

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthenticationService\'s logout method when Logout button clicked', () => {
    spyOn(component.authService, 'logout');
    const btn = fixture.nativeElement.querySelector('#logout-button');
    btn.click();

    fixture.whenStable().then(() => expect(component.authService.logout).toHaveBeenCalled());
  });

  it('should navigate to /login route when Logout button clicked', () => {
    spyOn(component.router, 'navigate').and.stub();
    const btn = fixture.nativeElement.querySelector('#logout-button');
    btn.click();

    fixture.whenStable().then(() => expect(component.router.navigate).toHaveBeenCalledWith(['/login']));
  });

  it('should show success toast message when successful event is emitted from CRUD table', () => {
    spyOn(MessageService.prototype, 'add');

    const title = 'Successful operation';
    const message = 'Great success occured.';

    component.router.navigate(['users'])
      .then(() => {
        const crudTable = fixture.debugElement.query(By.css('.crud-table'));
        crudTable.triggerEventHandler('operationResult', { success: true, title, message });
        fixture.detectChanges();

        expect(MessageService.prototype.add).toHaveBeenCalledWith({
          severity: 'success',
          summary: title,
          detail: message
        });
      });
  });

  it('should show error toast message when failed event is emitted from CRUD table', () => {
    spyOn(MessageService.prototype, 'add');

    const title = 'Failed operation';
    const message = 'Unexpected failure occured.';

    component.router.navigate(['users'])
      .then(() => {
        const crudTable = fixture.debugElement.query(By.css('.crud-table'));
        crudTable.triggerEventHandler('operationResult', { success: false, title, message });
        fixture.detectChanges();

        expect(MessageService.prototype.add).toHaveBeenCalledWith({
          severity: 'error',
          summary: title,
          detail: message
        });
      });
  });
});
