import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {
  private dataStore: {
    users: User[];
  };
  private _users: BehaviorSubject<User[]>;

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  notifyUsersUpdated(): void {
    this._users.next(Object.assign({}, this.dataStore).users);
  }

  loadAll(): Subscription {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users';

    return this.http.get<User[]>(usersUrl).subscribe({
      next: (data) => {
        this.dataStore.users = data;
        this.notifyUsersUpdated();
      },
      error: (err) => console.log('Failed to fetch users', err),
    });
  }

  userById(id: number): User {
    return this.dataStore.users.find((x) => x.id == id);
  }

  addUser(user: User): Observable<User> {
    return new Observable<User>((observer) => {
      // timeout to see what it is doing on a delay :-)
      setTimeout(() => {
        if (!user.name.includes(' ')) {
          observer.error('Must include first and last name');
          return;
        }
        const maxId = this.dataStore.users.length; // this.dataStore.users.reduce((max,cur) => cur.id > max.id ? cur : max).id;
        user.id = maxId + 1;
        this.dataStore.users.push(user);
        this.notifyUsersUpdated();
        observer.next(user);
      }, 500);
    });
  }
}
