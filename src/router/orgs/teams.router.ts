const Teams = () => import('@/views/Orgs/Teams/Teams.vue');
const New = () => import('@/views/Orgs/Teams/New.vue');
const Edit = () => import('@/views/Orgs/Teams/Edit.vue');
const Members = () => import('@/views/Orgs/Teams/Members.vue');
const Leaderboard = () => import('@/views/Orgs/Teams/Leaderboard.vue');
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
    name: 'members',
    path: ':teamId',
    component: Members,
  },
  {
    name: 'leaderboard',
    path: ':teamId/leaderboard',
    component: Leaderboard,
  },
];
