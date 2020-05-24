import gql from 'graphql-tag';
import { ICycle } from '@/models/Cycle';
import { ITeam } from '@/models/Team';
const defaultCyclesFields = `
    _id,
    startDate,
    endDate
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
            nextCycle(name: "${team._id}"){
                  ${defaultCyclesFields}
              }
          }
      `;
};
