package com.wangping.MyStockTracker.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class StockRequestDto {

    private String symbol;
    private BigDecimal closePrice;
    private LocalDate priceDate;
}
