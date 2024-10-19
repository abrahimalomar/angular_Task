import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PlusOutline, SearchOutline, EditOutline, ReloadOutline, DeleteOutline, FolderOpenOutline, FileOutline, AppstoreOutline, FolderOutline, PlusSquareOutline, MinusSquareOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { Category, CategoryService } from '../../service/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
   
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  schemas: [NO_ERRORS_SCHEMA]
})
export class TestComponent  {
  
  
}



