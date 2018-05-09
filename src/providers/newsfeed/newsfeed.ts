import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBALS } from '../../models/globals';
//import { stringify } from '@angular/compiler/src/util';
@Injectable()
export class NewsfeedProvider {
  posts: any;
  tags: any;
  questions: any;
  categories: any;
  globals = new GLOBALS();

  constructor(public http: Http) {
    this.questions = [];
    this.categories = [];
    this.tags = [];
  }
  //////////////////////////////////////////////////////////////// -> get functions
  listQuestions() {
    return this.http
      .get(
        this.globals.baseUrl + 
          '/api/Questions?filter={"include":[{"relation":"answers","scope":{"include":"user"}},{"relation":"category"},{"relation":"user"}], "order":  "updatedAt DESC " }'
          //'/api/Questions?filter[include]=category&filter[include]=user'
      )
      .map(res => res.json());
  }

  getSpecificQuestionAnswers(question_id) {
    return this.http
      .get(
        this.globals.baseUrl + 
          '/api/Answers/?filter={"include":[{"relation":"user"},{"relation":"comments","scope":{"include":"user"}}],"where":{"questionId":'+question_id+'}}'
      )
      .map(res => res.json());
  } 
/*
  listAnswers(question) {
      return this.http
      .get(this.globals.baseUrl + 
        '/api/Answers?filter[include]=user&filter[where][questionId]='+question.id)
      .map(res => res.json());
  }*/

  listCategories() {
    return this.http
      .get(this.globals.baseUrl + "/api/Categories")
      .map(res => res.json());
  }

  filterTags(searchTerm) {
    return this.tags.filter(tags => {
      return tags.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
 
  //////////////////////////////////////////////////////////////// -> follow/unfollow functions
  followStatus(user_id, question_id) {
    return this.http
    .head(this.globals.baseUrl+
      '/api/Questions/'+
      question_id+
      '/follows/rel/'+
      user_id);
  }

  followQuestion(user_id, question_id, post) {
    console.log("ME FOLLOW QUESTION");
    let data = JSON.parse(post);
    this.http.put(this.globals.baseUrl+'/api/Questions/'+question_id+'/follows/rel/'+user_id, {}).subscribe(data=>{
      console.log(data);
    });
  }

  unfollowQuestion(user_id, question_id) {
    console.log("ME UNFOLLOW QUESTION");
    this.http.delete(this.globals.baseUrl + "/api/Questions/" + question_id + "/follows/rel/" + user_id).subscribe(data=> {
      console.log(data);
    });
  }
  //////////////////////////////////////////////////////////////// -> post/edit/delete questions functions

  getQuestion(id){
    return this.http
      .get(
        this.globals.baseUrl + 
          '/api/Questions/' + id+ '/?filter={"include":[{"relation":"answers","scope":{"include":"user"}},{"relation":"category"},{"relation":"user"}]}'
          //'/api/Questions?filter[include]=category&filter[include]=user'
      )
      .map(res2 => res2.json());
  }
  postQuestion(post) { 
    return this.http.post(this.globals.baseUrl + "/api/Questions", JSON.parse(post)).map(res=>res.json());
  }

  
  //////////////////////////////////////////////////////////////// -> post/edit/delete answers functions
 
 postAnswer(post) {
    return this.http.post(this.globals.baseUrl + "/api/Answers", JSON.stringify(post));
  }
  postComment(post) {
    return this.http.post(this.globals.baseUrl + "/api/Comments", JSON.stringify(post));
  }
  deleteComment(comment_id) {
    return this.http.delete(this.globals.baseUrl+'/api/Answers/'+comment_id);
    }
  deleteAnswer(answer_id) {
    return this.http.delete(this.globals.baseUrl+'/api/Answers/'+answer_id);
  }
}