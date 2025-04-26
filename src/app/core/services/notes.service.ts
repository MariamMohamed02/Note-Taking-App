import { NoteData } from './../interfaces/note-data';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }
  private readonly httpClient=inject(HttpClient)
  handleAddNotes(newNote: NoteData):Observable<any>{
    return this.httpClient.post(environment.notesUrl+'notes',newNote,{
      headers:{token:localStorage.getItem('token')||''}
    })
  }


  getUserNotes():Observable<any>{
    return this.httpClient.get(environment.notesUrl+'notes',{
      headers:{token:localStorage.getItem('token')||''}

    })
  }

  handleDeleteNote(noteId:string):Observable<any>{
    console.log(noteId)
    return this.httpClient.delete(environment.notesUrl+'notes/'+ noteId,{
      headers:{token:localStorage.getItem('token')||''}
    })

  }

  handleUpdateNote(noteData:NoteData, nodeId:string):Observable<any>{
    return this.httpClient.put(environment.notesUrl+'notes/'+nodeId,noteData,{
      headers:{token:localStorage.getItem('token')||''
    }
    })
  }

}
