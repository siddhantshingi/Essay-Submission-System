import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User, Topic } from '../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { UserService } from '../_services';

import { AlertService, UserService } from '../_services';


@Component({templateUrl: 'home-teacher.component.html'})
export class HomeTeacherComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    loading = false;
    new_topic: Topic;
    AddTopicForm: FormGroup;

    constructor(private userService: UserService,
        private router: Router,
        private alertService: AlertService,
        private formBuilder: FormBuilder) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.new_topic = new Topic();
    }


    ngOnInit() {
        this.AddTopicForm = this.formBuilder.group({
            new_topic: ['Add new topic', Validators.required]
        });
        this.loadAllUsers();
    }

    // convenience getter for easy access to form fields
    get f() { return this.AddTopicForm.controls; }

    add_topic_submitted() {
        // stop here if form is invalid

        if (this.AddTopicForm.invalid) {
            return;
        }
        this.loading = true;
        this.new_topic.name = this.f.new_topic.value;
        this.userService.add_topic(this.new_topic)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Topic added', true);
                    // this.router.navigate(['/base']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        this.AddTopicForm.reset();
        this.loading = false;
    }

    resetForm() {
        this.AddTopicForm.reset();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll_students().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }
}