import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Repo } from '../models/repoModal';
@Injectable()
export class GithubRepos {
    githubRepos: any;
    constructor(private http: Http) {
        this.githubRepos = null;
    };
    load() {
        if(this.githubRepos) {
            return Promise.resolve(this.githubRepos);
        }
        return new Promise(resolve => {
            this.http.get('https://api.github.com/repositories')
                .map(res => < Array < Repo >> (res.json()))
                .subscribe(repos => {
                    // console.log(repos);
                    this.githubRepos = repos;
                    resolve(this.githubRepos);
                });
        });
    };
    searchRepos(searchParam: string) {
        return new Promise < Array < Repo >> (resolve => {
            this.http.get(`https://api.github.com/search/repositories?q=${searchParam}`)
                .map(res => < Array < Repo >> (res.json().items))
                .subscribe(repos => resolve(repos));
        });
    };
    loadDetails(repo: string, owner: string) {
        return new Promise < Repo > (resolve => {
            // /repos/:owner/:repo
            this.http.get(`https://api.github.com/repos/${owner}/${repo}`)
                .map(res => < Repo > (res.json()))
                .subscribe(repo => resolve(repo));
        });
    };
};
