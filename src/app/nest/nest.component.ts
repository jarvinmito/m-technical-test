import { Component, ElementRef, OnInit, OnChanges, Input, AfterViewInit } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

@Component({
  selector: 'app-nest',
  templateUrl: './nest.component.html',
  styleUrls: ['./nest.component.scss'],
  host: { 'tabindex': '-1' }
})
export class NestComponent implements FocusableOption {
  // Shows the Form
  showForm = false;
  // Shows the "File" and "Folder" buttons
  showAddOptions = false;
  type = 'folder';
  // Included depth for styling purposes
  @Input() depth: number | 0;
  // Current item
  @Input() item: any | undefined;
  // Reference to all the sibling items
  @Input() items: any | undefined;
  // Index of the item
  @Input() itemIndex: any | undefined;
  @Input() nodeId: string | '';
  constructor(private element: ElementRef) {
  // constructor() {
    this.depth = 0
    this.nodeId = ''
  }

  ngOnInit(): void {
  }
  
  onShowAddForm (type: string) {
    // Shows the add form
    this.showForm = true
    this.type = type
  }

  onHideAddForm () {
    // Resets to default
    this.type = 'folder'
    this.showForm = false
    this.showAddOptions = false
  }

  onEnterKey (e: KeyboardEvent) {
    if (e.key === 'Enter') this.onShowAddOptions()
  }

  onShowAddOptions () {
    // Shows the "file" and "folder" buttons
    this.showAddOptions = true
  }

  onRemoveItem () {
    this.items.splice(this.itemIndex, 1)
  }

  // for A11y keyboard navigation
  getLabel (): string {
    return this.nodeId;
  }
  focus () {
    console.log('Focusing element', this.element)
    this.element.nativeElement.focus();
  }
}
