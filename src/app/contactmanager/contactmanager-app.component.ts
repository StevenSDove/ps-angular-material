import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contactmanager-app.component.html',
  styleUrls: ['./contactmanager-app.component.scss'],
})
export class ContactManagerAppComponent implements OnInit {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg')
    );
  }

  ngOnInit() {}
}
