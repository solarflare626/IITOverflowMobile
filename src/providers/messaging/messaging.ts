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