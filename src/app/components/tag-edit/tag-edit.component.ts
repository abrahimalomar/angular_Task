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
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { ArrowLeftOutline, FastBackwardFill } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-tag-edit',
  standalone: true,
  imports: [ReactiveFormsModule,NzInputModule,NzFormModule,
    NzCardModule,CommonModule,
    NzButtonModule,
    NzIconModule],
  templateUrl: './tag-edit.component.html',
  styleUrl: './tag-edit.component.css'
})
export class TagEditComponent {

  editForm!: FormGroup;
  tagId!: number;
  isLoading:boolean=false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private tagService: TagService,
    private router: Router,
    private message: NzMessageService,
    private iconService: NzIconService
  ) { 
    this.iconService.addIcon(ArrowLeftOutline);
  }

  ngOnInit(): void {
    this.initEditForm();
    this.fetchTagData()
    this.getTag();
   
    
  }
  fetchTagData(): void {
    this.route.params.subscribe(params => {
      this.tagId = params['id'];
      if (!isNaN(this.tagId)) {
       //log
        this.getTag(); 
      } else {
        this.message.error('Invalid ID.');
      }
    });
  }
  initEditForm(): void {
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
        this.message.success('error get data try agin')
      }
    })
  }

  updateTag(): void {
    const updatedTag: Tag = this.editForm.value;
    this.isLoading=true;
    this.tagService.update(updatedTag).subscribe({
      next: () => {
        this.isLoading=false;
        this.message.success('updated succesfully');
        this.router.navigate(['dashboard/tags']); 
      },
      error: (error) => {
        this.isLoading=false;
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
