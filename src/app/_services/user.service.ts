import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Topic, Eassy } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll_students() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    getAll_topics() {
        return this.http.get<Topic[]>(`${config.apiUrl}/topics`);
    }

    getAll_submissions(username: String) {
        return this.http.post<Eassy[]>(`${config.apiUrl}/submissions`,username);
    }

    getAll_sub() {
        return this.http.get<Eassy[]>(`${config.apiUrl}/submissions`);
    }

    getAll_submissions_by_userid(id: number) {
        return this.http.post<Eassy[]>(`${config.apiUrl}/submissions/id`,id);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/users/` + id);
    }

    register_student(user: User) {
        return this.http.post(`${config.apiUrl}/users/register_student`, user);
    }
    
    register_teacher(user: User) {
        return this.http.post(`${config.apiUrl}/users/register_teacher`, user);
    }

    update(user: User) {
        return this.http.put(`${config.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/` + id);
    }

    delete_submission(id: number) {
        return this.http.delete(`${config.apiUrl}/submission/` + id);
    }

    add_topic(new_topic: Topic) {
        return this.http.post(`${config.apiUrl}/add_topic`, new_topic)
    }

    submit_eassy(new_eassy: Eassy) {
        return this.http.post(`${config.apiUrl}/users/submit_eassy`, new_eassy)
    }

}