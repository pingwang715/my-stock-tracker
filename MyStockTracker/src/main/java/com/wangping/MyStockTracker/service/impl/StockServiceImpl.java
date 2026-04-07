package com.wangping.MyStockTracker.service.impl;

import com.wangping.MyStockTracker.dto.StockDto;
import com.wangping.MyStockTracker.dto.StockRequestDto;
import com.wangping.MyStockTracker.dto.StockResponseDto;
import com.wangping.MyStockTracker.entity.Stock;
import com.wangping.MyStockTracker.entity.StockDailyPrice;
import com.wangping.MyStockTracker.repository.StockDailyPriceRepository;
import com.wangping.MyStockTracker.repository.StockRepository;
import com.wangping.MyStockTracker.service.IStockService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
public class StockServiceImpl implements IStockService {

    private final StockRepository stockRepository;

    @Override
    public StockResponseDto saveStock(StockRequestDto stockRequestDto) {
        Stock stock = stockRepository.findBySymbol(stockRequestDto.getSymbol())
                .orElseGet(() -> {
                    Stock newStock = new Stock();
                    newStock.setSymbol(stockRequestDto.getSymbol());
                    return stockRepository.save(newStock);
                });
        StockResponseDto stockResponseDto = new StockResponseDto();
        stockResponseDto.setStockId(stock.getId());
        stockResponseDto.setSymbol(stock.getSymbol());
        return stockResponseDto;
    }

    @Override
    public List<StockDto> getStocks() {
        return stockRepository.findAll().stream().map(this::transformToDTO).collect(Collectors.toList());
    }

    private StockDto transformToDTO(Stock stock) {
        StockDto stockDto = new StockDto();
        BeanUtils.copyProperties(stock, stockDto);
        stockDto.setStockId(stock.getId());
        return stockDto;
    }
}
