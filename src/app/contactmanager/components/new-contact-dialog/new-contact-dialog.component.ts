import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss'],
})
export class NewContactDialogComponent implements OnInit {
  user: User;
  saving: boolean = false;
  avatars = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  name = new FormControl('', [Validators.required]);
  errorMessage: string = '';

  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = new User();
  }

  save(): void {
    this.user.name = this.name.value;
    this.errorMessage = '';
    this.saving = true;
    this.userService.addUser(this.user).subscribe({
      next: (newUser) => this.dialogRef.close(newUser),
      error: (error) => {
        this.errorMessage = error;
        console.error('Could not add user.', error, this.user);
        this.saving = false;
      },
    });
  }

  dismiss(): void {
    this.dialogRef.close(null);
  }

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }
}
