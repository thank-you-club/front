const Edit = () => import('@/views/Profile/Edit.vue');
const PasswordEdit = () => import('@/views/Profile/PasswordEdit.vue');
const Domain = () => import('@/views/Profile/Domain.vue');
const Email = () => import('@/views/Profile/Email.vue');
const Base = () => import('@/views/Base.vue');
// import billingRouter from './billing.router';
export default [
  {
    name: 'edit-profile',
    path: 'edit',
    component: Edit,
  },
  {
    name: 'edit-password',
    path: 'password',
    component: PasswordEdit,
  },
  // {
  //   path: 'billing',
  //   component: Base,
  //   children: billingRouter,
  // },
  {
    path: 'domain',
    name: 'domain',
    component: Domain,
  },
  {
    path: 'email',
    name: 'email',
    component: Email,
  },
];
