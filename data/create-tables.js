const client = require('../lib/utils/pool');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db


    // run a query to create tables
    await client.query(`
    CREATE TABLE recipes (
      id BIGINT GENERATED ALWAYS AS IDENTITY,
      name VARCHAR NOT NULL,
      ingredients VARCHAR,
      directions VARCHAR,
      source VARCHAR,
      date VARCHAR
    )`
    );


    console.log('create tables complete');
  }
  catch (err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
