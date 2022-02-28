CREATE TABLE IF NOT EXISTS user_database (
  username VARCHAR(30),     
  pword VARCHAR(30),  
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(30),
  lastname VARCHAR(30)
);