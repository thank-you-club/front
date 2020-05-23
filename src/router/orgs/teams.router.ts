const Teams = () => import('@/views/Orgs/Teams/Teams.vue');
const New = () => import('@/views/Orgs/Teams/New.vue');
const Edit = () => import('@/views/Orgs/Teams/Edit.vue');
const Team = () => import('@/views/Orgs/Teams/Team.vue');
export default [
  {
    name: 'teams',
    path: '',
    component: Teams,
  },
  {
    name: 'new-team',
    path: 'new',
    component: New,
  },
  {
    name: 'edit-team',
    path: ':teamId/edit',
    component: Edit,
  },
  {
    name: 'team',
    path: ':teamId',
    component: Team,
  },
];