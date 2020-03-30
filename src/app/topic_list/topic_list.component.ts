import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User, Topic } from '../_models';
// import { UserService } from '../_services';

import { AlertService, UserService } from '../_services';


@Component({templateUrl: 'topic_list.component.html'})
export class TopicListComponent implements OnInit {
    currentUser: User;
    topics: Topic[] = [];
    found_topics: Topic[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


    ngOnInit() {
        this.loadAllTopics();
    }

    private loadAllTopics() {
        // this.found_topics = this.userService.getAll_topics();

        this.userService.getAll_topics().pipe(first()).subscribe(topics => { 
            this.topics = topics; 
        });
    }
}