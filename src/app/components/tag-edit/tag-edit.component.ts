import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../../modal/Tags/Tags';
import { TagService } from '../../service/tag.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-tag-edit',
  standalone: true,
  imports: [ReactiveFormsModule,NzInputModule,NzFormModule,
    NzCardModule,CommonModule,
    NzButtonModule,
    NzTagModule],
  templateUrl: './tag-edit.component.html',
  styleUrl: './tag-edit.component.css'
})
export class TagEditComponent {

  editForm!: FormGroup;
  tagId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private tagService: TagService,
    private router: Router,
    private message: NzMessageService
    
  ) { }

  ngOnInit(): void {
    this.createEditForm();
    this.tagId = this.route.snapshot.params['id'];
    this.getTag();
    console.log('data ',this.tagId);
    
  }

  createEditForm(): void {
    this.editForm = this.fb.group({
      Id: [null],
      Name: [''],
      ObjectType: [null]
    });
  }

  getTag(): void {
    this.tagService.getTagById(this.tagId).subscribe({
      next:(response)=>{
        this.editForm.patchValue(response);
      },
      error:(error)=>{
        console.log('errors');
        
      }
    })
  }

  updateTag(): void {
    const updatedTag: Tag = this.editForm.value;
    this.tagService.update(updatedTag).subscribe({
      next: () => {
        this.message.success('updated succesfully');
        this.router.navigate(['dashboard/tags']); 
      },
      error: (error) => {
        this.message.error('Failed to update the tag plese try again');
      }
    });
  }
  goBack() {
    this.router.navigate(['dashboard/tags'])
  }
  get isNameInvalidAndTouched(): boolean | undefined {
    const nameControl = this.editForm.get('Name');
    return (nameControl?.invalid && nameControl?.touched);
  }
  get isObjectTypeInvalidAndTouched(): boolean | undefined {
    const objectTypeControl=this.editForm.get('ObjectType');
    return (objectTypeControl?.invalid && objectTypeControl?.touched);
  }
}
