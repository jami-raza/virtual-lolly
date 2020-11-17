module.exports = {
    plugins: [
        
        {
            resolve: "gatsby-source-graphql",
            options: {
              // Arbitrary name for the remote schema Query type
              typeName: "SWAPI",
              // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
              fieldName: "swapi",
              // Url to query from
              url: "http://localhost:8888/.netlify/functions/Vcard",
            },
        }
    ]
}