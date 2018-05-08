import { Injectable } from '@angular/core';

import { Album } from './album.model';
// import { ALBUMS } from './mock-albums';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AlbumService {
  albums: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.albums = database.list('albums');
   }

  getAlbums(){
    return this.albums;
  }

  getAlbumById(albumId: string){
    return this.database.object('albums/' + albumId);
  }

  addAlbum(newAlbum){
    this.albums.push(newAlbum);
  }

  updateAlbum(localUpdatedAlbum){
    let albumEntryInFirebase = this.getAlbumById(localUpdatedAlbum.$key);
    albumEntryInFirebase.update({title: localUpdatedAlbum.title,
                                artist: localUpdatedAlbum.artist,
                                description: localUpdatedAlbum.description});
  }

  deleteAlbum(albumToDelete){
    let albumInFirebase = this.getAlbumById(albumToDelete.$key);
    albumInFirebase.remove();
  }


}
