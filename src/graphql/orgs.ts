import gql from 'graphql-tag';
import { IOrg } from '@/models/Org';
const defaultOrgsFields = `
    _id,
    name
`;

export const getOrgs = gql`
    query {
        orgs{
            ${defaultOrgsFields}
        }
    }
`;
export const getOrgById = gql`
    query ($_id: ID!){
        org(_id: $_id) {
            ${defaultOrgsFields}
            owner{
                _id,firstName,lastName,email
            }
            members {
                _id,firstName,lastName,email
            }
        }
    }
`;

export const insertOrg = (org: IOrg) => {
  return gql`
          mutation {
            insertOrg(name: "${org.name}"){
                  ${defaultOrgsFields}
              }
          }
      `;
};
export const deleteOrg = (org: IOrg) => {
  return gql`
          mutation {
            deleteOrg(_id:"${org._id}"){
              _id
              }
          }
      `;
};

export const updateOrg = (org: IOrg) => {
  return gql`
          mutation {
            updateOrg(
                _id: "${org._id}",
                name: "${org.name}"){
                ${defaultOrgsFields}
            }
          }
      `;
};
