import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { strict } from 'assert';
import { type } from 'os';
import { title } from 'process';
import { Observable } from 'rxjs';

import { Task } from '../tasklist/task';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  async createDoc(newTask: Task) {
    let updatedTask = {"title": newTask["title"], "status" : newTask["status"], "tipo": newTask["tipo"]}
    return await this.firestore.collection('Tasks').add(updatedTask);
  }

   async getCollection() {
    return await this.firestore.collection('Tasks').snapshotChanges();
  } 

  async deleteDoc(id: string) {
    return await this.firestore.collection('Tasks').doc(id).delete();
  }

  async updateDoc(task: Task) {
    let updatedTask = {"title": task["title"], "status" : task["status"], "tipo": task["tipo"]}
    return await this.firestore.collection('Tasks').doc(task["id"]).update(updatedTask);
  }

}