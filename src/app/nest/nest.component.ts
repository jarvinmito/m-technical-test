import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nest',
  templateUrl: './nest.component.html',
  styleUrls: ['./nest.component.scss']
})
export class NestComponent implements OnInit {
  showItemButtons = false;
  showForm = false;
  showAddForm = false;
  type = 'folder';
  @Input() item: any | undefined;
  @Input() items: any | undefined;
  @Input() itemIndex: any | undefined;
  constructor() { }

  ngOnInit(): void {
  }
  
  onClick (type: string) {
    this.showAddForm = true
    this.type = type
  }

  showItemOptions () {
    this.showItemButtons = true
  }

  hideItemOptions () {
    this.showItemButtons = false
  }

  onSuccess () {
    console.log('Success')
    this.type = 'folder'
    this.showAddForm = false
  }

  onHideForm () {
    this.showAddForm = false
  }

  onShowAddForm () {
    this.showForm = true  
  }
  onHideAddForm () {
    this.showForm = false
  }

  removeItem () {
    console.log('remove item')
    this.items.splice(this.itemIndex, 1)
  }

}
