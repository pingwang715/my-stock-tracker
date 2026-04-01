package com.wangping.MyStockTracker.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class PortfolioRequestDto {
    private Long userId;
    private String symbol;
    private BigDecimal shares;
    private BigDecimal purchasePrice;
    private LocalDate purchaseDate;
}
