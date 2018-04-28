import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class MessagingProvider {
 
    contacts: any;
    convos: any;
 
    constructor(public http: Http) {
 
        this.contacts = ['Sumwan U. Dunno', 'Noan I. Knoe', 'Phat A. Miebitch', 'Deekom P. Teetivs'];
        this.convos = [
        {
        	'name': 'Phillip Espina',
        	'preview': 'You: Pagtarong na dw trabaho...'
        },
        {
        	'name': 'Jigu Pacana',
        	'preview': 'You: Tsada kaayo, Call Me By...'
        }
        ];
 
    }
 
    filterContacts(searchTerm){
 
        return this.contacts.filter((contacts) => {
            return contacts.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });    
 
    }

    filterConvos(searchTerm){

    	return this.convos.filter((convos) => {
    		return convos.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    	});
    }
 
}