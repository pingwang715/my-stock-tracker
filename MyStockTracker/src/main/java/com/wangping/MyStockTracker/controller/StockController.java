package com.wangping.MyStockTracker.controller;

import com.wangping.MyStockTracker.dto.StockDto;
import com.wangping.MyStockTracker.dto.StockRequestDto;
import com.wangping.MyStockTracker.dto.StockResponseDto;
import com.wangping.MyStockTracker.entity.Stock;
import com.wangping.MyStockTracker.service.IStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/stocks")
@RequiredArgsConstructor
public class StockController {

    private final IStockService iStockService;

    @PostMapping
    public ResponseEntity<StockResponseDto> addStock(@RequestBody StockRequestDto stockRequestDto){
        StockResponseDto savedStock = iStockService.saveStock(stockRequestDto);
        return ResponseEntity.ok(savedStock);
    }

    @GetMapping
    public ResponseEntity<List<StockDto>> getStocks() {
        List<StockDto> stockList = iStockService.getStocks();
        return ResponseEntity.ok().body(stockList);
    }

}
