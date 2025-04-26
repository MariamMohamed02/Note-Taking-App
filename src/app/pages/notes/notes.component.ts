import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { NotesService } from '../../core/services/notes.service';
import { NoteData } from '../../core/interfaces/note-data';
import Swal from 'sweetalert2'
import { title } from 'process';
import { SearchPipe } from '../../core/pipes/search.pipe';
@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NgStyle, SideNavComponent,SearchPipe,FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  private readonly notesService=inject (NotesService)
  allNotes:NoteData[]=[]
  searchInput:string=''

ngOnInit(): void {
  this.notesService.getUserNotes().subscribe({
    next:(res)=>{
        this.allNotes=res.notes
    },
    error:(err)=>{

    }
  })
}

  openDialog(noteData?:NoteData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height:'300px',
      width:"500px",
      data:{title:noteData?.title,content:noteData?.content,_id:noteData?._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();

    });
  }

  deleteNote(deleteNote: string, noteIndex: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(() => {
          this.notesService.handleDeleteNote(deleteNote).subscribe({
            next: (res) => {
              this.allNotes.splice(noteIndex,1)
              this.ngOnInit()
            },
            error: (err) => {
              console.log(err)
            }
          });
        });
      }
    });
  }

  updateData(noteData:NoteData,noteIndex:number){
    this.openDialog({title:noteData.title, content:noteData.content, _id:noteData._id})
  }





}
