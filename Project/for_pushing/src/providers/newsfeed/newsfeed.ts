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
            },
            {
                'poster': 'Jiguuuu456',
                'title': 'A 1.8 kg mass is attached to a spring with a force constant of 51 N/m. If the mass is released with a speed of 0.27 m/s at a distance of 8.4 cm from the equilibrium position of the spring, what is its speed when it is halfway to the equilibrium position? vf = ? m/s',
                'dateposted': '03-28-18',
                'votes': 87,
                'categories': ['Physics'],
                'tags': ['Spring', 'Equilibrium', 'Velocity']
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