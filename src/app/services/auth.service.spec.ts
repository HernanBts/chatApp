import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
    ) {}

  login(email: string, password: string) {

    return new Promise((resolve, rejected) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  register(email: string, password: string, namec: string) {
    return new Promise ((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        const uidc = res.user.uid;
        this.db.collection('users').doc(uidc).set({
          name: namec,
          uid: uidc
        });
        resolve(res);
      }).catch(err => reject(err));
    });
  }

  logout() {
    this.afAuth.auth.signOut().then( auth => {
      this.router.navigate(['/login']);
    });
  }
}
