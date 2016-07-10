// Organization model based on the structure of github api at https://api.github.com/organizations
export class Organization {
    avatar_url: string;
    blog: string;
    company: string;
    created_at: Date;
    description: string;
    email: string;
    events_url: string;
    followers: number;
    following: number;
    hooks_url: string;
    html_url: string;
    id: number;
    issues_url: string;
    location: string;
    login: string;
    members_url: string;
    name: string;
    public_gists: number;
    public_members_url: string;
    public_repos: number;
    repos_url: string;
    type: string;
    url: string;
};
