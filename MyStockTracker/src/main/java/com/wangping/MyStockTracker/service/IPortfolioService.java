package com.wangping.MyStockTracker.service;

import com.wangping.MyStockTracker.dto.PortfolioRequestDto;
import com.wangping.MyStockTracker.dto.PortfolioResponseDto;

import java.util.List;

public interface IPortfolioService {
    List<PortfolioResponseDto> getPortfolios();
    void savePortfolio(PortfolioRequestDto portfolioRequestDto);
    void deletePortfolio(Long id);
}
