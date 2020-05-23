import gql from 'graphql-tag';
import { IUser } from '@/models/User';
import { defaultFields as defaultUserFields } from '@/graphql/users';
export const register = (user: IUser) => {
  return gql`
    mutation {
      register(
        email: "${user.email}",
        firstName: "${user.firstName}",
        lastName: "${user.lastName}",
        isAgreeingToTermsOfService: ${user.isAgreeingToTermsOfService},
        isSubscribedToNewsletter: ${user.isSubscribedToNewsletter},
        password: "${user.password}"){
          token,user{
            ${defaultUserFields}
          }
        }
    }
`;
};

export const login = (user: IUser) => {
  return gql`
      mutation {
        login(
          email: "${user.email}",
          password: "${user.password}"){
              token,user{
                  ${defaultUserFields}
              }
          }
      }
  `;
};
export const me = () => {
  return gql`
  {
        me {
         ${defaultUserFields}
         plan
         registeredAt
         paidAt
         wasDeactivatedAt
         onBoardingStep
         domain
        }
    }
  `;
};
