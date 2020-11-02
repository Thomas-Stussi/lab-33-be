DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  ingredients VARCHAR,
  directions VARCHAR,
  source VARCHAR,
  date VARCHAR
);
