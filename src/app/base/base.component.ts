import { Component, OnInit } from '@angular/core';
// import { first } from 'rxjs/operators';

// import { User } from '../_models';

@Component({templateUrl: 'base.component.html'})
export class BaseComponent implements OnInit {

    constructor() {
        // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        // this.loadAllUsers();
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id).pipe(first()).subscribe(() => { 
    //         this.loadAllUsers() 
    //     });
    // }

    // private loadAllUsers() {
    //     this.userService.getAll().pipe(first()).subscribe(users => { 
    //         this.users = users; 
    //     });
    // }
}