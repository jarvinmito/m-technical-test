import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Sample title
  title = 'file-tree';
  // Items list with commented samples for faster UI testing
  items = [
    // { name: 'Smaple', type: 'folder' },
    // { name: 'Smaple', type: 'folder' },
    // { name: 'Smaple', type: 'file' },
    // { name: 'Smaple', type: 'folder', items: [
    //   { name: 'Smaple', type: 'folder' },
    //   { name: 'Smaple', type: 'folder' },
    //   { name: 'Smaple', type: 'file' },
    // ] },
    // { name: 'Smaple', type: 'folder' },
  ];
  showRootForm = false;
  // Used specific function to avoid multiple trigger issues
  showRootAddForm () {
    this.showRootForm = true;
  }
  hideRootAddForm () {
    this.showRootForm = false;
  }
}
