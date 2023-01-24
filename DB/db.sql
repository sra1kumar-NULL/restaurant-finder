CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location  VARCHAR(50) NOT NULL,
    price_range INTEGER NOT NULL check(price_range>=1 and price_range<=5)
);
