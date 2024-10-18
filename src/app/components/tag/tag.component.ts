import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
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

// Data storage
listOfData: DataItem[] = [];
filteredData: DataItem[] = [];

// Subscription to API calls
tagsSubscription!: Subscription;

// Column configuration with sorting and filtering
listOfColumns: ColumnItem[] = [
  { name: 'Id', checked: true, sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.Id - b.Id, listOfFilter: [], filterFn: (filter: any, item: DataItem) => filter.includes(item.Id) },
  { name: 'Name', checked: true, sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.Name.localeCompare(b.Name), listOfFilter: [], filterFn: (filter: any, item: DataItem) => filter.includes(item.Name) },
  { name: 'ObjectType', checked: true, sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.ObjectType - b.ObjectType, listOfFilter: [], filterFn: (filter: any, item: DataItem) => filter.includes(item.ObjectType) }
];
  // listOfColumns: ColumnItem[] = [
  //   { name: 'Id', sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.Id - b.Id, listOfFilter: [], filterFn: (filter, item) => true  },
  //   { name: 'Name', sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.Name.localeCompare(b.Name), listOfFilter: [], filterFn: null },
  //   { name: 'ObjectType', sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.ObjectType - b.ObjectType, listOfFilter: [], filterFn: null }
  // ];

// Front-end filter options
idOptions: number[] = [];
nameOptions: string[] = [];
objectTypeOptions: number[] = [];

// Front-end filter selections
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

// Fetch data from API with selected columns
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
        this.setFilterOptions(); // Set options for front-end filters
        this.applyFilter(); // Apply front-end filtering
      },
      error: (error) => {
        console.error('Error fetching tags:', error);
      }
    });
}

// Apply filtering from the column header filters
applyHeaderFilter(filter: any[], column: ColumnItem): void {
  column.listOfFilter = filter; // تحديث فلاتر العمود

  this.filteredData = this.listOfData.filter(item => {
    // تحقق مما إذا كانت filterFn موجودة
    if (column.filterFn) {
      return (
        column.filterFn(filter, item) &&
        (this.selectedId ? item.Id === this.selectedId : true) &&
        (this.selectedName ? item.Name === this.selectedName : true) &&
        (this.selectedObjectType ? item.ObjectType === this.selectedObjectType : true)
      );
    }
    // إذا كانت filterFn null، قم بإرجاع true أو أي منطق مناسب آخر
    return true; // يمكن تعديل هذا بناءً على منطق تطبيقك
  });
  this.applySort(column)
}

applySort(column: ColumnItem): void {
  // التحقق إذا كان sortFn موجودًا وغير null
  if (column.sortFn) {
    if (column.sortOrder === 'ascend') {
      this.filteredData.sort(column.sortFn);
    } else if (column.sortOrder === 'descend') {
      this.filteredData.sort((a, b) => column.sortFn(b, a)); // عكس الترتيب
    }
  }
}
onSortChange(column: ColumnItem): void {
  column.sortOrder = column.sortOrder === 'ascend' ? 'descend' : 'ascend'; // تغيير حالة الترتيب
  this.applySort(column); // تطبيق الترتيب الجديد
}
// Front-end filtering logic
applyFilter(): void {
  this.filteredData = this.listOfData.filter(item =>
    (this.selectedId ? item.Id === this.selectedId : true) &&
    (this.selectedName ? item.Name === this.selectedName : true) &&
    (this.selectedObjectType ? item.ObjectType === this.selectedObjectType : true)
  );
}

// Set filter options for front-end filters
setFilterOptions(): void {
  this.idOptions = Array.from(new Set(this.listOfData.map(data => data.Id)));
  this.nameOptions = Array.from(new Set(this.listOfData.map(data => data.Name)));
  this.objectTypeOptions = Array.from(new Set(this.listOfData.map(data => data.ObjectType)));
}

// Trigger column visibility and re-fetch data
onColumnSelectionChange(): void {
  this.getAll(); // Update data based on selected columns
}

// Pagination handler
onPageChange(page: number): void {
  this.currentPage = page;
  this.getAll();
}

// Reset filters and re-fetch all columns
resetFilters(): void {
  this.selectedId = undefined;
  this.selectedName = undefined;
  this.selectedObjectType = undefined;
  this.listOfColumns.forEach(col => (col.checked = true)); // Reset all columns to checked
  this.getAll(); // Re-fetch data
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

// Define the data structure
interface DataItem {
Id: number;
Name: string;
ObjectType: number;
}
interface ColumnItem {
  name: string;
  checked: boolean;
  sortOrder: 'ascend' | 'descend' | null;
  sortFn: ((a: DataItem, b: DataItem) => number);
  listOfFilter: any[];
  filterFn: ((filter: any[], item: DataItem) => boolean) | null; 
 
}



// interface ColumnItem {
// name: string;
// checked: boolean;
// sortOrder: 'ascend' | 'descend' | null;
// sortFn: ((a: DataItem, b: DataItem) => number) | null;
// listOfFilter: any[];
// filterFn: (filter: any[], item: DataItem) => boolean;
// }


















// selectedColumns: string[] = ['Id', 'Name', 'ObjectType'];
// tagsSubscription!: Subscription
// // pgnation
// currentPage: number = 1;
// pageSize: number = 4;
// totalItems: number = 0;

// //filter
// listOfData: DataItem[] = [];
// filteredData: DataItem[] = [];


// idOptions: number[] = [];
// nameOptions: string[] = [];
// objectTypeOptions: number[] = [];


// selectedId?: number;
// selectedName?: string;
// selectedObjectType?: number;

// listOfColumns: ColumnItem[] = [
//   { name: 'Id', sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.Id - b.Id, listOfFilter: [], filterFn: null },
//   { name: 'Name', sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.Name.localeCompare(b.Name), listOfFilter: [], filterFn: null },
//   { name: 'ObjectType', sortOrder: null, sortFn: (a: DataItem, b: DataItem) => a.ObjectType - b.ObjectType, listOfFilter: [], filterFn: null }
// ];



// constructor(private tagService: TagService,
//   private modal: NzModalService,
//   private message: NzMessageService
// ) {}

// ngOnInit(): void {
//   this.getAll(); 
// }


// getAll(): void {
//   const skip = (this.currentPage - 1) * this.pageSize;
//   const top = this.pageSize;

//  this.tagsSubscription= this.tagService.getAllTags(skip, top,this.selectedColumns).subscribe({
//     next: (response) => {
//       this.listOfData = response.value.map(tag => ({
//         Id: tag.Id,
//         Name: tag.Name,
//         ObjectType: tag.ObjectType
//       }));
//       this.totalItems = response['@odata.count'];
//       this.filteredData = [...this.listOfData];
//       this.setFilterOptions();
//     },
//     error: (error) => {
//       console.log('Error:', error);
//     }
//   });
// }


// setFilterOptions(): void {
//   this.idOptions = Array.from(new Set(this.listOfData.map(data => data.Id)));
//   this.nameOptions = Array.from(new Set(this.listOfData.map(data => data.Name)));
//   this.objectTypeOptions = Array.from(new Set(this.listOfData.map(data => data.ObjectType)));
// }


// applyFilter(): void {
//   this.filteredData = this.listOfData.filter(item => 
//     (this.selectedId ? item.Id === this.selectedId : true) &&
//     (this.selectedName ? item.Name === this.selectedName : true) &&
//     (this.selectedObjectType ? item.ObjectType === this.selectedObjectType : true)
//   );
// }


//   resetFilters(): void {
//     this.selectedId = undefined;
//     this.selectedName = undefined;
//     this.selectedObjectType = undefined;
//     this.selectedColumns = ['Id', 'Name', 'ObjectType'];
//     this.applyFilter();
//   }

// onPageChange(page: number): void {
//   this.currentPage = page;
//   this.getAll();
// }

// confirmDelete(tagId: number, tagName: string): void {
//   this.modal.confirm({
//     nzTitle: 'Are you sure you want to delete this tag?',
//     nzContent: `<b style="color: red;">This action cannot be undone for tag: ${tagName}!</b>`,
//     nzOkText: 'Yes',
//     nzOkType: 'primary',
//     nzOnOk: () => this.deleteTag(tagId),
//     nzCancelText: 'No'
//   });
// }

// deleteTag(tagId: number): void {
//   this.tagService.delete(tagId).subscribe({
//     next: () => {
//       this.getAll();
     
//       this.message.success('deleted')
//     },
//     error: (error) => {
//       console.error('Error deleting tag:', error);
//       this.message.error('Error deleting tag')
//     }
//   });
// }
// ngOnDestroy() {
//   if (this.tagsSubscription) {
//     this.tagsSubscription.unsubscribe();
//   }
// }




// }

// interface DataItem {
// Id: number;
// Name: string;
// ObjectType: number;
// }

// interface ColumnItem {
// name: string;
// sortOrder: 'ascend' | 'descend' | null;
// sortFn: ((a: DataItem, b: DataItem) => number) | null;
// listOfFilter: { text: string; value: any }[];
// filterFn: ((list: string[], item: DataItem) => boolean) | null;

// }

