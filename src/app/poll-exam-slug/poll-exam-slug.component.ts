import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-poll-exam-slug',
  templateUrl: './poll-exam-slug.component.html',
  styleUrls: ['./poll-exam-slug.component.scss']
})
export class PollExamSlugComponent implements OnInit {

  constructor(private route:ActivatedRoute, private firestore:FirestoreService) { }

  ngOnInit(): void {
    this.getPollExamData();
  }
  ngAfterViewInit() {
    
  }
  
  dataReady:boolean = false;
  continue:boolean = false;
  pollExamData:any = {};
  appType:string = '';
  

  getPollExamData = () => {
    const type = this.route.snapshot.params['type'];
    this.appType = this.route.snapshot.params['type'];
    const id = this.route.snapshot.params['id'];

    if(type === 'encuesta') {
      this.firestore.getPolls(id).subscribe((resp:any) => {
        console.log("resp: ", resp);
        this.pollExamData = {
          title: resp[0].titulo,
          timer: resp[0].timer,
          questions: resp[0].preguntas,
          id: resp[0].id,
          tipoApp: type
        }
        console.log("this.pollExamData: ", this.pollExamData);
        this.dataReady = true;
      });
    }
    // else {
    //   this.firestore.getExams(id).subscribe((resp:any) => {
    //     console.log("resp: ", resp);
    //     this.pollExamData = {
    //       title: resp[0].titulo,
    //       timer: resp[0].timer,
    //       questions: resp[0].preguntas,
    //       id: resp[0].id,
    //       tipoApp: type
    //     }
    //     console.log("this.pollExamData: ", this.pollExamData);
    //     this.dataReady = true;
    //   });
    // }
  }

  setDataReady = () => { this.continue = true; }

  restoreWelcomeScreen = (value:boolean) => {
    this.continue = value;
  }

}
