import {ArrayDataSource} from '@angular/cdk/collections';
import { FocusKeyManager, ListKeyManagerOption } from '@angular/cdk/a11y';
import {Component, ElementRef, OnInit, AfterViewInit, ViewChildren, QueryList, AfterViewChecked, Renderer2, ViewChild} from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { FileTreeNode } from './file-tree-node.model';
import { FileTreeItemComponent } from './components/file-tree-item/file-tree-item.component';
/**
 * A nested file tree structure creator
 * Each node has a name and can be navigated using a keyboard
 */

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  host: { 'tabindex': '-1' }
})

export class FileTreeComponent implements OnInit, AfterViewInit, AfterViewChecked {
  // File tree initial data
  treeData: FileTreeNode[] = [
    {
      id: '123',
      name: 'The way of the voice',
      type: 'folder',
      expandable: true,
      isExpanded: true,
      level: 0,
    },
    {
      id: '345',
      name: 'Unbound',
      type: 'folder',
      expandable: true,
      isExpanded: true,
      level: 0,
    },
    {
      id: '567',
      name: 'Raloff of Riverwood',
      type: 'folder',
      expandable: true,
      isExpanded: true,
      level: 1,
    },
    {
      id: '789',
      name: 'Hadvar',
      type: 'file',
      expandable: false,
      isExpanded: true,
      level: 1,
    },
    {
      id: '321',
      name: 'Lokir from Rorikstead',
      type: 'folder',
      expandable: true,
      isExpanded: true,
      level: 1,
    },
    {
      id: '5123',
      name: 'Bleakfalls Barrow',
      type: 'folder',
      expandable: true,
      isExpanded: true,
      level: 0,
    },
    {
      id: '9931',
      name: 'Camilla',
      type: 'folder',
      expandable: true,
      isExpanded: true,
      level: 1,
    },
    {
      id: '31ad',
      name: 'Riverwood trader',
      type: 'file',
      expandable: false,
      isExpanded: true,
      level: 2,
    },
    {
      id: '3311123',
      name: 'Faendal',
      type: 'file',
      expandable: false,
      isExpanded: true,
      level: 2,
    },
    {
      id: 'asdfasdf',
      name: 'Alvor',
      type: 'folder',
      expandable: true,
      isExpanded: true,
      level: 1,
    },
    {
      id: '903sdf',
      name: 'Blacksmith',
      type: 'file',
      expandable: false,
      isExpanded: true,
      level: 2,
    },
    {
      id: '193kdf',
      name: 'Idgur',
      type: 'folder',
      expandable: true,
      isExpanded: true,
      level: 2,
    },
  ]
  // All custom file tree node containers
  @ViewChild('tree', { read: ElementRef }) tree!: ElementRef;
  @ViewChild('treeOptions', { read: ElementRef }) treeOptions?: ElementRef;
  @ViewChildren(FileTreeItemComponent) items!: QueryList<FileTreeItemComponent>
  
  private keyManager!: FocusKeyManager<FileTreeItemComponent>;
  
  // Apply tree control
  treeControl = new FlatTreeControl<FileTreeNode>(node => node.level, node => node.expandable);

  // Shows the add options
  rootAddOptions = false;

  type = 'folder';
  
  // Add static data source
  dataSource = new ArrayDataSource(this.treeData);
  
  // Selected Item in the QueryList
  selectedIndex = 0;
  
  hasChild = (_: number, node: FileTreeNode) => node.expandable;
  
  constructor(private renderer: Renderer2, private host: ElementRef) {
  }

  // Gets the parent node based on levels
  getParentNode(node: FileTreeNode) {
    const nodeIndex = this.treeData.indexOf(node);
    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (this.treeData[i].level === node.level - 1) {
        return this.treeData[i];
      }
    }
    return null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit () {
    console.log('Elements', this.tree.nativeElement)
    this.keyManager = new FocusKeyManager(this.items).withWrap();
    if (!this.tree.nativeElement.tabIndex || this.tree.nativeElement.tabIndex === -1) {
      this.tree.nativeElement.tabIndex = -1
    }
    this.tree.nativeElement.focus();
  }

  ngDoCheck () {
    // console.log('Updates');
    // const newItemOptionIndex = this.treeData.findIndex(node => node.name === '' && node.type === '')
    // const newItemFormIndex = this.treeData.findIndex(node => node.name === '' && node.type !== '')
    // console.log('New item', newItemOptionIndex, newItemFormIndex);
    // if (newItemOptionIndex !== -1) {
    //   console.log('New item option', newItemOptionIndex);
    //   this.keyManager.setActiveItem(newItemOptionIndex);
    // } else if (newItemFormIndex !== -1) {
    //   console.log('New item form', newItemFormIndex);
    //   this.keyManager.setActiveItem(newItemFormIndex);
    // } else {}
  }

  ngAfterViewChecked () {
    // Check if there is an active form/option to focus to
    // if (this.treeOptions) {
    //   if (!this.treeOptions.nativeElement.tabIndex || this.treeOptions.nativeElement.tabIndex === -1) {
    //     this.treeOptions.nativeElement.tabIndex = -1
    //   }
    //   this.treeOptions.nativeElement.focus();
    // }
  }

  // Captures keyboard events to manipulate the Data and View
  onKeydown(event: KeyboardEvent) {
    const allowedKeys = ['Enter', 'Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape'];
    console.log('Key pressed', event);
    if (allowedKeys.indexOf(event.key) !== -1) {
      // Sets the current index properly
      const currentIndex = this.keyManager.activeItemIndex === null ? -1 : this.keyManager.activeItemIndex
      if (currentIndex === -1) {
        // When there is no selected node
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          this.keyManager.setFirstItemActive();
        } else if (event.key === 'Enter') {
          // show add options in root
          this.onShowAddOptions()
        }
      } else {
        switch (event.key) {
          case 'Escape':
            if (!this.isNode(this.keyManager.activeItem!.node)) {
              // Cancel the option/form node
              this.onRemoveAddOptions();
            }
            // Remove focus
            this.keyManager.setActiveItem(-1);
          break;
          case 'Backspace':
            console.log('Backspace');
            if (this.isNode(this.keyManager.activeItem!.node)) {
              this.onRemoveItem(currentIndex)
              setTimeout(() => {
                this.keyManager.setPreviousItemActive();
              }, 300);
            }
          break;
          case 'ArrowUp':
            console.log('Up');
            if (!this.isNode(this.keyManager.activeItem!.node)) {
              // Cancel the option/form node
              this.onRemoveAddOptions();
            }
            if (currentIndex) {
              this.keyManager.setActiveItem(currentIndex - 1);
            }
          break;
          case 'ArrowDown':
            console.log('Down', currentIndex, this.items.length);
            if (!this.isNode(this.keyManager.activeItem!.node)) {
              // Cancel the option/form node
              this.onRemoveAddOptions();
            }
            // Identify where to focus next
            if (currentIndex < this.items.length - 1) { 
              this.keyManager.setActiveItem(currentIndex + 1);
            }
          break;
          case 'Enter':
            const currentNode = this.keyManager.activeItem!.node;
            if (this.isNode(currentNode)) {
              if (currentNode.type === 'folder') {
                // Show option element, then focus
                this.onShowAddOptions(currentIndex, currentNode);
              }
            } else if (this.isOption(currentNode)) {
              // Show add form based on button selected (file / folder)
            } else if (this.isForm(currentNode)) {
              // Validate form if okay
            }
            // console.log('Enter', this.keyManager.activeItem);
            // this.onShowAddOptions(this.keyManager.activeItem!.node);0
          break;
        }
      }
    }
  }

  // Checks if the current node is a legit node (not a form/option element)
  isNode (node: FileTreeNode) {
    return node.type !== '' && node.name !== ''
  }

  // Checks if the current node is a form
  isForm (node: FileTreeNode) {
    return node.type !== '' && node.name === ''
  }

  // Checks if the current node is an option
  isOption (node: FileTreeNode) {
    return node.type === '' && node.name === ''
  }

  // Generate Random ID
  generateRandomID () {
    const length = 6;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Action
  findIndexBeforeAction (action: 'add' | 'remove', node: FileTreeNode) {
    const index = this.treeData.findIndex(data => data.id === node.id)
    if (index !== -1) {
      if (action === 'add') this.onShowAddOptions(index, node);
      else if (action === 'remove') this.onRemoveItem(index);
    }
  }

  // This is a workaround for CDK Tree component that is not reflecting updates
  refreshTreeData () {
    this.selectedIndex = this.keyManager.activeItemIndex === null ? -1 : this.keyManager.activeItemIndex
    this.dataSource = new ArrayDataSource([]);
    setTimeout(() => {
      this.dataSource = new ArrayDataSource(this.treeData);
      // Set focus to last item
      // this.keyManager.setActiveItem(this.selectedIndex);
      console.log('Selected Node', this.selectedIndex, this.items.length, this.treeData.length)
    }, 300);
  }

  // Shows the "file" and "folder" buttons of a particular (selected) node
  onShowAddOptions (index = -1, node?: FileTreeNode) {
    const data: FileTreeNode = {
      id: this.generateRandomID(),
      name: '',
      type: '',
      expandable: true,
      isExpanded: true,
      level: 0
    }
    console.log(index, node);
    if (index > -1 && node) {
      data.level = node!.level + 1;
      // Additional checks
      // append after the last child of the node
      this.treeData.splice(index + 1, 0, data);
    } else {
      // Root level adding
      this.treeData.push(data);
    }
    this.refreshTreeData();
  }

  onRemoveAddOptions () {
    const optionIndex = this.treeData.findIndex(node => node.type === '' && node.name === '')
    console.log('Remove this node', optionIndex);
    this.treeData.splice(optionIndex, 1);
    this.refreshTreeData();
  }

  // Remove items from the tree
  onRemoveItem (index: number) {
    // Remove the item
    this.treeData.splice(index, 1);

    // Apply updated treeData as new CDK Tree data source
    this.refreshTreeData();
  }


  // ALL TO BE UPDATED

  // Add items to the tree
  onAddItem (event: { node: FileTreeNode, parentId?: string }) {
    const { node, parentId } = event
    if (parentId) {
      this.treeData = this.treeData.map((child: FileTreeNode) => {
        console.log('Adding to Tree root', parentId, child.id);
        // if (parentId === child.id) {
        //   console.log('Add now', node, parentId, child.id, child);
        //   child.children.push(node)
        // } else {
        //   child.children = this.addToTree(child.children, node, parentId);
        // }
        return child;
      })
    } else {
      this.treeData.push(node);
    }
    console.log('new Tree data', this.treeData)
    // this.dataSource = new ArrayDataSource(this.treeData);
    this.refreshTreeData();
  }

  // Recursive function to dive deep into the children array and add a new object
  addToTree (items: FileTreeNode[], toAdd: FileTreeNode, parentId: string): FileTreeNode[] {
    // console.log('Adding to Tree', items, toAdd, parentId);
    return items.map((child: FileTreeNode) => {
      console.log('Adding to Tree', parentId, child.id);
      // if (child.id === parentId) {
      //   child.children.push(toAdd);
      // } else {
      //   child.children = this.addToTree(child.children, toAdd, parentId);
      // }
      return child;
    })
  }
}
