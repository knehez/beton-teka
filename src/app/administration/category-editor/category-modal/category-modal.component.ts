import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralRestService } from 'src/app/_services/general-rest.service';
import { MessageService } from 'primeng/api';
import { TreeErrorCodes } from '../category-editor.component';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {

  @Input() originalName: string;
  @Input() category;
  @Input() isNewCategory: boolean;
  @Input() newCategoryName: string;

  constructor(
    public activeModal: NgbActiveModal,
    public messageService: MessageService,
    public restService: GeneralRestService) {}

  ngOnInit () {
    this.category = this.category || {};
  }

  editCategoryName () {
    const categoryToSave = Object.assign({}, this.category); // copy object
    delete categoryToSave.children;
    delete categoryToSave.parent;

    this.restService.objectName = 'categories';

    this.restService.update(categoryToSave)
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

        this.activeModal.close();

        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen módosítás',
          detail: 'A kategória módosítása nem sikerült.'
        });
      });
  }

  createCategory () {
    const parent = Object.assign({}, this.category); // copy object
    delete parent.children;
    delete parent.parent;

    const categoryToSave = {
      label: this.newCategoryName,
      parent
    };

    this.restService.objectName = 'categories';

    this.restService.save(categoryToSave)
      .then(res => {
        if (!res['success']) {
          return;
        }

        categoryToSave['id'] = res['id'];
        categoryToSave['leaf'] = false;
        categoryToSave['children'] = [];

        // remove empty node error message
        this.category.children = this.category.children.filter(node => {
          if (!node.data) {
            return true;
          }

          return !node.data.error || node.data.code !== TreeErrorCodes.emptyNode;
        });

        // add category to tree
        this.category.children.push(categoryToSave);

        this.activeModal.close();

        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres módosítás',
          detail: 'A kategória módosításra került.'
        });
      })
      .catch(err => {
        console.log(err);
        this.activeModal.close();

        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen módosítás',
          detail: 'A kategória módosítása nem sikerült.'
        });
      });
  }

  closeModal () {
    if (this.originalName) {
      this.category.label = this.originalName;
    }

    this.activeModal.close();
  }
}
