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

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM recipes'
    );

    return rows.map(row => new Recipe(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM recipes WHERE id=$1',
      [id]
    );

    if(!rows[0]) return null;
    else return new Recipe(rows[0]);
  }

  static async update(id, recipe) {
    const { rows } = await pool.query(
      `UPDATE recipes
       SET name=$1,
           ingredients=$2,
           directions=$3,
           source=$4,
           date=$5
       WHERE id=$6
       RETURNING *
      `,
      [recipe.name, recipe.ingredients, recipe.directions, recipe.source, recipe.date, id]
    );

    return new Recipe(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM recipes WHERE id=$1 RETURNING *',
      [id]
    );

    return new Recipe(rows[0]);
  }
};
