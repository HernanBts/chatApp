import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {

  public name: string;

  constructor(
    private nav: NavParams,
    private router: Router,
    private modal: ModalController,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.name = this.nav.get('name');
  }

  closeRoom() {
    this.modal.dismiss();
  }
}
