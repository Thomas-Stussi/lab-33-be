/* eslint-disable indent */
const client = require('../lib/utils/pool');
const recipeData = require('./recipeData');

run();

async function run() {
  try {
    await client.connect();

    await Promise.all(
      recipeData.map(recipe => {
        return client.query(`
                            INSERT INTO recipes (name, ingredients, directions, source, date)
                            VALUES ($1, $2, $3, $4, $5)
                            RETURNING *;
                        `,
          [recipe.name, recipe.ingredients, recipe.directions, recipe.source, recipe.date]);
      })
    );

    console.log('seed data load complete');
  }
  catch (err) {
    console.log(err);
  }
  finally {
    client.end();
  }
}
