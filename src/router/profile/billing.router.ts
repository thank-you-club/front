const Billing = () => import('@/views/Profile/Billing/Billing.vue');
const Payment = () => import('@/views/Profile/Billing/Payment.vue');
export default [
  {
    name: 'billing',
    path: '',
    component: Billing,
  },
  {
    name: 'payment',
    path: ':plan',
    component: Payment,
  },
];
