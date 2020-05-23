import gql from 'graphql-tag';
import { IUser } from '@/models/User';

export const defaultFields = `
    _id
    firstName
    lastName
    email
    onBoardingStep
    isActive
    registeredAt
    plan
`;

export const updateUser = (user: IUser) => {
  return gql`
    mutation {
      updateUser(
        ${Object.keys(user).map(
          (key: any) =>
            `${key}: ${
              // @ts-ignore
              typeof user[key] === 'number' ? user[key] : `"${user[key]}"`
            }`,
        )}
        ){
          _id
        }
    }
`;
};

export const updatePassword = (oldPass: string, newPass: string) => {
  return gql`
  mutation {
   updatePassword(
     oldPass: "${oldPass}",
      newPass: "${newPass}"){
        _id
      }
  }
`;
};

export const generateResetToken = (email: string) => {
  return gql`
  mutation {
    generateResetToken(
      email: "${email}")
  }
`;
};

export const resetPassword = (newPass: string, token: string) => {
  return gql`
  mutation {
    resetPassword(
      newPass: "${newPass}",
      token: "${token}"){
        _id
      }
  }
`;
};
