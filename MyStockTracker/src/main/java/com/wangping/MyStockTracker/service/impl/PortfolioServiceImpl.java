package com.wangping.MyStockTracker.service.impl;

import com.wangping.MyStockTracker.dto.PortfolioRequestDto;
import com.wangping.MyStockTracker.dto.PortfolioResponseDto;
import com.wangping.MyStockTracker.dto.StockDto;
import com.wangping.MyStockTracker.entity.Portfolio;
import com.wangping.MyStockTracker.entity.Stock;
import com.wangping.MyStockTracker.entity.User;
import com.wangping.MyStockTracker.repository.PortfolioRepository;
import com.wangping.MyStockTracker.repository.StockRepository;
import com.wangping.MyStockTracker.repository.UserRepository;
import com.wangping.MyStockTracker.service.IPortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements IPortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final StockRepository stockRepository;
    private final UserRepository userRepository;

    @Override
    public List<PortfolioResponseDto> getPortfolios() {
        return portfolioRepository.findAll().stream().map(this::transformToDTO).collect(Collectors.toList());
    }

    private PortfolioResponseDto transformToDTO(Portfolio portfolio) {
        PortfolioResponseDto portfolioResponseDto = new PortfolioResponseDto();
        BeanUtils.copyProperties(portfolio, portfolioResponseDto);

        portfolioResponseDto.setSymbol(portfolio.getStock().getSymbol());
        return portfolioResponseDto;
    }

    @Override
    public void savePortfolio(PortfolioRequestDto portfolioRequestDto) {

        Stock stock = stockRepository.findBySymbol(portfolioRequestDto.getSymbol())
                .orElseGet(() -> {
                    Stock newStock = new Stock();
                    newStock.setSymbol(portfolioRequestDto.getSymbol());
                    return stockRepository.save(newStock);
                });

        Portfolio portfolio = new Portfolio();
        portfolio.setStock(stock);
        portfolio.setShares(portfolioRequestDto.getShares());
        portfolio.setPurchasePrice(portfolioRequestDto.getPurchasePrice());
        portfolio.setPurchaseDate(portfolioRequestDto.getPurchaseDate());
        portfolio.setCreatedAt(Instant.now());

        portfolioRepository.save(portfolio);
    }

    @Override
    public void deletePortfolio(Long id) {
        Portfolio portfolio = portfolioRepository.findById(id).orElseThrow(()  -> new RuntimeException("Portfolio not found" + id));
        portfolioRepository.delete(portfolio);
    }
}
