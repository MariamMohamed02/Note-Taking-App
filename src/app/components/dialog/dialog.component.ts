import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { title } from 'process';
import { NotesService } from '../../core/services/notes.service';
import { NotesComponent } from '../../pages/notes/notes.component';
import { NoteData } from '../../core/interfaces/note-data';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoteData,
  ) {}



  private readonly notesService=inject(NotesService)

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  // display the title and content in case of update
  noteForm:FormGroup=new FormGroup({
    title:new FormControl(this.data.title? this.data.title:''),
    content:new FormControl(this.data.content? this.data.content:''),

  })

  noteSubmit(form:FormGroup):void{
    if(!this.data.title && !this.data.content){
      this.addNote(form.value)
    }else{
      this.updateNote(form.value)

    }
  }

  addNote(newNote:NoteData):void{
    this.notesService.handleAddNotes(newNote).subscribe({
      next:(res)=>{
        this.dialogRef.close();
      },
      error:(err)=>{

      }
    })
  }


  updateNote(updateNote:NoteData):void{
      this.notesService.handleUpdateNote(updateNote,this.data._id).subscribe({
        next:(res)=>{
          this.dialogRef.close();
        },
        error:(err)=>{

        }
      })
  }
}
