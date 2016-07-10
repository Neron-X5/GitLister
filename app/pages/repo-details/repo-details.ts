import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GithubRepos } from '../../providers/github-repos';
import { Repo } from '../../models/repoModal';
@Component({
    templateUrl: 'build/pages/repo-details/repo-details.html',
    providers: [GithubRepos]
})
export class RepoDetailsPage {
    repoData: Repo;
    constructor(private nav: NavController, navParams: NavParams, githubRepos: GithubRepos) {
        this.repoData = navParams.get('repo');
        githubRepos.loadDetails(this.repoData.name, this.repoData.owner.login)
            .then(repo => {
                // console.log(repo);
                this.repoData = repo;
            });
    };
};
