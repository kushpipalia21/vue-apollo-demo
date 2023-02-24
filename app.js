const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
} = require("graphql");
const app = express();

app.use(cors());

let userData = [
    { id: 1, firstName: "John", lastName: "Doe", age: 22 },
    { id: 2, firstName: "Mark", lastName: "Smith", age: 30 },
    { id: 3, firstName: "Robert", lastName: "Hunt", age: 35 },
];

const userType = new GraphQLObjectType({
    name: "User",
    description: "UserDetails",
    fields: {
        id: {
            type: GraphQLNonNull(GraphQLInt),
        },
        firstName: {
            type: GraphQLNonNull(GraphQLString),
        },
        lastName: {
            type: GraphQLNonNull(GraphQLString),
        },
        age: {
            type: GraphQLNonNull(GraphQLInt),
        },
    },
});

const rootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "This is root query",
    fields: {
        users: {
            type: GraphQLList(userType),
            resolve: () => userData,
        },

        user: {
            type: userType,
            args: {
                id: { type: GraphQLInt },
            },
            resolve: (_, args) => userData.find((data) => data.id === args.id),
        },
    },
});

const rootMutation = new GraphQLObjectType({
    name: "RootMutation",
    description: "This is root mutation",
    fields: {
        addUser: {
            type: userType,
            args: {
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (_, args) => {
                const newUser = {
                    id: userData.length + 1,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    age: args.age,
                };
                userData.push(newUser);
                return newUser;
            },
        },

        deleteUser: {
            type: userType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (_, args) => {
                userData = userData.filter((data) => data.id !== args.id);
                return userData[args.id];
            },
        },

        updateUser: {
            type: userType,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve: (_, { id, firstName, lastName, age }) => {
                const updatedUser = userData.find((data) => data.id === id);
                updatedUser.firstName = firstName;
                updatedUser.lastName = lastName;
                updatedUser.age = age;
                return updatedUser;
            },
        },
    },
});

const schema = new GraphQLSchema({ query: rootQuery, mutation: rootMutation });

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Listening on port - ${PORT}`);
});