import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
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

  loadAll(): Subscription {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users';

    return this.http.get<User[]>(usersUrl).subscribe({
      next: (data) => {
        this.dataStore.users = data;
        // I do not think that this does what the instructor thinks that it does...
        this._users.next(Object.assign({}, this.dataStore).users);
      },
      error: (err) => console.log('Failed to fetch users', err),
    });
  }

  userById(id: number): User {
    return this.dataStore.users.find((x) => x.id == id);
  }
}
