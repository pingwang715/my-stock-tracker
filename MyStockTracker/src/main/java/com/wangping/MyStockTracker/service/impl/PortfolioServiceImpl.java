package com.wangping.MyStockTracker.service.impl;

import com.wangping.MyStockTracker.dto.PortfolioRequestDto;
import com.wangping.MyStockTracker.dto.PortfolioResponseDto;
import com.wangping.MyStockTracker.entity.Customer;
import com.wangping.MyStockTracker.entity.Portfolio;
import com.wangping.MyStockTracker.entity.Stock;
import com.wangping.MyStockTracker.repository.PortfolioRepository;
import com.wangping.MyStockTracker.repository.StockRepository;
import com.wangping.MyStockTracker.repository.CustomerRepository;
import com.wangping.MyStockTracker.service.IPortfolioService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.sound.sampled.Port;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements IPortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final StockRepository stockRepository;


    @Override
    public List<PortfolioResponseDto> getPortfolios(Customer customer) {
        return portfolioRepository.findByCustomer(customer).stream().map(this::transformToDTO).collect(Collectors.toList());
    }

    private PortfolioResponseDto transformToDTO(Portfolio portfolio) {
        PortfolioResponseDto portfolioResponseDto = new PortfolioResponseDto();
        portfolioResponseDto.setShares(portfolio.getShares());
        portfolioResponseDto.setPortfolioId(portfolio.getPortfolioId());
        portfolioResponseDto.setSymbol(portfolio.getStock().getSymbol());
        portfolioResponseDto.setPurchasePrice(portfolio.getPurchasePrice());
        portfolioResponseDto.setPurchaseDate(portfolio.getPurchaseDate());

        return portfolioResponseDto;
    }

    @Override
    public void savePortfolio(PortfolioRequestDto portfolioRequestDto, Customer customer) {

        Stock stock = stockRepository.findBySymbol(portfolioRequestDto.getSymbol())
                .orElseGet(() -> {
                    Stock newStock = new Stock();
                    newStock.setSymbol(portfolioRequestDto.getSymbol());
                    return stockRepository.save(newStock);
                });

        Portfolio portfolio = new Portfolio();
        portfolio.setStock(stock);
        portfolio.setCustomer(customer);
        portfolio.setShares(portfolioRequestDto.getShares());
        portfolio.setPurchasePrice(portfolioRequestDto.getPurchasePrice());
        portfolio.setPurchaseDate(portfolioRequestDto.getPurchaseDate());
        portfolio.setCreatedAt(Instant.now());

        portfolioRepository.save(portfolio);

    }

    @Override
    public void deletePortfolio(Long id, Customer customer) {
        Portfolio portfolio = portfolioRepository.findById(id).orElseThrow(()  -> new RuntimeException("Portfolio not found" + id));
        if (!portfolio.getCustomer().getCustomerId().equals(customer.getCustomerId())) {
            throw new RuntimeException("Forbidden");
        }
        portfolioRepository.delete(portfolio);
    }
}
