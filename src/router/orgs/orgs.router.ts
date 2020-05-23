const Orgs = () => import('@/views/Orgs/Orgs.vue');
const New = () => import('@/views/Orgs/New.vue');
const Edit = () => import('@/views/Orgs/Edit.vue');
const Base = () => import('@/views/Base.vue');
import teamsRouter from './teams.router';
export default [
  {
    name: 'orgs',
    path: '',
    component: Orgs,
  },
  {
    name: 'new-org',
    path: 'new',
    component: New,
  },
  {
    name: 'edit-org',
    path: ':orgId/edit',
    component: Edit,
  },
  {
    path: ':orgId',
    children: teamsRouter,
    component: Base,
  },
];
