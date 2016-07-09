import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// Import GithubUsers provider
import { GithubUsers } from '../../providers/github-users';
// Import User model
import { User } from '../../models/userModal';
// Import User's Details Page
import { UserDetailsPage } from '../user-details/user-details';
@Component({
    templateUrl: 'build/pages/users/users.html',
    // Add the GithubUsers provider as part of our page component
    providers: [GithubUsers]
})
export class UsersPage {
    // Declare users as an array of User model
    users: User[];
    // Inject the GithubUsers in the constructor of our page component
    constructor(private nav: NavController, private githubUsers: GithubUsers) {
            // Assign data to users array when github provider returns data
            githubUsers.load()
                .then(users => {
                    this.users = users;
                    // console.log(users);
                });
        }
        // Navigate to user details page with the login as a parameter
    goToDetails(event, login) {
            this.nav.push(UserDetailsPage, {
                login: login
            });
        }
        // Search for user's from github Handle input event from search bar
    search(searchTerm) {
        let term = searchTerm.target.value;
        // We will only perform the search if we have 3 or more characters
        if(term) {
            if(term.trim() == '' || term.trim().length < 3) {
                // Get github users and assign to local user's variable
                this.githubUsers.load()
                    // Load original users in this case
                    .then(users => this.users = users);
            } else {
                // TimerWrapper.setTimeout(() => {
                // Get the searched users from github
                this.githubUsers.searchUsers(term)
                    .then(users => {
                        // console.log(users);
                        this.users = users;
                    });
                // }, 300);
            }
        } else {
            this.githubUsers.load().then(users => this.users = users);
        }
    }
}
