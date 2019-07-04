import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import { InputService, ANY_ROLE_ACCESS_KEY } from 'projects/crud-table-lib/src/public_api';

import { AuthenticationService } from '../_services/authentication.service';
import { haveIntersection } from 'src/utils/array';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  displayMenu = false;

  panelMenu: MenuItem[] = [
    {
      label: 'Beton téka',
      icon: 'pi pi-pw pi-copy',
      items: [
        {
          label: 'Kategóriák',
          icon: 'pi pi-fw pi-folder-open',
          command: this.closePanelMenu.bind(this)
        },
        {
          label: 'Keresés',
          icon: 'pi pi-fw pi-search',
          routerLink: '/search',
          command: this.closePanelMenu.bind(this)
        }
      ]
    },
    {
      label: '... ... ...',
      icon: 'pi pi-pw pi-copy',
      items: [
        {
          label: '.. ..',
          icon: 'pi pi-fw pi-folder-open',
          items: [
            {
              label: '.. ............'
            }
          ]
        },
        {
          label: '.. .. .. ..',
          icon: 'pi pi-fw pi-search'
        }
      ]
    },
    {
      label: 'Admin',
      icon: 'pi pi-pw pi-key',
      items: [
        {
          label: 'Felhasználók',
          icon: 'pi pi-fw pi-users',
          routerLink: '/users',
          command: this.closePanelMenu.bind(this)
        }
      ]
    }
  ];

  constructor(
    public authService: AuthenticationService,
    private inputService: InputService,
    public router: Router) { }

  ngOnInit () {
    const accessToken = this.authService.getToken();

    if (!accessToken) {
      this.router.navigate(['/login']);
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

  closePanelMenu () {
    this.displayMenu = false;
  }
}
