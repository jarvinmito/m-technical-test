import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // Depth is only used for styling
  @Input() depth: number;
  @Input() items: Array<any> | undefined;
  constructor() {
    this.depth = 0
  }

  ngOnInit(): void {
  }
}
