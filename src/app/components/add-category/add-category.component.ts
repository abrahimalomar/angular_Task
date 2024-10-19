import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppstoreOutline, PlusSquareOutline, MinusSquareOutline, SearchOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import {  CategoryService } from '../../service/category.service';
import { Category } from '../../modal/Category/category';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    NzStepsModule,
    NzButtonModule,
    NzIconModule,
    CommonModule,
    NzSelectModule,
    NzGridModule,
    NzFormModule,
    NzCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnInit {
  addCategory() {
    console.log('data', this.addCategoryForm.value);

  }
  clonedCategories: any[] = [];
  current = 0;
  index = 'Information';
  addCategoryForm!: FormGroup;
  isLoading!: boolean;
  options = [
    { label: 'option1', value: 'option1' },
    { label: 'option2', value: 'option2' },
    { label: 'option3', value: 'option3' },
    { label: 'option4', value: 'option4' }
  ];

  constructor(
    private iconService: NzIconService,
    private fb: FormBuilder,
    private categoryService: CategoryService) {

    this.iconService.addIcon(AppstoreOutline, PlusOutline, PlusSquareOutline, MinusSquareOutline, SearchOutline);
  }
  ngOnInit(): void {
    this.initFormAdd()
  }
  initFormAdd() {
    this.addCategoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      clonedCategories: [[], Validators.required]
    });
  }
  getAll() {
    this.categoryService.getCategories().subscribe({
      next: (response: Category[]) => {
        this.clonedCategories = response.map(c => c.ClonedCategories)
        console.log('clonedCategories : ', this.clonedCategories);

      },
      error: (error) => {
        console.log('errors');

      }
    })
  }



  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'Information';
        break;
      }
      case 1: {
        this.index = 'Translations';
        break;
      }
      case 2: {
        this.index = 'Attributes';
        break;
      }
      case 3: {
        this.index = 'Related Products';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  get isCategoryNameInvalidAndTouched(): boolean | undefined {
    const objectTypeControl = this.addCategoryForm.get('categoryName');
    return (objectTypeControl?.invalid && objectTypeControl?.touched);
  }
  get isClonedCategorieInvalidAndTouched(): boolean | undefined {
    const objectTypeControl = this.addCategoryForm.get('clonedCategories');
    return (objectTypeControl?.invalid && objectTypeControl?.touched);
  }
}
