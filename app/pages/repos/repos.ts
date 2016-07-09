import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// Import GithubRepos provider
import { GithubRepos } from '../../providers/github-repos';
// Import Repo model
import { Repo } from '../../models/repoModal';
// Import Repo's Details Page
import { RepoDetailsPage } from '../repo-details/repo-details';
@Component({
    templateUrl: 'build/pages/repos/repos.html',
    providers: [GithubRepos]
})
export class ReposPage {
    repos: Repo[];
    constructor(private nav: NavController, private githubRepos: GithubRepos) {
        githubRepos.load().then(repos => {
            // console.log(repos);
            this.repos = repos;
        });
    }
    goToDetails(event, repo) {
        this.nav.push(RepoDetailsPage, {
            repo: repo
        });
    }
    search(searchTerm) {
        let term = searchTerm.target.value;
        if(term) {
            if(term.trim() == '' || term.trim().length < 3) {
                this.githubRepos.load()
                    .then(repos => this.repos = repos);
            } else {
                this.githubRepos.searchRepos(term)
                    .then(repos => {
                        this.repos = repos;
                    });
            }
        } else {
            this.githubRepos.load().then(repos => this.repos = repos);
        }
    }
}
