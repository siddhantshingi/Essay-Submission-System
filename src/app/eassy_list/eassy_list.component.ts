import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User,Eassy } from '../_models';
import { AlertService,UserService } from '../_services';

@Component({templateUrl: 'eassy_list.component.html'})
export class EassyListComponent implements OnInit {
    currentUser: User;
    submissions: Eassy[] = [];
    loading = false;

    constructor(private userService: UserService, private alertService: AlertService) {
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

    submitEvaluation(id: number) {
        this.loading = true
        this.alertService.success('Evaluated successful', true);
        
    }

    private loadAllSubmissions() {
        this.userService.getAll_sub().pipe(first()).subscribe(eassys => { 
            this.submissions = eassys; 
        });
    }
}