import { Component } from '@angular/core';
// Add NavParams to get the navigation parameters
import { NavController, NavParams } from 'ionic-angular';
// Import GithubUsers Provider
import { GithubUsers } from '../../providers/github-users';
// Import the User model
import { User } from '../../models/userModal';
@Component({
    templateUrl: 'build/pages/user-details/user-details.html',
    //Add GithubUsers provider
    providers: [GithubUsers]
})
export class UserDetailsPage {
    userData: User;
    userDetail: any;
    constructor(private nav: NavController, navParams: NavParams, githubUsers: GithubUsers) {
        // Assign default values to UI items
        // Using the safe navigation operator ( ?. ) in the template instead
        /*this.userDetail = {};
        this.userDetail.followers = 0;
        this.userDetail.following = 0;
        this.userDetail.public_repos = 0;
        this.userDetail.public_gists = 0;*/
        // Retrieve the login from the navigation parameters
        this.userData = navParams.get('login');
        // Get the user details and log
        githubUsers.loadDetails(this.userData.login)
            .then(user => this.userDetail = user);
    }
}
