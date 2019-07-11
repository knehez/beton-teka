import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { GeneralRestService } from 'src/app/_services/general-rest.service';

@Component({
  selector: 'app-concrete-modal',
  templateUrl: './concrete-modal.component.html',
  styleUrls: ['./concrete-modal.component.css']
})
export class ConcreteModalComponent implements OnInit {

  @Input() originalName: string;
  @Input() concrete;
  @Input() parentCategory;
  @Input() isNewConcrete: boolean;
  @Input() readOnly: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    public messageService: MessageService,
    public restService: GeneralRestService) { }

  ngOnInit () {
    this.readOnly = this.readOnly || false;
    this.concrete = this.concrete || {};
  }

  createConcrete () {
    const concreteToSave = Object.assign({}, this.concrete);

    const category = Object.assign({}, this.parentCategory);
    delete category.parent;
    delete category.children;

    concreteToSave.categories = [ category ];

    this.restService.objectName = 'concretes';

    this.restService.save(concreteToSave)
      .then(res => {
        if (!res['success']) {
          this.concrete.label = this.originalName;
          return;
        }

        // add concrete to tree
        concreteToSave.id = res['id'];
        concreteToSave.isConcrete = true;
        concreteToSave.icon = 'pi pi-info-circle';
        concreteToSave.droppable = false;
        this.parentCategory.children.push(concreteToSave);

        this.activeModal.close();

        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres mentés',
          detail: 'A beton mentésre került.'
        });
      })
      .catch(err => {
        this.concrete.label = this.originalName;

        this.activeModal.close();

        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen mentés',
          detail: 'A beton mentése nem sikerült.'
        });
      });
  }

  editConcrete () {
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
    if (this.originalName) {
      this.concrete.label = this.originalName;
    }

    this.activeModal.close();
  }
}
