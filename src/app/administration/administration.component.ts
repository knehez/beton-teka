import { Component } from '@angular/core';

import { User } from 'src/backend/entities/user';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { haveIntersection } from 'src/utils/array';
import { Role } from 'src/backend/entities/role';
import { MessageService } from 'primeng/api';
import { InputService, ANY_ROLE_ACCESS_KEY } from 'projects/crud-table-lib/src/public_api';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {
  title = 'crud';

  actualPermissions = [];

  userEntity: any;
  roleEntity: any;

  private _opened = false;
  cols: any[];
  isNavbarCollapsed = true;
  currentSelection = 'user';
  allEntities: any[] = [];

  userFilter = {};
  backList = [];

  constructor(
    private messageService: MessageService,
    public authService: AuthenticationService,
    private inputService: InputService,
    public router: Router) {

    this.actualPermissions = this.authService.getRoles();

    this.userEntity = new User;
    this.roleEntity = new Role;

    this.allEntities.push({ name: 'User', entity: this.inputService.getFormElements(this.userEntity) });
    this.allEntities.push({ name: 'Role', entity: this.inputService.getFormElements(this.roleEntity) });
  }

  goBack() {
    if (this.backList.length !== 0) {
      this.currentSelection = this.backList.pop();
    }
  }

  onLogoutClicked() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  canReadEntity(entity) {
    const actualRoles = this.authService.getRoles();
    const allowedRoles = this.inputService.getPermissions(entity)['read'];

    if (allowedRoles.includes(ANY_ROLE_ACCESS_KEY)) {
      return true;
    }

    return haveIntersection(actualRoles, allowedRoles);
  }

  userCellSelected(obj: any) {
    this.backList.push(this.currentSelection);
    this.currentSelection = 'task';
  }

  showToastMessage(isSuccess: boolean, title: string, message: string) {
    this.messageService.add({
      severity: isSuccess ? 'success' : 'error',
      summary: title,
      detail: message
    });
  }

  handleResult(result) {
    this.showToastMessage(result.success, result.title, result.message);
  }
}
