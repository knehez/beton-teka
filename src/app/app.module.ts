import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeModule } from 'primeng/tree';
import { TreeDragDropService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdministrationComponent } from './administration/administration.component';
import { environment } from 'src/environments/environment';
import { AuthHttpInterceptorService } from './_services/auth-http-interceptor.service';
import { PickListModule } from 'primeng/picklist';
import { ListboxModule } from 'primeng/listbox';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabMenuModule } from 'primeng/tabmenu';

import { CrudTableLibModule } from 'projects/crud-table-lib/src/public_api';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { StepsModule } from 'primeng/steps';
import { UserManagementComponent } from './administration/user-management/user-management.component';
import { CategoryEditorComponent } from './administration/category-editor/category-editor.component';
import { GeneralRestService } from './_services/general-rest.service';
import { NewExperimentComponent } from './administration/new-experiment/new-experiment.component';
import { SearchExperimentComponent } from './administration/search-experiment/search-experiment.component';
import { NewMeasurementComponent } from './administration/new-measurement/new-measurement.component';
import { CategoryModalComponent } from './administration/category-editor/category-modal/category-modal.component';
import { ConcreteModalComponent } from './administration/category-editor/concrete-modal/concrete-modal.component';
import { AuthGuard } from './auth.guard';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConcreteManagementComponent } from './administration/concrete-management/concrete-management.component';
import { ConcreteService } from './_services/concrete.service';
import { MeasurementTypeService } from './_services/measurement-type.service';
import { ExperimentService } from './_services/experiment.service';


const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'users',
        component: UserManagementComponent
      },
      {
        path: 'categories',
        component: CategoryEditorComponent
      },
      {
        path: 'newExperiment',
        component: NewExperimentComponent
      },
      {
        path: 'searchExperiment',
        component: SearchExperimentComponent
      },
      {
        path: 'newMeasurement',
        component: NewMeasurementComponent
      },
      {
        path: 'concreteManagement',
        component: ConcreteManagementComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdministrationComponent,
    UserManagementComponent,
    CategoryEditorComponent,
    NewExperimentComponent,
    SearchExperimentComponent,
    NewMeasurementComponent,
    CategoryModalComponent,
    ConcreteModalComponent,
    ConcreteManagementComponent
  ],
  imports: [
    MultiSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    CrudTableLibModule,
    ContextMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    ButtonModule,
    TableModule,
    ToastModule,
    PickListModule,
    ListboxModule,
    InputSwitchModule,
    SliderModule,
    TabMenuModule,
    TreeModule,
    CardModule,
    NgbModule,
    MenubarModule,
    ChartModule,
    CheckboxModule,
    CalendarModule,
    FullCalendarModule,
    PanelMenuModule,
    StepsModule,
    SidebarModule,
    AutoCompleteModule,
    RouterModule.forRoot(routes, { enableTracing: !environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptorService,
      multi: true
    },
    ConfirmationService,
    MeasurementTypeService,
    GeneralRestService,
    ConcreteService,
    MessageService,
    TreeDragDropService,
    JwtHelperService,
    ExperimentService
  ],
  entryComponents: [
    CategoryModalComponent,
    ConcreteModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
