import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { GeneralRestService } from 'src/app/_services/general-rest.service';
import { ConcreteService } from 'src/app/_services/concrete.service';
import { TreeErrorCodes } from '../category-editor.component';

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
  suggestedConcreteNames: any[];
  selectedConcrete = '';

  constructor(
    public activeModal: NgbActiveModal,
    public messageService: MessageService,
    public restService: GeneralRestService,
    private concreteService: ConcreteService) { }

  ngOnInit() {
    this.readOnly = this.readOnly || false;
    this.concrete = this.concrete || {};
  }

  assignConcrete() {
    const concreteToSave = Object.assign({}, this.concrete);

    const category = Object.assign({}, this.parentCategory);
    delete category.parent;
    delete category.children;

    concreteToSave.categories = [category];

    this.restService.objectName = 'concretes';


    this.restService.getByName(concreteToSave.label)
      .subscribe(res => {
        if (!res.id) {
          this.restService.save(concreteToSave).then(res2 => {
            if (!res2['success']) {
              this.concrete.label = this.originalName;
              return;
            }
            this.addConcreteToTree(concreteToSave, res['id']);
          }).catch(err => {
            this.concrete.label = this.originalName;

            this.activeModal.close();

            this.messageService.add({
              severity: 'error',
              summary: 'Sikertelen mentés',
              detail: 'A beton mentése nem sikerült.'
            });
          });
        } else {
          res.categories.push(category);
          this.restService.update(res).then(res3 => {
            this.addConcreteToTree(res, res['id']);
          });
        }
      });
  }

  addConcreteToTree(concreteToSave, id) {
    // add concrete to tree
    concreteToSave.id = id;
    concreteToSave.isConcrete = true;
    concreteToSave.icon = 'pi pi-info-circle';
    concreteToSave.droppable = false;
    // remove empty node error message
    this.parentCategory.children = this.parentCategory.children.filter(node => {
      if (!node.data) {
        return true;
      }

      return !node.data.error || node.data.code !== TreeErrorCodes.emptyNode;
    });

    this.parentCategory.children.push(concreteToSave);

    this.activeModal.close();

    this.messageService.add({
      severity: 'success',
      summary: 'Sikeres mentés',
      detail: 'A beton mentésre került.'
    });
  }

  editConcrete() {
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

  closeModal() {
    if (this.originalName) {
      this.concrete.label = this.originalName;
    }

    this.activeModal.close();
  }

  filterNamesMultiple(event) {
    const query = event.query;
    this.concreteService.getAllNames().then(concreteNames => {
      this.suggestedConcreteNames = this.filterName(query, concreteNames as []);
    });
  }

  filterName(query, concreteNames: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < concreteNames.length; i++) {
      const concName = concreteNames[i];
      if (concName.toLowerCase().includes(query.toLowerCase()) === true) {
        filtered.push(concName);
      }
    }
    this.selectedConcrete = query;
    return filtered;

  }
}
