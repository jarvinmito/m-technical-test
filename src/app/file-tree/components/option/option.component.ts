import { Component, OnInit, ElementRef } from '@angular/core';
import { ListKeyManagerOption } from '@angular/cdk/a11y';

interface FocusableOption extends ListKeyManagerOption {
  focus(): void;
}

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  host: { 'tabindex': '-1' }
})
export class OptionComponent implements OnInit, FocusableOption {

  constructor(private host: ElementRef) { }

  ngOnInit(): void {
  }

  focus () {
    this.host.nativeElement.focus();
  }

}
