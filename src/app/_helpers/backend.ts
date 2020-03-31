import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User, Topic, Eassy } from '../_models';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        let teachers: any[] = JSON.parse(localStorage.getItem('teachers')) || [];
        let topics: any[] = JSON.parse(localStorage.getItem('topics')) || [];
        let eassys: any[] = JSON.parse(localStorage.getItem('eassys')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate_student
            if (request.url.endsWith('/users/authenticate_student') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // authenticate_teacher
            if (request.url.endsWith('/users/authenticate_teacher') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredTeachers = teachers.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredTeachers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let teacher = filteredTeachers[0];
                    let body = {
                        id: teacher.id,
                        username: teacher.username,
                        firstName: teacher.firstName,
                        lastName: teacher.lastName,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get topics
            if (request.url.endsWith('/topics') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: topics }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get submissions
            if (request.url.endsWith('/submissions') && request.method === 'POST') {
                // find user by id in users array
                let username = request.body;
                let spec_eassys: Eassy[] = [];
                for (let i = 0; i < eassys.length; i++) {
                    let eassy = eassys[i];
                    if (eassy.username === username) {
                        spec_eassys.push(eassy);
                    }
                }
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: spec_eassys }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get all submissions
            if (request.url.endsWith('/submissions') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: eassys }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get submissions
            if (request.url.endsWith('/submissions/id') && request.method === 'POST') {
                // find user by id in users array
                let user_id = request.body;
                let username: String;
                for (let i = 0; i < users.length; i++) {
                    let user = users[i];
                    if (user.id === user_id) {
                        username = user.username;
                        break;
                    }
                }

                let spec_eassys: Eassy[] = [];
                for (let i = 0; i < eassys.length; i++) {
                    let eassy = eassys[i];
                    if (eassy.id === username) {
                        spec_eassys.push(eassy);
                    }
                }
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: spec_eassys }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // add topic
            if (request.url.endsWith('/add_topic') && request.method === 'POST') {

                // get new user object from post body
                let newTopic = request.body;

                console.log(topics)
                // validation
                // console.log(topics)
                let duplicateTopic = topics.filter(topic => { return topic.name === newTopic.name; }).length;
                if (duplicateTopic) {
                    return throwError({ error: { message: 'Topic "' + newTopic.name + '" already exists' } });
                }
                console.log(newTopic.name)

                // save new user
                // newTopic.name = users.length + 1;
                topics.push(newTopic);
                localStorage.setItem('topics', JSON.stringify(topics));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // register student
            if (request.url.endsWith('/users/register_student') && request.method === 'POST') {
                console.log('register_student')
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // register teacher
            if (request.url.endsWith('/users/register_teacher') && request.method === 'POST') {
                console.log('register_teacher')

                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = teachers.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }

                // save new user
                newUser.id = users.length + 1;
                teachers.push(newUser);
                localStorage.setItem('teachers', JSON.stringify(teachers));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // submit eassy
            if (request.url.endsWith('/users/submit_eassy') && request.method === 'POST') {

                // get new user object from post body
                let newEassy = request.body;
                newEassy.id = eassys.length + 1;

                // save new user
                eassys.push(newEassy);
                localStorage.setItem('eassys', JSON.stringify(eassys));

                console.log(eassys);

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }
            
            // delete user
            if (request.url.match(/\/submission\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < eassys.length; i++) {
                        let eassy = eassys[i];
                        if (eassy.id === id) {
                            // delete user
                            eassys.splice(i, 1);
                            localStorage.setItem('eassys', JSON.stringify(eassys));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};