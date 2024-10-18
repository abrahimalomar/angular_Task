import { Component, OnInit } from '@angular/core';
import { TagService } from '../../service/tag.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { DataItem } from '../../modal/Tags/DataItem';
import { ColumnItem } from '../../modal/Tags/ColumnItem';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: 
  [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzPaginationModule,
    NzModalModule,
    NzSelectModule,
    NzDropDownModule,
    RouterLink,
    NzAlertModule,
    NzCheckboxModule
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
})
export class TagComponent implements OnInit {
    
currentPage: number = 1;
pageSize: number = 4;
totalItems: number = 0;

listOfData: DataItem[] = [];
filteredData: DataItem[] = [];


tagsSubscription!: Subscription;

listOfColumns: ColumnItem[] = [
  { name: 'Id', checked: true, sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.Id - b.Id,  filterFn: (filter: any, item: DataItem) => filter.includes(item.Id) },
  { name: 'Name', checked: true, sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.Name.localeCompare(b.Name),  filterFn: (filter: any, item: DataItem) => filter.includes(item.Name) },
  { name: 'ObjectType', checked: true, sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.ObjectType - b.ObjectType,filterFn: (filter: any, item: DataItem) => filter.includes(item.ObjectType) }
];


idOptions: number[] = [];
nameOptions: string[] = [];
objectTypeOptions: number[] = [];


selectedId?: number;
selectedName?: string;
selectedObjectType?: number;

constructor(
  private tagService: TagService,
  private message: NzMessageService,
  private modal: NzModalService
) {}

ngOnInit(): void {
  this.getAll(); 
}


getAll(): void {
  const selectedColumns = this.listOfColumns
    .filter(col => col.checked)
    .map(col => col.name)
    .join(',');

  const skip = (this.currentPage - 1) * this.pageSize;
  const top = this.pageSize;

  this.tagsSubscription = this.tagService
    .getAllTags(skip, top, selectedColumns)
    .subscribe({
      next: (response) => {
        this.listOfData = response.value;
        this.totalItems = response['@odata.count'];
        this.filteredData = [...this.listOfData];
        this.setFilterOptions();
        this.applyFilter(); 
      },
      error: (error) => {
        console.error('Error fetching tags:', error);
      }
    });
}


applySort(column: ColumnItem): void {
  if (column.sortFn) {
    if (column.sortOrder === 'ascend') {
      this.filteredData.sort(column.sortFn);
    } else if (column.sortOrder === 'descend') {
      this.filteredData.sort((a, b) => column.sortFn(b, a));
    }
  }
}
sortChange(column: ColumnItem): void {
  console.log('column ',column);
  
  column.sortOrder = column.sortOrder === 'ascend' ? 'descend' : 'ascend';
  this.applySort(column); 
}
// front End filter list
applyFilter(): void {
  this.filteredData = this.listOfData.filter(item =>
    (this.selectedId ? item.Id === this.selectedId : true) &&
    (this.selectedName ? item.Name === this.selectedName : true) &&
    (this.selectedObjectType ? item.ObjectType === this.selectedObjectType : true)
  );
}

setFilterOptions(): void {
  this.idOptions = Array.from(new Set(this.listOfData.map(data => data.Id)));
  this.nameOptions = Array.from(new Set(this.listOfData.map(data => data.Name)));
  this.objectTypeOptions = Array.from(new Set(this.listOfData.map(data => data.ObjectType)));
}


columnSelectChange(): void {
  this.getAll(); 
}


onPageChange(page: number): void {
  this.currentPage = page;
  this.getAll();
}


resetFilters(): void {
  this.selectedId = undefined;
  this.selectedName = undefined;
  this.selectedObjectType = undefined;
  this.listOfColumns.forEach(col => (col.checked = true)); 
  this.getAll();
}

ngOnDestroy(): void {
  if (this.tagsSubscription) {
    this.tagsSubscription.unsubscribe();
  }
}

confirmDelete(tagId: number, tagName: string): void {
  this.modal.confirm({
    nzTitle: 'Are you sure you want to delete this tag?',
    nzContent: `<b style="color: red;">This action cannot be undone for tag: ${tagName}!</b>`,
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOnOk: () => this.deleteTag(tagId),
    nzCancelText: 'No'
  });
}

deleteTag(tagId: number): void {
  this.tagService.delete(tagId).subscribe({
    next: () => {
      this.getAll();
      this.message.success('Deleted');
    },
    error: (error) => {
      console.error('Error deleting tag:', error);
      this.message.error('Error deleting tag');
    }
  });
}

}


