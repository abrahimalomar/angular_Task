import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn, NzTableModule } from 'ng-zorro-antd/table';
import { Tag } from './modal/Tags/Tags';
import { TagService } from './service/tag.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { LoadingService } from './service/loading.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NzTableModule,NzPaginationModule,CommonModule,
    NzSelectModule,FormsModule,NzSpinModule,
  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'angularTask';
  constructor(public loadingService: LoadingService) {}

  
}

//   tags: Tag[] = [];
//   title = 'angularTask';
//   
//   currentPage: number = 1; // الصفحة الحالية
//   pageSize: number = 4;   // عدد العناصر في كل صفحة
//   totalItems: number = 0;  // إجمالي العناصر المتاحة (يتم الحصول عليها من API)

//   listOfColumns: ColumnItem[] = [
//     {
//       name: 'Id',
//       sortOrder: null,
//       sortFn: (a: DataItem, b: DataItem) => a.Id - b.Id,
//       listOfFilter: [],
//       filterFn: null
//     },
//     {
//       name: 'Name',
//       sortOrder: null,
//       sortFn: (a: DataItem, b: DataItem) => a.Name.localeCompare(b.Name),
//       listOfFilter: [],
//       filterFn: null
//     },
//     {
//       name: 'ObjectType',
//       sortOrder: null,
//       sortFn: (a: DataItem, b: DataItem) => a.ObjectType - b.ObjectType,
//       listOfFilter: [],
//       filterFn: null
//     }
//   ];

//   listOfData: DataItem[] = [];

//   constructor(private tagsS: TagService) {}

//   ngOnInit(): void {
//     this.fetchData(); // استدعاء بيانات الصفحة الأولى عند التحميل
//   }

//   // الدالة التي تجلب البيانات بناءً على الصفحة الحالية والحجم
//   fetchData(): void {
//     const skip = (this.currentPage - 1) * this.pageSize;
//     const top = this.pageSize;

//     this.tagsS.getAllTags(skip, top).subscribe({
//       next: (response) => {
//         this.listOfData = response.value.map(tag => ({
//           Id: tag.Id,
//           Name: tag.Name,
//           ObjectType: tag.ObjectType
//         }));
//         this.totalItems = response['@odata.count']; // الحصول على إجمالي العناصر من الاستجابة
//       },
//       error: (error) => {
//         console.log('Error:', error);
//       }
//     });
//   }

//   // تحديث الصفحة الحالية عند تغيير الصفحة واستدعاء البيانات
//   onPageChange(page: number): void {
//     this.currentPage = page;
//     this.fetchData();
//   }
// }

// interface DataItem {
//   Id: number;
//   Name: string;
//   ObjectType: number;
// }

// interface ColumnItem {
//   name: string;
//   sortOrder: 'ascend' | 'descend' | null;
//   sortFn: ((a: DataItem, b: DataItem) => number) | null;
//   listOfFilter: { text: string; value: any }[];
//   filterFn: ((list: string[], item: DataItem) => boolean) | null;
// }