import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class NewsfeedProvider {
 
    posts: any;
 
    constructor(public http: Http) {
 
        this.posts = [
            {
                'poster': 'makoooy123',
                'title': 'Initialize variable in Java.',
                'dateposted': '03-24-18',
                'votes': 13,
                'categories': ['Computer Science'],
                'tags': ['Java', 'Variables']
            },
            {
                'poster': 'espinoy007',
                'title': 'Who killed Magellan?',
                'dateposted': '03-22-18',
                'votes': 256,
                'categories': ['History'],
                'tags': ['Spanish Colonization']
            }
        ];

        //this.http.get('').map(res => res.json()).subscribe(
        //    data => {
        //        this.posts = data.data.children;
        //        console.log(this.posts);
        //    },
        //    err => {
        //        console.log('Banga!');
        //    }
        //);
 
    }
 
    listQuestions(){
 
        return this.posts;   
 
    }
 
}