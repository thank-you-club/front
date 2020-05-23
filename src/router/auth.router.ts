const Login = () => import('@/views/Auth/Login.vue');
const Register = () => import('@/views/Auth/Register.vue');
const Reset = () => import('@/views/Auth/Reset.vue');
const ResetEmailSent = () => import('@/views/Auth/ResetEmailSent.vue');
const EmailReset = () => import('@/views/Auth/EmailReset.vue');
export default [
  {
    name: 'login',
    path: 'login',
    component: Login,
  },
  {
    name: 'register',
    path: 'register',
    component: Register,
  },
  {
    name: 'reset',
    path: 'reset',
    component: Reset,
  },
  {
    name: 'reset-email-sent',
    path: 'reset-email-sent',
    component: ResetEmailSent,
  },
  {
    name: 'email-reset',
    path: 'email-reset',
    component: EmailReset,
  },
];
