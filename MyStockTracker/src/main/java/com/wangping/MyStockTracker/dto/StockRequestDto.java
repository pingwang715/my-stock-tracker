package com.wangping.MyStockTracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class StockRequestDto {

    @NotBlank(message = "Symbol cannot be empty")
    private String symbol;

    @NotBlank(message = "Close price cannot be empty")
    private BigDecimal closePrice;

    @NotBlank(message = "Price date cannot be empty")
    private LocalDate priceDate;
}
