import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.scss']
})
export class NewPollComponent implements OnInit {

  pollForm!:FormGroup;

  constructor(private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.pollForm = this.fb.group({
      titulo: ['', [Validators.required]],
      tienda: ['', [Validators.required, Validators.pattern('[^ ]')]],
      departamento: ['', [Validators.required, Validators.pattern('[^ ]')]],
      tiempo: ['']
    });
  }
  /* --------------------------------- Getters -------------------------------- */
  get getTitulo() { return this.pollForm.get("titulo") }
  get getTienda() { return this.pollForm.get("tienda") }
  get getDepartamento() { return this.pollForm.get("departamento") }

  newPoll = () => {
    this.router.navigate(['/crear-encuesta'], {});
  }


}
