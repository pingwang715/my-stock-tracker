INSERT INTO stocks (symbol, company_name, exchange, sector)
VALUES ('IBM', 'IBM Corporation', 'NYSE', 'Information Technology');

INSERT INTO stocks (symbol, company_name, exchange, sector)
VALUES ('TSCO.LON', 'TESCO', 'LSE', 'Retail');

INSERT INTO user (email)
VALUES ('pingwang715@gmail.com');

INSERT INTO portfolios (user_id, stock_id, shares, purchase_price, purchase_date)
VALUES (1, 1, 100, 240.1200, '2026-03-25');

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES
    (1, '2026-03-26', 240.5600, 246.6742, 239.8000, 241.6700, 3606840);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (1, '2026-03-25', 242.9000, 244.8500, 239.3500, 240.1200, 3295400);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (1, '2026-03-24', 244.3000, 246.0000, 241.5500, 243.4800, 3018200);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (1, '2026-03-23', 243.7000, 245.9100, 242.4000, 244.1200, 3187400);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (1, '2026-03-20', 241.1000, 243.9200, 239.7500, 242.8600, 3562100);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (1, '2026-03-19', 238.8000, 241.7600, 237.6400, 240.9300, 3321900);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (1, '2026-03-18', 236.5000, 239.8200, 235.9900, 238.7400, 2948300);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (1, '2026-03-17', 237.1000, 238.9200, 234.7000, 236.8100, 2875600);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (1, '2026-03-16', 235.9800, 237.4000, 233.8500, 236.2100, 2654400);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (1, '2026-03-13', 233.6400, 236.2000, 232.7700, 235.7800, 2483700);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (2, '2026-03-26', 462.0000, 464.4000, 454.7000, 455.1000, 9040217);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (2, '2026-03-25', 464.0000, 464.0620, 454.4000, 462.5000, 9754901);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (2, '2026-03-24', 458.5000, 459.1000, 450.5000, 458.5000, 10321080);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (2, '2026-03-23', 465.4000, 465.4000, 452.7000, 452.7000, 15886220);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (2, '2026-03-20', 479.2000, 483.8000, 463.7860, 468.9000, 39842191);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (2, '2026-03-19', 480.4000, 484.4000, 472.8000, 475.8000, 14980430);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (2, '2026-03-18', 489.7000, 492.3000, 484.3000, 486.4000, 12086490);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (2, '2026-03-17', 493.6000, 496.5000, 489.1000, 491.2000, 7595540);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (2, '2026-03-16', 488.9000, 495.6000, 487.4000, 490.6000, 8153389);

INSERT INTO stock_daily_prices(stock_id, price_date, open_price, high_price, low_price, close_price, volume)
VALUES (2, '2026-03-13', 475.2000, 459.1000, 450.5000, 458.5000, 10321080);

