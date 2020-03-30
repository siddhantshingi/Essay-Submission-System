import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Topic } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll_students() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    getAll_topics() {
        return this.http.get<Topic[]>(`${config.apiUrl}/topics`);
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

    add_topic(new_topic: Topic) {
        console.log(new_topic.name)
        return this.http.post(`${config.apiUrl}/add_topic`, new_topic)
    }
}