import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  // styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(
    public authService: AuthService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
        this.pageService.getDashboard(this.profile.email)
          .then(information => console.log('yep fired', information))
      });
    }
  }

}
