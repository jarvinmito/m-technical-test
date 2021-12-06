import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})

export class AddFormComponent implements AfterContentInit {
  public name = '';
  @Input() type: String | undefined;
  @Input() items: Array<object> | undefined;
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
    // Only add item if not blank
    if (this.name.trim() !== '') {
      this.items.push({
        type: this.type,
        name: this.name,
        active: false,
        items: []
      })
    }
    // Emit success function, ready for future integrations if ever
    this.success.emit()
  }

  onClose () {
    // Emit remove function, ready for future integrations if ever
    this.remove.emit()
  }
}
