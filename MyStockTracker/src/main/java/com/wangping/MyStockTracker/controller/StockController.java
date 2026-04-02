package com.wangping.MyStockTracker.controller;

import com.wangping.MyStockTracker.dto.StockDto;
import com.wangping.MyStockTracker.dto.StockRequestDto;
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
    public ResponseEntity<String> addStockPrice(@RequestBody StockRequestDto stockRequestDto){
        iStockService.saveStockPrice(stockRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Saved stock price successfully");
    }

    @GetMapping
    public ResponseEntity<List<StockDto>> getStocks() {
        List<StockDto> stockList = iStockService.getStocks();
        return ResponseEntity.ok().body(stockList);
    }

}
