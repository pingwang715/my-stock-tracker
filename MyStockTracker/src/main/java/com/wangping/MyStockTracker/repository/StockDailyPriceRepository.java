package com.wangping.MyStockTracker.repository;

import com.wangping.MyStockTracker.entity.StockDailyPrice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockDailyPriceRepository extends JpaRepository<StockDailyPrice,Long> {
}
