/* eslint-disable space-before-function-paren */
const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Recipe = require('../lib/models/Recipe');

describe('recipe-lab routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  const testRecipe1 = {
    name: 'test1',
    ingredients: 'test ingredients',
    directions: 'test directions',
    source: 'test source',
    date: 'test date'
  };

  const testRecipe2 = {
    name: 'test2',
    ingredients: 'test ingredients',
    directions: 'test directions',
    source: 'test source',
    date: 'test date'
  };

  const testRecipe3 = {
    name: 'test3',
    ingredients: 'test ingredients',
    directions: 'test directions',
    source: 'test source',
    date: 'test date'
  };

  it('creates a recipe', () => {
    return request(app)
      .post('/api/v1/recipes')
      .send(
        testRecipe1
      )
      .then(res => {
        expect(res.body).toEqual({
          ...testRecipe1,
          id: expect.any(String),
        });
      });
  });

  it('gets one recipe by id', async () => {
    await Promise.all([
      testRecipe1,
      testRecipe2,
      testRecipe3
    ].map(recipe => Recipe.insert(recipe)));

    return request(app)
      .get('/api/v1/recipes/1')
      .then(res => {
        expect(res.body).toEqual({
          ...testRecipe1,
          id: expect.any(String),
        });
      });
  });

  it('gets all recipes', async () => {
    const recipes = await Promise.all([
      testRecipe1,
      testRecipe2,
      testRecipe3
    ].map(recipe => Recipe.insert(recipe)));

    return request(app)
      .get('/api/v1/recipes')
      .then(res => {
        recipes.forEach(recipe => {
          expect(res.body).toContainEqual(recipe);
        });
      });
  });

  it('updates a recipe by id', async () => {
    const recipe = await Recipe.insert(testRecipe1);

    return request(app)
      .put(`/api/v1/recipes/${recipe.id}`)
      .send(testRecipe3)
      .then(res => {
        expect(res.body).toEqual({ ...testRecipe3, id: expect.any(String) });
      });
  });

  it('deletes a recipe by id', async () => {
    const createdRecipe = await Recipe.insert(
      testRecipe1
    );

    const response = await request(app)
      .delete(`/api/v1/recipes/${createdRecipe.id}`);

    expect(response.body).toEqual(createdRecipe);
  });
});
