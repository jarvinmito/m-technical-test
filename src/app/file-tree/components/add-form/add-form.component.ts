import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, ElementRef } from '@angular/core';
import { FileTreeNode } from '../../file-tree-node.model';
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})

export class AddFormComponent implements AfterContentInit {
  public name = '';
  @Input() parentId!: string;
  @Input() type!: string;
  @Input() items!: FileTreeNode[];
  @Output() updateList = new EventEmitter()
  @Output() success = new EventEmitter()
  @Output() remove = new EventEmitter()
  constructor(private element: ElementRef) { }

  ngAfterContentInit(): void {
    console.log('Add form focusing', this.element)
    this.element.nativeElement.firstChild.childNodes[1].focus()
  }

  onSave () {
    /*
      Initial onClick function to add the item in the items Array
      Resets array items if undefined
    */
    if (!this.items) this.items = []
    // if (this.items && this.name.trim() !== '') {
    //   this.updateList.emit({
    //     parentId: this.parentId,
    //     node: {
    //       id: this.generateRandomID(),
    //       type: this.type,
    //       name: this.name,
    //       addOptions: false,
    //       addForm: false,
    //       children: []
    //     }
    //   })
    //   this.success.emit();
    // }
  }

  onClose () {
    // Emit remove function, ready for future integrations if ever
    this.remove.emit()
  }
}
