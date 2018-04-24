 import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBALS } from '../../models/globals';
@Injectable()
export class NewsfeedProvider {
 
    posts: any;
    tags: any;
    globals = new GLOBALS();
 
    constructor(public http: Http) {
        this.tags = ['Arrays', 'Stacks', 'Queues', 'Springs', 'Python', 'C++'];
 
    }
 
    listQuestions(){
 
        this.http.get(this.globals.baseUrl+'/api/Questions').map(res => res.json()).subscribe(
            data => {
                this.posts = data;
                return this.posts;
                //console.log(this.posts);
            },
            err => {
                //console.log('Banga!');
                console.log(err);
            }
        );   
 
    }

    filterTags(searchTerm) {
        return this.tags.filter((tags) => {
            return tags.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        }); 
    }

    postQuestion(post) {
        this.http.post(this.globals.baseUrl+'/Questions', JSON.parse(post)).subscribe();
    }

 
}