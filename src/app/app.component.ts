import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'file-tree';
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
  onSuccess () {
    console.log('Root folder added')
  }
  showAddForm () {
    this.showRootForm = true;
  }
  hideAddForm () {
    this.showRootForm = false;
  }
}
