package com.wangping.MyStockTracker.repository;

import com.wangping.MyStockTracker.entity.Customer;
import com.wangping.MyStockTracker.entity.Portfolio;
import com.wangping.MyStockTracker.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio,Long> {
    List<Portfolio> findByCustomer(Customer customer);
}
