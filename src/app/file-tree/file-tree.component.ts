import {ArrayDataSource} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';

/**
 * A nested file tree structure creator
 * Each node has a name and can be navigated using a keyboard
 */
interface FileTreeNode {
  name: string,
  type: string,
  children?: FileTreeNode[]
}

const FILE_TREE_DATA: FileTreeNode[] = [
  {
    name: 'The way of the voice',
    type: 'folder'
  },
  {
    name: 'Unbound',
    type: 'folder',
    children: [
      { name: 'Raloff of Riverwood', type: 'folder' },
      { name: 'Hadvar', type: 'file' },
      { name: 'Lokir from Rorikstead', type: 'folder' },
    ]
  },
  {
    name: 'Bleakfalls Barrow',
    type: 'folder',
    children: [
      {
        name: 'Camilla',
        type: 'folder',
        children: [
          { name: 'Riverwood trader', type: 'file' },
          { name: 'Faendal', type: 'file' }
        ]
      },
      {
        name: 'Alvor',
        type: 'folder',
        children: [
          { name: 'Blacksmith', type: 'file' },
          { name: 'Idgur', type: 'folder' }
        ]
      }
    ]
  }
]

/**
 * @title File Tree Component
 */

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  host: { 'tabindex': '0' }
})

export class FileTreeComponent implements OnInit {
  // Shows the Form
  showForm = false;
  // Shows the "File" and "Folder" buttons
  showAddOptions = false;
  type = 'folder';
  // Apply tree control
  treeControl = new NestedTreeControl<FileTreeNode>(node => node.children);
  // Add static data source
  dataSource = new ArrayDataSource(FILE_TREE_DATA);
  hasChild = (_: number, node: FileTreeNode) => !!node.children && node.children.length > 0;
  constructor() {}

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
    console.log('Tree Control', this.treeControl)
    this.showAddOptions = true
  }

  onRemoveItem () {
    console.log('Removing item')
    // this.items.splice(this.itemIndex, 1)
  }

}
