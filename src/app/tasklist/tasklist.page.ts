import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Task } from '../tasklist/task';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {
  tasks: Array<Task> = [];

  task ={
    title:"",
    tipo:"primary",
    status:"open" 
  }


  constructor(private firestore: FirestoreService) {
    /*this.tasks = [
      {title: 'Milk', status: 'open'},
      {title: 'Eggs', status: 'open'},
      {title: 'Syrup', status: 'open'},
      {title: 'Pancake Mix', status: 'open'}
    ];*/
  }



  async getTasks() {
    this.firestore.getCollection().then(firebaseRes => {
      firebaseRes.subscribe((res) => {
        this.tasks = res.map(dato => {
          let tarea: Task = dato.payload.doc.data() as unknown as Task;
          tarea["id"] = dato.payload.doc.id;
          return tarea;
        })
      });
    });
    console.log(this.tasks); 
  }

  ngOnInit() {
    this.getTasks();
    }
    
    setColor(color: string){
      this.task["tipo"] = color;
    }

  addItem() {
    if (this.task["title"] !== '') {
      this.firestore.createDoc({ title: this.task["title"], status: this.task["status"], id: "null", tipo: this.task["tipo"]});
      this.getTasks();
    }
  }

  editarTarea(tareaEditar: Task) {
    let newTask: string|null = prompt("Edición de la tarea", String(tareaEditar.title));
    tareaEditar["title"] = newTask;
    this.firestore.updateDoc(tareaEditar);
  }

  markAsDone(slidingItem: IonItemSliding, task: Task) {
    console.log(this.tasks);

    task.status = "done";
    setTimeout(() => { slidingItem.close(); }, 1);
    this.firestore.updateDoc(task);
    console.log(this.tasks);
  }

  removeTask(slidingItem: IonItemSliding, task: Task) {
    task.status = "removed";
    let index = this.tasks.indexOf(task);
    if (index > -1) {
        //Removes the task from the array at a specific position
        this.tasks.splice(index, 1);
        this.firestore.deleteDoc(task["id"]);

    }
  }
}