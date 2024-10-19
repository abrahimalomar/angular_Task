import { Component, OnInit } from '@angular/core';
import { AppstoreOutline, SearchOutline, PlusSquareOutline, MinusSquareOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { CategoryService } from '../../service/category.service';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { Category } from '../../modal/Category/category';

@Component({
  selector: 'app-categorys',
  standalone: true,
  imports: [
    FormsModule,
    NzTreeModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzGridModule,
    AddCategoryComponent
  ],
  templateUrl: './categorys.component.html',
  styleUrl: './categorys.component.css'
})
export class CategorysComponent implements OnInit {
  showAddCategory: boolean = false;
  
  nodes: any[] = [];
  searchValue = '';

  constructor(private categoryService: CategoryService,
    private iconService: NzIconService
  ) { 
    this.iconService.addIcon(AppstoreOutline, SearchOutline, PlusSquareOutline, MinusSquareOutline);
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.categoryService.getCategories().subscribe({
      next:(response:Category[])=>{      
        this.nodes=this.buildTree(response);
      },
      error:(error)=>{
        console.log('errors');
        
      }
    })
  }

  buildTree(categories: Category[]): any[] {
    const map = new Map<number, any>();
    categories.forEach((category) => {
      map.set(category.Id, {
        title: category.Name,
        key: category.Id,
        children: []
      });
    });

    const tree: any[] = [];

    categories.forEach((category) => {
      const node = map.get(category.Id);
      if (category.ParentId === null) {
        tree.push(node);
      } else {
        const parentNode = map.get(category.ParentId);
        if (parentNode) {
          parentNode.children.push(node);
        }
      }
    });

    return tree;
  }

  toggleAddCategory(): void {
    this.showAddCategory = !this.showAddCategory; 
  }
}
