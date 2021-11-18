const {FusionAuthClient} = require('fusionauth-node-client');
const client = new FusionAuthClient(
  YOUR API KEY HERE,
  'http://localhost:9011'
);
// Retrieve user by email address
client.retrieveUserByEmail('jared@fusionauth.io')
  .then(handleResponse);

function handleResponse(clientResponse){
  console.info(JSON.stringify(
    clientResponse.successResponse.user, null, 2
  ));
}
