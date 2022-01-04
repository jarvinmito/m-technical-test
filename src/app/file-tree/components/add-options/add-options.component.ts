import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter, ViewChildren, TemplateRef, QueryList, ElementRef, ViewChild } from '@angular/core';
import { FocusKeyManager, ListKeyManagerOption } from '@angular/cdk/a11y';
import {ArrayDataSource} from '@angular/cdk/collections';
import { FileTreeNode } from '../../file-tree-node.model';
import { OptionComponent } from '../option/option.component';

interface FocusableOption extends ListKeyManagerOption {
  focus(): void;
}

@Component({
  selector: 'app-add-options',
  templateUrl: './add-options.component.html',
  styleUrls: ['./add-options.component.scss'],
  host: { 'tabindex': '-1' }
})
export class AddOptionsComponent implements OnInit, AfterViewInit, FocusableOption {
  @Input() node?: FileTreeNode;
  @Input() root = false;
  @Input() items!: FileTreeNode[];
  @Output() add = new EventEmitter();
  @ViewChild('fileOptions', { read: ElementRef }) parentElement!: ElementRef;
  @ViewChildren(OptionComponent) fileOptions!: QueryList<OptionComponent>;

  private keyManager!: FocusKeyManager<OptionComponent>;

  options = ['folder', 'file'];

  // Shows the Add Form on the root level
  rootAddForm = false;
  
  // Shows the "File" and "Folder" buttons on the root level
  rootAddOptions = false;

  // Type of node being created
  type = 'folder';

  constructor(private host: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit () {
    // this.keyManager = new FocusKeyManager(this.fileOptions).withWrap();
    // // Focus here
    // setTimeout(() => {
    //   this.parentElement.nativeElement.focus();
    //   console.log('After View Init focusing');
    // }, 300)
    // console.log('After View Init');
  }

  focus () {
    this.host.nativeElement.focus();
  }

  onAdd (event: object) {
    console.log('Event on Add', event);
  }

  // Show the add form for the selected node
  onShowAddForm (type: string, node?: FileTreeNode) {
    // Shows the add form
    if (this.root) {
      // Root level add form
      this.rootAddForm = true;
      this.rootAddOptions = false;
      this.type = type;
    } else if (node) {
      // node.addForm = true;
      // node.addOptions = false;
      node.type = type;
    }
  }

  // Hides the form and options for the selected node
  onHideAddForm (node?: FileTreeNode) {
    if (this.root) {
      // Root level
      this.rootAddOptions = false;
      this.rootAddForm = false;
      this.type = 'folder';
    } else if (node) {
      // node.addForm = false;
      // node.addOptions = false;
      node.type = 'folder';
    }
  }
}
