import { Component, OnInit } from '@angular/core';
import { TreeDragDropService, MessageService } from 'primeng/api';
import { TreeNode } from 'primeng/api';
import { GeneralRestService } from 'src/app/_services/general-rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { ConcreteModalComponent } from './concrete-modal/concrete-modal.component';

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.css']
})
export class CategoryEditorComponent implements OnInit {

  concreteTree: TreeNode[];

  selectedNode: TreeNode;

  loading: boolean;

  constructor(
    public treeDragDrop: TreeDragDropService,
    public messageService: MessageService,
    public restService: GeneralRestService,
    public modalService: NgbModal) { }

  ngOnInit() {

    this.loading = true;

    this.restService.objectName = 'categories';

    this.restService.getAll('')
      .then(res => {
        this.concreteTree = [res.data];
        this.loading = false;
      });
  }

  loadConcretes(event) {
    if (!event.node) {
      return;
    }

    this.restService.objectName = 'categories';
    this.restService.getOne(event.node.id)
      .subscribe(res => {
        const concretes = res['data']['concretes'];
        concretes.forEach(concrete => {
          concrete.isConcrete = true;
          concrete.icon = 'pi pi-info-circle';
          concrete.droppable = false;
        });

        if (Array.isArray(concretes)) {
          event.node.children = this.removeConcretes(event.node.children);
          event.node.children.push(...concretes);
        }

        if (Array.isArray(event.node.children) && event.node.children.length === 0) {
          event.node.children.push({
            label: 'Nincs beton vagy alkategória.',
            selectable: false,
            droppable: false,
            draggable: false
          });
        }
      });
  }

  removeConcretes(array) {
    return array.filter(elem => !elem.isConcrete);
  }

  deleteSelectedCategory() {
    const category = this.selectedNode;

    this.restService.objectName = 'categories';
    this.restService.delete(category)
      .then(res => {
        if (res['success']) {
          const parentNode = category.parent;
          const index = parentNode.children.indexOf(category);

          if (index > -1) {
            // delete category from tree
            parentNode.children.splice(index, 1);
          }

          this.messageService.add({
            severity: 'success',
            summary: 'Sikeres törlés',
            detail: 'A kategória törlésre került.'
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen törlés',
          detail: 'A kategória törlése nem sikerült.'
        });
      });
  }

  deleteSelectedConcrete() {
    const concrete = this.selectedNode;

    this.restService.objectName = 'concretes';
    this.restService.delete(concrete)
      .then(res => {
        if (!res['success']) {
          return;
        }

        const parentNode = concrete.parent;
        this.loadConcretes({ node: parentNode });

        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres törlés',
          detail: 'A beton törlésre került.'
        });
      })
      .catch(err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen törlés',
          detail: 'A beton törlése nem sikerült.'
        });
      });
  }

  editSelectedCategory() {
    const category = this.selectedNode;
    const modal = this.modalService.open(CategoryModalComponent);
    modal.componentInstance.isNewCategory = false;
    modal.componentInstance.originalName = category.label;
    modal.componentInstance.category = category;
  }

  editSelectedConcrete() {
    const concrete = this.selectedNode;
    const modal = this.modalService.open(ConcreteModalComponent);
    modal.componentInstance.originalName = concrete.label;
    modal.componentInstance.concrete = concrete;
  }

  createNewCategory() {
    const parent = this.selectedNode;
    const modal = this.modalService.open(CategoryModalComponent);
    modal.componentInstance.category = parent;
    modal.componentInstance.isNewCategory = true;
  }

  createNewConcrete() {
    const parent = this.selectedNode;
    const modal = this.modalService.open(ConcreteModalComponent);
    modal.componentInstance.parentCategory = parent;
    modal.componentInstance.isNewConcrete = true;
  }

  readConcreteProfile() {
    const concrete = this.selectedNode;
    const modal = this.modalService.open(ConcreteModalComponent);
    modal.componentInstance.concrete = concrete;
    modal.componentInstance.readOnly = true;
    modal.componentInstance.isNewConcrete = false;
  }

  switchDroppable(event) {
    const category = Object.assign({}, this.selectedNode);
    delete category.parent;
    delete category.children;
    category.droppable = event.checked;

    this.restService.objectName = 'categories';
    this.restService.update(category)
      .then(res => {
        if (!res['success']) {
          return;
        }

        this.selectedNode.droppable = category.droppable;

        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres módosítás',
          detail: 'A kategória módosításra került.'
        });
      })
      .catch(err => {
        console.log(err);

        // switch back, if error occured
        this.selectedNode.droppable = !this.selectedNode.droppable;

        this.messageService.add({
          severity: 'error',
          summary: 'Sikertelen módosítás',
          detail: 'A kategória módosítása nem sikerült.'
        });
      });
  }

  dropConcreteUnderCategory(concrete, category) {
    const concreteToSave = Object.assign({}, concrete);
    const categoryToSave = Object.assign({}, category);

    delete concreteToSave.parent;
    delete concreteToSave.children;
    delete categoryToSave.parent;
    delete categoryToSave.children;

    concreteToSave.categories = [categoryToSave];

    this.restService.objectName = 'concretes';
    return this.restService.update(concreteToSave);
  }

  validateNodeDrop(event) {
    const { dragNode } = event;
    let { dropNode } = event;
    const previousParent = dragNode.parent; // for rollback

    if (dropNode.isConcrete) {
      dropNode = dropNode.parent;
    }

    event.accept();

    // put concrete under category
    if (!dropNode.isConcrete && dragNode.isConcrete) {
      this.dropConcreteUnderCategory(dragNode, dropNode)
        .then(res => {
          if (!res['success']) {
            return;
          }

          this.messageService.add({
            severity: 'success',
            summary: 'Sikeres módosítás',
            detail: 'A módosítás sikerült.'
          });
        })
        .catch(err => {

          // rollback operation on frontend
          const droppedNodeIndex = dropNode.children.indexOf(dragNode);
          if (droppedNodeIndex > -1 ) {
            dropNode.children.splice(droppedNodeIndex, 1);
          }

          previousParent.children.push(dragNode);

          this.messageService.add({
            severity: 'error',
            summary: 'Sikertelen módosítás',
            detail: 'A módosítás mentése nem sikerült, ezért a korábbi állapot került visszaállításra.'
          });
        });
    }
  }
}
