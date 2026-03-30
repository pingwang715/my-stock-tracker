CREATE TABLE IF NOT EXISTS stocks (
    stock_id     BIGINT AUTO_INCREMENT PRIMARY KEY,
    symbol       VARCHAR(20)  NOT NULL,
    company_name VARCHAR(255),
    exchange     VARCHAR(50),               -- e.g. NASDAQ, NYSE
    sector       VARCHAR(100),
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (symbol)
    );

CREATE TABLE IF NOT EXISTS users (
    user_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    email      VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (email)
    );

CREATE TABLE IF NOT EXISTS stock_daily_prices (
    price_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    stock_id    BIGINT NOT NULL,
    price_date  DATE   NOT NULL,

    close_price DECIMAL(12, 4),

    FOREIGN KEY (stock_id) REFERENCES stocks (stock_id) ON DELETE CASCADE,
    UNIQUE KEY (stock_id, price_date)
    );
CREATE INDEX idx_sdp_price_date ON stock_daily_prices (price_date);

CREATE TABLE If NOT EXISTS favorites (
    favorite_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT NOT NULL,
    stock_id    BIGINT NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)  REFERENCES users  (user_id) ON DELETE CASCADE,
    FOREIGN KEY (stock_id) REFERENCES stocks (stock_id) ON DELETE CASCADE,

    UNIQUE (user_id, stock_id)
    );
CREATE INDEX idx_fav_user_id ON favorites (user_id);
CREATE INDEX idx_fav_stock_id ON favorites (stock_id);

CREATE TABLE IF NOT EXISTS portfolios (
    portfolio_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id      BIGINT NOT NULL,
    stock_id     BIGINT NOT NULL,

    shares          DECIMAL(12, 4) NOT NULL,
    purchase_price  DECIMAL(12, 4) NOT NULL,
    purchase_date   DATE           NOT NULL,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)  REFERENCES users  (user_id) ON DELETE CASCADE,
    FOREIGN KEY (stock_id) REFERENCES stocks (stock_id) ON DELETE CASCADE
    );
CREATE INDEX idx_port_user_id ON portfolios (user_id);
CREATE INDEX idx_port_stock_id ON portfolios (stock_id);