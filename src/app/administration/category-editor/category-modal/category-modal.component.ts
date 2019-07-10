import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralRestService } from 'src/app/_services/general-rest.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent {

  @Input() originalName: string;
  @Input() category;

  constructor(
    public activeModal: NgbActiveModal,
    public messageService: MessageService,
    public restService: GeneralRestService) {}

  editCategoryName () {
    this.restService.objectName = 'categories';

    this.restService.update(this.category)
      .then(res => {
        if (!res['success']) {
          this.category.label = this.originalName;
          return;
        }

        this.activeModal.close();

        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres módosítás',
          detail: 'A kategória módosításra került.'
        });
      })
      .catch(err => {
        this.category.label = this.originalName;

        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen módosítás',
          detail: 'A kategória módosítása nem sikerült.'
        });
      });
  }

  closeModal () {
    this.category.label = this.originalName;
    this.activeModal.close();
  }
}
