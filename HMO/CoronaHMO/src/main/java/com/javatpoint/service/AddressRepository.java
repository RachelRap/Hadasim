package com.javatpoint.service;

import com.javatpoint.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface AddressRepository extends JpaRepository <Address,Long>{
}
