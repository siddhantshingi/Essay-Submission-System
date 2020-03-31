import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User,Eassy } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'submission_list.component.html'})
export class SubmissionListComponent implements OnInit {
    currentUser: User;
    submissions: Eassy[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllSubmissions();
    }

    deleteSubmission(id: number) {
        this.userService.delete_submission(id).pipe(first()).subscribe(() => { 
            this.loadAllSubmissions() 
        });
    }

    private loadAllSubmissions() {
        this.userService.getAll_submissions(this.currentUser.username).pipe(first()).subscribe(eassys => { 
            this.submissions = eassys; 
        });
    }
}