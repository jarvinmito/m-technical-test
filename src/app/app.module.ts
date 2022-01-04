import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CdkTreeModule } from '@angular/cdk/tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NestComponent } from './nest/nest.component';
import { ListComponent } from './list/list.component';
import { AddFormComponent } from './file-tree/components/add-form/add-form.component';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FocusKeyManager, ListKeyManagerOption } from '@angular/cdk/a11y';
import { FileTreeItemComponent } from './file-tree/components/file-tree-item/file-tree-item.component';
import { AddOptionsComponent } from './file-tree/components/add-options/add-options.component';
import { OptionComponent } from './file-tree/components/option/option.component';

@NgModule({
  declarations: [
    AppComponent,
    NestComponent,
    ListComponent,
    AddFormComponent,
    FileTreeComponent,
    FileTreeItemComponent,
    AddOptionsComponent,
    OptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CdkTreeModule
  ],
  providers: [
    FocusKeyManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
