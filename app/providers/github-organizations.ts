import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Organization } from '../models/organizationModal';
@Injectable()
export class GithubOrganizations {
    githubOrganizations: any;
    constructor(private http: Http) {
        this.githubOrganizations = null;
    };
    load() {
        if(this.githubOrganizations) {
            return Promise.resolve(this.githubOrganizations);
        }
        return new Promise(resolve => {
            this.http.get('https://api.github.com/organizations')
                .map(res => < Array < Organization >> (res.json()))
                .subscribe(organizations => {
                    // console.log(organizations);
                    this.githubOrganizations = organizations;
                    resolve(this.githubOrganizations);
                });
        });
    };
    searchOrganizations(searchParam: string) {
        return new Promise < Array < Organization >> (resolve => {
            /* this.http.get(`https://api.github.com/search/organizations?q=${searchParam}`) */
            this.http.get(`https://api.github.com/orgs/${searchParam}`)
                .map(res => < Array < Organization >> (res.json().items))
                .subscribe(organizations => resolve(organizations));
        });
    };
    loadDetails(organization: string) {
        return new Promise < Organization > (resolve => {
            this.http.get(`https://api.github.com/orgs/${organization}`)
                .map(res => < Organization > (res.json()))
                .subscribe(organization => resolve(organization));
        });
    };
};
