import gql from "graphql-tag";

export const getAllUsersQuery = gql`
  query users {
    users {
      id
      firstName
      lastName
      age
    }
  }
`;

export const getSingleUserQuery = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      firstName
      lastName
      age
    }
  }
`;

export const addUserMutation = gql`
  mutation addUser($firstName: String!, $lastName: String!, $age: Int!) {
    addUser(firstName: $firstName, lastName: $lastName, age: $age) {
      id
      firstName
      lastName
      age
    }
  }
`;

export const editUserMutation = gql`
  mutation updateUser(
    $id: Int!
    $firstName: String!
    $lastName: String!
    $age: Int!
  ) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, age: $age) {
      id
      firstName
      lastName
      age
    }
  }
`;

export const deleteSingleUser = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
      firstName
      lastName
      age
    }
  }
`;
