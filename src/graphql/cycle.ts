import gql from 'graphql-tag';
import { ITeam } from '@/models/Team';
import { ICycle } from '@/models/Cycle';
import { IUser } from '@/models/User';
const defaultCyclesFields = `
    _id,
    startDate,
    endDate,
    transactions{
        value
        target{
         _id,firstName,lastName,email
        }
        issuer
    }
`;

export const getCycles = gql`
    query {
        cycles{
            ${defaultCyclesFields}
        }
    }
`;
export const getCycleById = gql`
    query ($_id: ID!){
        cycle(_id: $_id) {
            ${defaultCyclesFields}
        }
    }
`;

export const nextCycle = (team: ITeam) => {
  return gql`
          mutation {
            nextCycle(team: "${team._id}"){
                  ${defaultCyclesFields}
              }
          }
      `;
};

export const endorseMember = (team: ITeam, member: IUser, value: number) => {
  return gql`
            mutation {
                endorseMember(team: "${team._id}",target:"${member._id}",value:${value}){
                    ${defaultCyclesFields}
                }
            }
        `;
};
