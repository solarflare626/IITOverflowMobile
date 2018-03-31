import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { Http } from 'angular/http';


@Component({
  selector: 'page-question',
  templateUrl: 'question.html'
})
export class QuestionPage {
	
  title: String;
  question: String;
  categories: any;
  tags: any;
  poster: any;
  dateposted: any;
  questionForm: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
  	this.questionForm = formBuilder.group({
      title: [''],
      question: ['']
    });
  }

  submit() {
    this.navCtrl.pop();
  }

}
