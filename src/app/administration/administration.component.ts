import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';

import { InputService, ANY_ROLE_ACCESS_KEY } from 'projects/crud-table-lib/src/public_api';

import { AuthenticationService } from '../_services/authentication.service';
import { haveIntersection } from 'src/utils/array';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {

  displayMenu = false;

  panelMenu: MenuItem[] = [
    {
      label: 'Beton téka',
      icon: 'pi pi-pw pi-copy',
      items: [
        {
          label: 'Kategóriák',
          icon: 'pi pi-fw pi-folder-open',
          routerLink: '/categories',
          command: this.closePanelMenu.bind(this)
        },
        {
          label: 'Keresés',
          icon: 'pi pi-fw pi-search',
          command: this.closePanelMenu.bind(this)
        }
      ]
    },
    {
      label: 'Kísérletek',
      icon: 'pi pi-pw pi-copy',
      items: [
        {
          label: 'Új kísérlet',
          icon: 'pi pi-plus',
          routerLink: '/newExperiment',
          command: this.closePanelMenu.bind(this)
        },
        {
          label: 'Keresés',
          icon: 'pi pi-fw pi-search',
          routerLink: '/searchExperiment',
          command: this.closePanelMenu.bind(this)
        }
      ]
    },
    {
      label: 'Mérések',
      icon: 'pi pi-pw pi-copy',
      items: [
        {
          label: 'Új mérés',
          icon: 'pi pi-plus',
          routerLink: '/newMeasurement',
          command: this.closePanelMenu.bind(this)
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
