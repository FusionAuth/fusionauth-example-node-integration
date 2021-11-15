const {FusionAuthClient} = require('fusionauth-node-client');
const client = new FusionAuthClient(
  'bf69486b-4733-4470-a592-f1bfce7af580',
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
