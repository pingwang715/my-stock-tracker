package com.wangping.MyStockTracker.service;

import com.wangping.MyStockTracker.dto.StockDto;
import com.wangping.MyStockTracker.dto.StockRequestDto;

import java.util.List;

public interface IStockService {

    void saveStockPrice(StockRequestDto stockRequestDto);
    List<StockDto> getStocks();
}
