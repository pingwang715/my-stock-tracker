package com.wangping.MyStockTracker.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "customers")
public class Customer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Size(max = 100)
    @NotNull
    @Column(name = "name", nullable = false, length = 100, unique = true)
    private String name;

    @Column(unique = true, name = "email", nullable = false, length = 100)
    private String email;

    @Size(max = 500)
    @NotNull
    @Column(name = "password_hash", nullable = false, length = 500)
    private String passwordHash;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id", nullable = false)
    private Set<Role> roles = new LinkedHashSet<>();

}
