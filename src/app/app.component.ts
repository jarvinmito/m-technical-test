import { Component, Input, AfterContentInit, ElementRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  // Sample title
  title = 'file-tree';
  // Items list with commented samples for faster UI testing
  items = [
    { name: 'Smaple 1', type: 'folder', active: false },
    { name: 'Smaple 2', type: 'folder', active: false },
    { name: 'Smaple 3', type: 'file', active: false },
    { name: 'Smaple 4', type: 'folder', active: false, items: [
      { name: 'Smaple 5', type: 'folder', active: false },
      { name: 'Smaple 6', type: 'folder', active: false },
      { name: 'Smaple 7', type: 'file', active: false },
    ] },
    { name: 'Smaple 8', type: 'folder', active: false },
  ];
  showRootForm = false;
  selectedIndex = 0;

  constructor (private element: ElementRef) {
  }

  // Used specific function to avoid multiple trigger issues
  showRootAddForm () {
    this.showRootForm = true;
  }
  hideRootAddForm () {
    this.showRootForm = false;
  }

  focusOnRoot () {
    const content = document.getElementById('file-tree-container')
    if (content) content.focus()
  }

  selectingNode (e: KeyboardEvent) {
    // console.log('Selecting Node', e.target, this.element, document.getElementById('file-tree-list'))
    for (var i = 0; i < this.items.length; i++) {
      console.log('Selecting', this.selectedIndex, `${this.items[i].type}_${this.items[i].name}_${i}`, e.key)      
      if (e.key === 'ArrowDown') {
        this.items[i].active = false
        if ((this.selectedIndex === i - 1) || (i === this.items.length - 1 && this.selectedIndex === this.items.length - 1)) {
          this.items[i].active = true
          this.selectedIndex = i
          break;
        }
      }

      if (e.key === 'ArrowUp') {
        if ((this.selectedIndex === i + 1) || (i === 0 && this.selectedIndex === 0)) {
          this.items[i].active = true
          this.selectedIndex = i
        } else {
          this.items[i].active = false
        }
      }
    }
  }

  navigate (e: KeyboardEvent) {
    console.log('Keyboard is pressed', e)
    switch (e.key) {
      case 'ArrowDown':
        // Navigate downwards
        this.selectingNode(e)
        break
      case 'ArrowUp':
        // Navigate upwards
        this.selectingNode(e)
        break
      case 'Enter':
        // Add new node if folder
        // Check if there is a selected node
        // If there is, add new node if folder
        // else, add new on root
        if (this.selectedIndex === null) {
          this.showRootAddForm()
        }
        break
      case 'Backspace':
        // Remove node
        break
      case 'Escape':
        // Hide the Root Add Form
        this.hideRootAddForm()
        // Refocus
        this.focusOnRoot()
        break
      default: // nothing
        break
    }
  }

  ngAfterContentInit (): void {
    // Focus on div
    // console.log('Element loaded', this.element)
    this.focusOnRoot()
  }
}
