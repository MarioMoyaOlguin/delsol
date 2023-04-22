import { Injectable } from '@angular/core';
import { collectionData, doc, getDocs, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Firestore, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, collection, query } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

constructor(private firestore:Firestore, private router:Router) { }

  /* -------------------------------- Encuestas ------------------------------- */
  addPoll = (poll:any) => {
    const pollsRef = collection(this.firestore, 'encuestas');
    addDoc(pollsRef, poll);
    this.router.navigate(['/mis-encuestas'], {})
  }

  deletePoll = (pollId:any) => {
    const docRef = doc(this.firestore, 'encuestas', pollId)
    deleteDoc(docRef);
  }

  getPolls = (filter = '') => {
    const pollsRef = collection(this.firestore, 'encuestas');
    let q = query(pollsRef);
    if(filter) {
      q = query(pollsRef, where('id', '==', filter));
    }
    return collectionData(q, { idField: 'idDoc' });
  }

  async updatePollResponses (poll:any) {
    const pollsRef = collection(this.firestore, 'encuestas');
    let q = query(pollsRef, where('id', '==', poll.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'encuestas', document.id);
      await updateDoc(docRef, {...poll});
    })
  }

  /* -------------------------------- Usuarios -------------------------------- */
  addUser = (user:any) => {
    const pollsRef = collection(this.firestore, 'usuarios');
    addDoc(pollsRef, user);
    this.router.navigate(['/lista-usuarios'], {})
  }

  getUsers = (filter = '') => {
    const pollsRef = collection(this.firestore, 'usuarios');
    let q = query(pollsRef);
    if(filter) {
      q = query(pollsRef, where('id', '==', filter));
    }
    return collectionData(q, { idField: 'idDoc' });
  }

  deleteUser = (userId:any) => {
    const docRef = doc(this.firestore, 'usuarios', userId)
    deleteDoc(docRef);
  }

  async updateUser (user:any) {
    const pollsRef = collection(this.firestore, 'usuarios');
    let q = query(pollsRef, where('id', '==', user.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'usuarios', document.id);
      await updateDoc(docRef, {...user});
    })
  }

  /* --------------------------------- Tiendas -------------------------------- */
  addStore = (store:any) => {
    const pollsRef = collection(this.firestore, 'tiendas');
    addDoc(pollsRef, store);
    this.router.navigate(['/lista-tiendas'], {})
  }

  getStores = (filter = '') => {
    const pollsRef = collection(this.firestore, 'tiendas');
    let q = query(pollsRef);
    if(filter) {
      q = query(pollsRef, where('id', '==', filter));
    }
    return collectionData(q, { idField: 'idDoc' });
  }

  deleteStore = (storeId:any) => {
    const docRef = doc(this.firestore, 'tiendas', storeId)
    deleteDoc(docRef);
  }

  async updateStore (store:any) {
    const pollsRef = collection(this.firestore, 'tiendas');
    let q = query(pollsRef, where('id', '==', store.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'tiendas', document.id);
      await updateDoc(docRef, {...store});
    })
  }


}
