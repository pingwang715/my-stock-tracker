package com.wangping.MyStockTracker.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class PortfolioRequestDto {

    @NotBlank(message = "Symbol cannot be empty")
    @Size(min = 3, max = 20, message = "Symbol must be between 3 and 20 characters")
    private String symbol;

    @NotNull(message = "Shares cannot be empty")
    @Min(value = 1, message = "Shares must be at least 1")
    @Max(value = 1000, message = "Shares must be at most 1000")
    private Integer shares;

    @NotNull(message = "Purchase price cannot be empty")
    @DecimalMin(value = "1", message = "Shares must be at least 1")
    @DecimalMax(value = "1000", message = "Shares must be at most 1000")
    @Digits(integer = 4, fraction = 4)
    private BigDecimal purchasePrice;

    @NotNull(message = "Purchase date cannot be empty")
    @PastOrPresent(message = "Purchase date cannot be in the future")
    private LocalDate purchaseDate;
}
