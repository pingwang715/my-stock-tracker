package com.wangping.MyStockTracker.repository;

import com.wangping.MyStockTracker.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio,Long> {

}
