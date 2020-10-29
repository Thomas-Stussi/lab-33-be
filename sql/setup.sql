DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  ingredients JSONB,
  directions VARCHAR,
  source VARCHAR,
  date VARCHAR
);
