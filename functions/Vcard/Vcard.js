const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb');
q = faunadb.query;
const shortid = require('shortid');

const typeDefs = gql`
  type Query {
    lolly:[VirtualLolly!]
    getlollyBypath(link:String!): VirtualLolly
  }
  type VirtualLolly {
    id: ID!
    c1:String!
    c2:String!
    c3:String!
    sender:String!
    msg:String!
    reci:String!
    link:String!
  }
  type Mutation {
    addLolly(c1:String!,
      c2:String!,
      c3:String!,
      sender:String!,
      msg:String!,
      reci:String!,
      link:String!
      ): VirtualLolly
  }
`

const client = new faunadb.Client({secret:"fnAD6EFsqIACAbyMUIBkf-9N8h4ncLSdCk30MKeb"})

const resolvers = {
  Query: {
    lolly: async (root,args,context) => {
      try{
        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index('V_Card'))),
            q.Lambda((x) => q.Get(x))
          )   
        )
        console.log(result.data)
        return result.data.map((d) => {
          return{
            
            c1:d.data.c1,
            c2:d.data.c2,
            c3:d.data.c3,
            sender:d.data.sender,
            msg:d.data.msg,
            reci:d.data.reci,
            link:d.data.link
          }
            

          
        })
      }catch(err){
        console.log(err)
      }
    },
    getlollyBypath: async (_, {args}) => {
      try {
        const result = await client.query(
          q.Get(q.Match(q.Index('getLolly'),args.link))
        )
        return result.data
      }catch(err){
        console.log(err)
      }
    }
  },
  Mutation:{
    addLolly: async (_, {c1,c2,c3,sender,msg,reci,link}) => {
      try{
        
        const result = await client.query(
          q.Create(q.Collection('Lolly'),{
            data:{
            c1, c2, c3,sender,msg,reci,link
          }
            
          })
        )
        console.log(result)
        return result.data
      }catch(err){
        console.log(err)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
