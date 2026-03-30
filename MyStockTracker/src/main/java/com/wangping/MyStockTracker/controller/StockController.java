package com.wangping.MyStockTracker.controller;

import com.wangping.MyStockTracker.dto.StockDto;
import com.wangping.MyStockTracker.dto.StockRequestDto;
import com.wangping.MyStockTracker.service.IStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/stocks")
@RequiredArgsConstructor
public class StockController {

    private final IStockService iStockService;

    @PostMapping
    public ResponseEntity<?> addStockPrice(@RequestBody StockRequestDto stockRequestDto){
        iStockService.saveStockPrice(stockRequestDto);
        return ResponseEntity.ok("Saved stock price successfully");
    }

    @GetMapping
    public List<StockDto> getStocks() throws InterruptedException{
        List<StockDto> stockList = iStockService.getStocks();
        return stockList;
    }

}
