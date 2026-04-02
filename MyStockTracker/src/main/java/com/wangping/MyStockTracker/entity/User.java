package com.wangping.MyStockTracker.entity;

import jakarta.persistence.*;
import lombok.Cleanup;
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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(unique = true, name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    @CreatedDate
    @CreationTimestamp
    private Instant createdAt;

}
