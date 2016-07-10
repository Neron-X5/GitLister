import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GithubOrganizations } from '../../providers/github-organizations';
import { Organization } from '../../models/organizationModal';
import { OrganizationDetailsPage } from '../organization-details/organization-details';
@Component({
    templateUrl: 'build/pages/organizations/organizations.html',
    providers: [GithubOrganizations]
})
export class OrganizationsPage {
    organizations: Organization[];
    constructor(private nav: NavController, private githubOrganizations: GithubOrganizations) {
        githubOrganizations.load().then(organizations => {
            // console.log(organizations);
            this.organizations = organizations;
        });
    };
    goToDetails(event, organization) {
        this.nav.push(OrganizationDetailsPage, {
            organization: organization
        });
    };
    search(searchTerm) {
        let term = searchTerm.target.value;
        if(term) {
            if(term.trim() == '' || term.trim().length < 3) {
                this.githubOrganizations.load()
                    .then(organizations => this.organizations = organizations);
            } else {
                this.githubOrganizations.searchOrganizations(term)
                    .then(organizations => {
                        // console.log(organizations);
                        this.organizations = organizations;
                    });
            }
        } else {
            this.githubOrganizations.load().then(organizations => this.organizations = organizations);
        }
    };
};
