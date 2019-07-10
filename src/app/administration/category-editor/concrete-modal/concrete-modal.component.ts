import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { GeneralRestService } from 'src/app/_services/general-rest.service';

@Component({
  selector: 'app-concrete-modal',
  templateUrl: './concrete-modal.component.html',
  styleUrls: ['./concrete-modal.component.css']
})
export class ConcreteModalComponent {

  @Input() originalName: string;
  @Input() concrete;

  constructor(
    public activeModal: NgbActiveModal,
    public messageService: MessageService,
    public restService: GeneralRestService) { }

  editConcreteName () {
    const concreteToSave = Object.assign({}, this.concrete); // copy object
    delete concreteToSave.parent;

    this.restService.objectName = 'concretes';

    this.restService.update(concreteToSave)
      .then(res => {
        if (!res['success']) {
          this.concrete.label = this.originalName;
          return;
        }

        this.activeModal.close();

        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres módosítás',
          detail: 'A beton módosításra került.'
        });
      })
      .catch(err => {
        this.concrete.label = this.originalName;

        this.activeModal.close();

        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen módosítás',
          detail: 'A beton módosítása nem sikerült.'
        });
      });
  }

  closeModal () {
    this.concrete.label = this.originalName;
    this.activeModal.close();
  }
}
