import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service.spec';
import { ChatService, Chat } from '../services/chat.service.spec';
import { ModalController } from '@ionic/angular';
import { RoomComponent } from '../components/room/room.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public chatRooms: any = [];
  constructor(
    private auth: AuthService,
    private chatService: ChatService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.chatService.getChatRooms().subscribe( chats => {
      chats.map( chat => {
        this.chatRooms = chats;
      });
    });
  }

  onClickChat(chat) {
    this.modal.create( {
      component: RoomComponent,
      componentProps: {
        name: chat.name
      }
    }).then( (modal) => modal.present());
  }

  onLogout() {
    this.auth.logout();
  }
}
