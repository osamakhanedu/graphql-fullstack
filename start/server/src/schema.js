const { gql } =  require('apollo-server');

const typeDefs = gql`
  # schema goes here.

  type User {
    id: ID!
    email: String!
    trips:[Launch]!
   }

  type Launch {
    id: ID!
    site: String
    missioin: Mission
    rocket: Rocket
    isBooked: Boolean!
  }
  
  type Rocket {
   id: ID!
   name: String
   type: String	  
  }

  
  type Mission {
   name: String
   missinPath(size: PatchSize): String
  }

 enum PatchSize {
  SMALL
  LARGE
 }

 type TripUpdateResponse {
  success: Boolean!
  message: String
  launches: [Launch]
}

type Query {
  launches: [Launch]!
  launch(id: ID!): Launch
  me: User
}
 
 type Mutation {
  bookTrips(launchIds: [ID]!): TripUpdateResponse!
  cancelTrip(launchId: ID!): TripUpdateResponse!
  login(email: String): String # login token
}
`

module.exports = typeDefs;
