package com.wangping.MyStockTracker.service;

import com.wangping.MyStockTracker.dto.StockDto;
import com.wangping.MyStockTracker.dto.StockRequestDto;
import com.wangping.MyStockTracker.dto.StockResponseDto;

import java.util.List;

public interface IStockService {

    StockResponseDto saveStock(StockRequestDto stockRequestDto);
    List<StockDto> getStocks();
}
