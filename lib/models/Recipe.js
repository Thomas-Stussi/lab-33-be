const pool = require('../utils/pool');

module.exports = class Recipe {
  id;
  name;
  ingredients;
  directions;
  source;
  date;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.ingredients = row.ingredients;
    this.directions = row.directions;
    this.source = row.source;
    this.date = row.date;
  }

  static async insert(recipe) {
    const { rows } = await pool.query(
      'INSERT into recipes (name, ingredients, directions, source, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [recipe.name, recipe.ingredients, recipe.directions, recipe.source, recipe.date]
    );

    return new Recipe(rows[0]);
  }
};
