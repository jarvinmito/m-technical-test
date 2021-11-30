import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nest',
  templateUrl: './nest.component.html',
  styleUrls: ['./nest.component.scss']
})
export class NestComponent implements OnInit {
  // Shows the Form
  showForm = false;
  // Shows the "File" and "Folder" buttons
  showAddOptions = false;
  type = 'folder';
  // Included depth for styling purposes
  @Input() depth: number;
  // Current item
  @Input() item: any | undefined;
  // Reference to all the sibling items
  @Input() items: any | undefined;
  // Index of the item
  @Input() itemIndex: any | undefined;
  constructor() {
    this.depth = 0
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

  onShowAddOptions () {
    // Shows the "file" and "folder" buttons
    this.showAddOptions = true
  }

  onRemoveItem () {
    this.items.splice(this.itemIndex, 1)
  }
}
