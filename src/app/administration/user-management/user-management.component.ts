import { Component, OnInit } from '@angular/core';
import { User } from 'src/backend/entities/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  userEntity;
  actualPermissions = [];
  userFilter = {};

  constructor(
    public authService: AuthenticationService,
    public messageService: MessageService) { }

  ngOnInit() {
    this.userEntity = new User;
    this.actualPermissions = this.authService.getRoles();
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
