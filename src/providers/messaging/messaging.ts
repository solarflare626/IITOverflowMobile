import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GLOBALS } from '../../models/globals';
 
@Injectable()
export class MessagingProvider {
    globals = new GLOBALS();
    contacts: any;
    convos: any;
 
    constructor(public http: Http) {
        this.convos = [{"sender": "Someone", "message": "BTS@BBMAs"}];
    }

    getNewConvo(user_id,other_id){
        return this.http.get(this.globals.baseUrl+'/api/users/'+user_id+'/getconversation/'+other_id).map(res => res.json());
    }
    getConversations(user_id) {
        return this.http.get(this.globals.baseUrl+'/api/users/'+user_id+'/chatlist').map(res => res.json());
    }

    getConvo(user_id,convo){
        return this.http.get(this.globals.baseUrl+'/api/users/'+user_id+'/conversation/'+convo.split('_')[1]).map(res => res.json());

    }
    sendMessage(user_id,convo,message){
        return this.http.post(this.globals.baseUrl+'/api/users/'+user_id+'/conversation/'+convo.split('_')[1],{msg:message}).map(res => res.json());

    }

 
    filterContacts(searchTerm){
        this.http.get(this.globals.baseUrl+'/api/users').map(res => res.json()).subscribe(
            data => {
                this.contacts = data;
                return this.contacts.filter((contacts) => {
                    return contacts.displayname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                }); 
            }
        );
           
 
    }

    filterConvos(searchTerm){

    	return this.convos.filter((convos) => {
    		return convos.sender.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    	});
    }
 
}