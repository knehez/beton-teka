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

import { CrudTableLibModule } from 'projects/crud-table-lib/src/public_api';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { StepsModule } from 'primeng/steps';
import { UserManagementComponent } from './administration/user-management/user-management.component';
import { CategoryEditorComponent } from './administration/category-editor/category-editor.component';
import { GeneralRestService } from './_services/general-rest.service';
import { NewExperimentComponent } from './administration/new-experiment/new-experiment.component';
import { SearchExperimentComponent } from './administration/search-experiment/search-experiment.component';


const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
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
    SearchExperimentComponent
  ],
  imports: [
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
    RouterModule.forRoot(routes, { enableTracing: !environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptorService,
      multi: true
    },
    ConfirmationService,
    GeneralRestService,
    MessageService,
    TreeDragDropService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
