import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CdkTreeModule } from '@angular/cdk/tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NestComponent } from './nest/nest.component';
import { ListComponent } from './list/list.component';
import { AddFormComponent } from './add-form/add-form.component';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FocusKeyManager, ListKeyManagerOption } from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    AppComponent,
    NestComponent,
    ListComponent,
    AddFormComponent,
    FileTreeComponent
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
