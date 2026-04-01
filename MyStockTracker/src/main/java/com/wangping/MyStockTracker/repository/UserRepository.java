package com.wangping.MyStockTracker.repository;

import com.wangping.MyStockTracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
