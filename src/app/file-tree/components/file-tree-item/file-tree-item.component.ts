import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { FocusKeyManager, ListKeyManagerOption } from '@angular/cdk/a11y';
import { FileTreeNode } from '../../file-tree-node.model';

interface FocusableOption extends ListKeyManagerOption {
  focus(): void;
}

@Component({
  selector: 'app-file-tree-item',
  templateUrl: './file-tree-item.component.html',
  styleUrls: ['./file-tree-item.component.scss'],
  host: { 'tabindex': '-1' }
})

export class FileTreeItemComponent implements OnInit, FocusableOption {
  @Input() node!: FileTreeNode;
  @Output() onAdd = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  constructor(private host: ElementRef) { }

  ngOnInit(): void {
    // console.log(this.node);
  }

  // Renders the correct file format icon for the node
  renderFileType (node: FileTreeNode) {
    return node.type === 'file' ? '/assets/file-regular.svg' : '/assets/folder-open-regular.svg';
  }

  add () {
    this.onAdd.emit();
  }

  remove () {
    this.onRemove.emit();
  }

  focus () {
    this.host.nativeElement.focus();
  }

}
