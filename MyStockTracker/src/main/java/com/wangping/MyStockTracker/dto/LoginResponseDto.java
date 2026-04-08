package com.wangping.MyStockTracker.dto;

public record LoginResponseDto(String message, UserDto user, String jwtToken ) {
}
