package com.wangping.MyStockTracker.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "stocks")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STOCK_ID", nullable = false)
    private Long id;

    @Column(name = "SYMBOL", nullable = false, length = 20, unique = true)
    private String symbol;

    @Column(name = "COMPANY_NAME",  length = 255)
    private String company_name;

    @Column(name = "EXCHANGE", length = 50)
    private String exchange;

    @Column(name = "SECTOR", length = 100)
    private String sector;

    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    @CreatedDate
    @CreationTimestamp
    private Instant createdAt;

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StockDailyPrice> dailyPrices = new ArrayList<>();

    @OneToMany(mappedBy = "stock", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Portfolio> portfolios = new ArrayList<>();

}
