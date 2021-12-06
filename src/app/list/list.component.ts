import {
  Component,
  ContentChildren,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  QueryList,
  HostListener
} from '@angular/core';
import { FocusKeyManager, ListKeyManagerOption } from '@angular/cdk/a11y';
import { NestComponent } from '../nest/nest.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  host: { 'tabindex': '-1' }
})
export class ListComponent implements AfterContentInit {
  // Depth is only used for styling
  @Input() depth: number;
  @Input() items: Array<any> | [];
  // @ContentChildren(NestComponent, { descendants: true }) items: QueryList<NestComponent>
  // private keyManager: FocusKeyManager<any>
  constructor(private keyManager: FocusKeyManager<NestComponent>) {
    this.depth = 0
    this.items = []
  }
  @HostListener('keydown', ['$event'])
  manage (event: KeyboardEvent) {
    // console.log('Event triggered', event, this.keyManager)

    // this.keyManager.onKeydown(event);
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.items).withWrap();
  }
}
