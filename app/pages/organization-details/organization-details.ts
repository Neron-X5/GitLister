import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GithubOrganizations } from '../../providers/github-organizations';
import { Organization } from '../../models/organizationModal';
@Component({
    templateUrl: 'build/pages/organization-details/organization-details.html',
    providers: [GithubOrganizations]
})
export class OrganizationDetailsPage {
    organizationData: Organization;
    constructor(private nav: NavController, navParams: NavParams, githubOrganizations: GithubOrganizations) {
        this.organizationData = navParams.get('organization');
        githubOrganizations.loadDetails(this.organizationData.login)
            .then(organization => {
                // console.log(organization);
                this.organizationData = organization;
            });
    };
};
