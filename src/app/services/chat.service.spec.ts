import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { firestore } from 'firebase';

export interface Chat {
  id: string;
  description: string;
  name: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore) {}

  getChatRooms() {
    return this.db.collection('chatRooms').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as Chat;
        data.id = a.payload.doc.id;

        return data;
      });
    }));
  }

  getChatRoom(roomId: string) {
    return this.db.collection('chatRooms').doc(roomId).valueChanges();
  }

  sendMsgToFirebase(message: Message, roomId: string) {
    this.db.collection('chatRooms').doc(roomId).update( {
      messages: firestore.FieldValue.arrayUnion(message),
    });
  }
}
