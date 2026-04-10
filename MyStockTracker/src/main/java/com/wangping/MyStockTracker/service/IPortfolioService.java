package com.wangping.MyStockTracker.service;

import com.wangping.MyStockTracker.dto.PortfolioRequestDto;
import com.wangping.MyStockTracker.dto.PortfolioResponseDto;
import com.wangping.MyStockTracker.entity.Customer;

import java.util.List;

public interface IPortfolioService {
    List<PortfolioResponseDto> getPortfolios(Customer customer);
    void savePortfolio(PortfolioRequestDto portfolioRequestDto, Customer customer);
    void deletePortfolio(Long id, Customer customer);
}
