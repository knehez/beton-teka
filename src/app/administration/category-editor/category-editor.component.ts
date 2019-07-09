import { Component, OnInit } from '@angular/core';
import { TreeDragDropService } from 'primeng/api';
import { TreeNode } from 'primeng/api';
import { GeneralRestService } from 'src/app/_services/general-rest.service';

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
    public restService: GeneralRestService) { }

  ngOnInit() {

    this.loading = true;

    this.restService.objectName = 'categories';

    this.restService.getAll('')
      .then(res => {
        this.concreteTree = [ res.data ];
        this.loading = false;
      });
  }

  loadNode(event) {

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
        });

        if (Array.isArray(concretes) && concretes.length > 0) {
          event.node.children = this.removeConcretes(event.node.children);
          event.node.children.push(...concretes);
          return;
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

  removeConcretes (array) {
    return array.filter(elem => !elem.isConcrete);
  }

}
