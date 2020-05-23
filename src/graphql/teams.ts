import gql from 'graphql-tag';
import { ITeam } from '@/models/Team';
const defaultTeamsFields = `
    _id,
    name
`;

export const getTeams = gql`
    query ($org: String){
        teams(org: $org) {
            ${defaultTeamsFields}
        }
    }
`;
export const getTeamById = gql`
    query ($_id: ID!){
        team(_id: $_id) {
            ${defaultTeamsFields}
        }
    }
`;

export const insertTeam = (team: ITeam) => {
  return gql`
          mutation {
            insertTeam(name: "${team.name}",org: "${team.org?._id}"){
                  ${defaultTeamsFields}
              }
          }
      `;
};
export const deleteTeam = (team: ITeam) => {
  return gql`
          mutation {
            deleteTeam(_id:"${team._id}"){
              _id
              }
          }
      `;
};

export const updateTeam = (team: ITeam) => {
  return gql`
          mutation {
            updateTeam(
                _id: "${team._id}",
                name: "${team.name}"){
                ${defaultTeamsFields}
            }
          }
      `;
};
