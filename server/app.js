const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


//use cors
app.use(cors());
// connect mongoose to database online mlab
mongoose.connect('mongodb://linhdang:linh522885@ds161724.mlab.com:61724/graphql-react', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to database online');
})
// bind express with graphql (use middleware grapqlHTTP)
app.use('/graphql', graphqlHTTP({
    // pass in a schema property
    schema,
    graphiql: true
}))
app.listen(4000, () => {
    console.log('run port 4000...');
})