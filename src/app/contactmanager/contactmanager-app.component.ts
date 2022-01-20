import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contactmanager-app.component.html',
  styleUrls: ['./contactmanager-app.component.css'],
})
export class ContactManagerAppComponent implements OnInit {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl(
        'https://stackblitz.com/files/sdove-ps-angular-material/github/StevenSDove/ps-angular-material/master/src/asets/avatars.svg'
      )
    );
  }

  ngOnInit() {}
}
