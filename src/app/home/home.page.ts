import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service.spec';
import { ChatService, Chat } from '../services/chat.service.spec';
import { ModalController } from '@ionic/angular';
import { RoomComponent } from '../components/room/room.component';
import { AlertController } from '@ionic/angular';
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
    private modal: ModalController,
    private alert: AlertController
  ) {}

  ngOnInit() {
    this.chatService.getChatRooms().subscribe( chats => {
      this.chatRooms = chats;
    });
  }

  onClickChat(chats) {
    this.modal.create( {
      component: RoomComponent,
      componentProps: {
        chat: chats
      }
    }).then( (modal) => modal.present());
  }

  onLogout() {
    this.auth.logout();
  }

  onClose() {
    this.alert.create({
      header: 'Salir',
      message: '¿Seguro que desea cerrar sesion?',
      buttons: [{
        text: 'No',
        role: 'cancel'
      }, {
        text: 'Si',
        handler: () => {
          this.onLogout();
        }
      }
    ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
