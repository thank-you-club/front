import gql from 'graphql-tag';
import { IDomain } from '@/models/Domain';

export const getMyDomains = gql`
  {
    myDomains {
      _id
      domain
      dkim1Host
      dkim1Validated
      dkim1Value
      dkim2Host
      dkim2Validated
      dkim2Value
      mailCnameHost
      mailCnameValidated
      mailCnameValue
    }
  }
`;

export const addDomain = (domain: IDomain) => {
  return gql`
        mutation {
          addDomain(domain: "${domain.domain}"){
              _id, domain
            }
        }
    `;
};

export const verifyDomain = (domain: IDomain) => {
  return gql`
        mutation {
          verifyDomain(domain: "${domain.domain}"){
              _id, domain
            }
        }
    `;
};
