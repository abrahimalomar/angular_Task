import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { TagService } from '../../service/tag.service';
import { Tag } from '../../modal/Tags/Tags';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [    
    FormsModule,
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzPaginationModule,
    NzModalModule,
    NzSelectModule,
    FormsModule, // Required for ngModel
    NzDropDownModule, // Add Dropdown Module
    NzMenuModule, // Add Menu Module
    NzCheckboxModule, // Add Checkbox Module
    NzIconModule, // Add Icon Module for icons
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  items = [
    { label: 'Option 1', value: 'option1', checked: false },
    { label: 'Option 2', value: 'option2', checked: false },
    { label: 'Option 3', value: 'option3', checked: false },
  ];

  selectedItems() {
    return this.items.filter(item => item.checked).map(item => item.label);
  }
  data: any[] = [
    { id: 1, name: 'Ibrahim alomar', age: 30, address: 'azaz' },
    { id: 2, name: 'khaled', age: 25, address: 'Idble' },
    { id: 4, name: 'ali Ahmed', age: 27, address: 'azaz', position: 'Designer', salary: 4800 },
    { id: 5, name: 'Omar Khaled', age: 35, address: 'Idble', position: 'Manager', salary: 8000 },
    { id: 6, name: 'Ali Alomar', age: 32, address: 'azaz', position: 'Analyst', salary: 7000 },
    { id: 7, name: 'Omar Ibrahim', age: 29, address: 'Idble', position: 'Developer', salary: 6500 },
    { id: 8, name: 'Youssef', age: 26, address: 'azaz', position: 'Designer', salary: 4800 },
    { id: 9, name: 'Khaled', age: 31, address: 'Idble', position: 'Manager', salary: 7500 },
    { id: 10, name: 'Farsi Alomar', age: 33, address: 'Idble', position: 'HR', salary: 7000 },
    { id: 11, name: 'Zaid Ali', age: 30, address: 'Idble', position: 'Developer', salary: 6200 },
    { id: 12, name: 'Zaid', age: 36, address: 'azaz', position: 'Engineer', salary: 7200 },
    { id: 13, name: 'Zaki', age: 27, address: 'Idble', position: 'Designer', salary: 5400 },
    { id: 14, name: 'Rami', age: 28, address: 'azaz', position: 'Analyst', salary: 6900 },
    { id: 15, name: 'Nora Alomar', age: 24, address: 'Idble', position: 'Intern', salary: 3000 },
  
   
  ];
tags:Tag[]=[]
  currentPage: number = 1;
  pageSize: number = 5;
  total: number = 0;
  editingEntry: any | null = null;

  constructor(private modal: NzModalService,private tagService: TagService) {}
  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    // const skip = (this.currentPage - 1) * this.pageSize;
    // console.log(`Fetching data for page: ${this.currentPage}, skip: ${skip}, pageSize: ${this.pageSize}`);
    
    // this.tagService.getAllTags(0,2).subscribe({
    //   next: (response) => {
    //     this.tags = response.value;
    //     this.total = response['@odata.count'];
     
    //     console.log(`Total records: ${this.total}, Fetched tags: ${this.tags.length}`);
    //   },
    //   error: (error) => {
    //     console.log('Error fetching data:', error);
    //   }
    // });
  }

  onPageChange(page: number): void {
    console.log(`Page changed to: ${page}`);
    this.currentPage = page;
    this.getAll();
  }
  addEntry() {
    this.editingEntry = { id: 0, name: '', age: null, address: '' };
    this.showModal();
  }
 

  editEntry(entry: any) {
    this.editingEntry = { ...entry };
    this.showModal();
  }

  deleteEntry(id: number) {
    this.data = this.data.filter(entry => entry.id !== id);
    this.total = this.data.length;
  }

  showModal() {
    this.modal.create({
      nzTitle: this.editingEntry?.id ? 'Edit Entry' : 'Add Entry',
      nzContent: this.getModalContent(),
      nzOnOk: () => this.saveEntry(),
    });
  }

  getModalContent() {
    return `
      <input nz-input placeholder="Name" [(ngModel)]="editingEntry.name" />
      <input nz-input placeholder="Age" type="number" [(ngModel)]="editingEntry.age" />
      <input nz-input placeholder="Address" [(ngModel)]="editingEntry.address" />
    `;
  }

  saveEntry() {
    if (this.editingEntry) {
      if (this.editingEntry.id) {
        const index = this.data.findIndex(entry => entry.id === this.editingEntry.id);
        if (index !== -1) {
          this.data[index] = this.editingEntry;
        }
      } else {
        this.editingEntry.id = this.data.length + 1; // Simple ID assignment
        this.data.push(this.editingEntry);
      }
      this.total = this.data.length;
      this.editingEntry = null;
    }
  }
}
