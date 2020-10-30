const client = require('../lib/utils/pool');

run();

async function run() {

  try {

    await client.query(`
            DROP TABLE IF EXISTS recipes CASCADE;
        `);

    console.log(' drop tables complete');
  }
  catch (err) {
    console.log(err);
  }
  finally {
    client.end();
  }

}
