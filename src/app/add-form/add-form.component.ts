import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  public name = "";
  @Input() type: String | undefined;
  @Input() items: Array<object> | undefined;
  @Output() success = new EventEmitter()
  @Output() remove = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  onClick () {
    console.log('this name', this.name, this.items)
    if (!this.items) this.items = []
    if (this.name.trim() !== '') {
      this.items.push({
        type: this.type,
        name: this.name,
        items: []
      })
    }
    this.success.emit()
  }

  onClose () {
    this.remove.emit()
  }

}
