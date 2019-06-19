import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../../models/message';
import { ChatService } from '../../services/chat.service.spec';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {

  public chat: any;

  public msg: string;
  public messages = [];
  public room: any;

  constructor(
    private nav: NavParams,
    private router: Router,
    private modal: ModalController,
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService
    ) { }

  ngOnInit() {
    this.chatService.getChatRoom(this.chat.id).subscribe( room => {
      this.room = room;
    });
    this.chat = this.nav.get('chat');
  }

  closeRoom() {
    this.modal.dismiss();
  }

  onSendMsg() {
    const msgTmp: Message = {
      content: this.msg,
      type: 'text',
      date: new Date()
    };
    this.chatService.sendMsgToFirebase(msgTmp, this.chat.id);
    this.msg = '';
  }
}
