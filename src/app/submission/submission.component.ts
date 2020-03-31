import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User,Eassy } from '../_models';
import { UserService } from '../_services';
import { AlertService, AuthenticationService } from '../_services';


@Component({templateUrl: 'submission.component.html'})
export class SubmissionComponent implements OnInit {
    currentUser: User;
    eassyForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: String;
    new_eassy: Eassy;

    constructor(private userService: UserService, 
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        // this.loadAllUsers();
        this.eassyForm = this.formBuilder.group({
            topic: ['', Validators.required],
            eassy: ['write eassy here', Validators.required]
        });
        this.returnUrl = 'home-student';
        this.new_eassy = new Eassy();
    }

    // convenience getter for easy access to form fields
    get f() { return this.eassyForm.controls; }

    submit_eassy() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.eassyForm.invalid) {
            return;
        }

        this.new_eassy.username = this.currentUser.username;
        this.new_eassy.topic = this.f.topic.value;
        this.new_eassy.eassy = this.f.eassy.value;
        this.loading = true;
        this.userService.submit_eassy(this.new_eassy)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    
}