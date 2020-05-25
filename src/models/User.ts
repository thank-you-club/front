import { Plans } from '@/constants/Plan';

export interface IUser {
  _id?: string;
  photoUrl?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
  registeredAt?: number;
  paidAt?: number;
  plan?: Plans;
  onBoardingStep?: number;
  wasDeactivatedAt?: number;
  isEmailActivated?: boolean;
  isSubscribedToNewsletter?: boolean;
  isAgreeingToTermsOfService?: boolean;
}
