import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Tag } from '../../modal/Tags/Tags';
import { TagService } from '../../service/tag.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ArrowLeftOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-tag-add',
  standalone: true,
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule],
  templateUrl: './tag-add.component.html',
  styleUrl: './tag-add.component.css',
 
})
export class TagAddComponent {
  isLoading = false;
  addForm!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private tagService: TagService,
    private router: Router,
    private message: NzMessageService,
    private iconService: NzIconService
  ) {
    this.initAddForm();
    this.iconService.addIcon(ArrowLeftOutline);
  }

  initAddForm(): void {
    this.addForm = this.fb.group({
      Name: [''],

    });
  }

  addTag(): void {
    if(this.addForm.valid){
    this. isLoading = true;
    const newTag: Tag = this.addForm.value;
    this.tagService.create(newTag).subscribe({
      next: () => {
        this.router.navigate(['dashboard/tags']);
        this.message.success('adedd tag');
        this. isLoading = false;
      },
      error: (error) => {
        this.message.error('Error adding tag');
        this. isLoading = false;
      }
    });
  }else{
    this.message.error('form valid')
  }
  }
  goBack() {
    this.router.navigate(['dashboard/tags'])
    }
  get isNameInvalidAndTouched(): boolean | undefined {
    const nameControl = this.addForm.get('Name');
    return (nameControl?.invalid && nameControl?.touched);
  }
}
