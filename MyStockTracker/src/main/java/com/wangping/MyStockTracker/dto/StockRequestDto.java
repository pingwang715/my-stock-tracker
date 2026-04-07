package com.wangping.MyStockTracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class StockRequestDto {

    @NotBlank(message = "Symbol cannot be empty")
    private String symbol;

}
