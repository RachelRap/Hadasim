package com.javatpoint.service;

import com.javatpoint.model.Corona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface CoronaRepository extends JpaRepository <Corona,Long> {
}
