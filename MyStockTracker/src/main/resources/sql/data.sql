INSERT INTO stocks (symbol, company_name, exchange, sector)
VALUES ('IBM', 'IBM Corporation', 'NYSE', 'Information Technology');

INSERT INTO stocks (symbol, company_name, exchange, sector)
VALUES ('TSCO.LON', 'TESCO', 'LSE', 'Retail');

INSERT INTO user (email)
VALUES ('pingwang715@gmail.com');

INSERT INTO portfolios (user_id, stock_id, shares, purchase_price, purchase_date)
VALUES (1, 1, 100, 240.1200, '2026-03-25');

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES
    (1, '2026-03-26',  241.6700);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (1, '2026-03-25',  240.1200);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (1, '2026-03-24', 243.4800);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (1, '2026-03-23',  244.1200);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (1, '2026-03-20', 242.8600);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (1, '2026-03-19', 240.9300);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (1, '2026-03-18', 238.7400);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (1, '2026-03-17', 236.8100);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (1, '2026-03-16', 236.2100);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (1, '2026-03-13', 235.7800);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (2, '2026-03-26', 455.1000);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (2, '2026-03-25', 462.5000);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (2, '2026-03-24', 458.5000);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (2, '2026-03-23', 452.7000);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (2, '2026-03-20', 468.9000);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (2, '2026-03-19', 475.8000);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (2, '2026-03-18', 486.4000);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (2, '2026-03-17', 491.2000);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (2, '2026-03-16', 490.6000);

INSERT INTO stock_daily_prices(stock_id, price_date, close_price)
VALUES (2, '2026-03-13', 458.5000);

