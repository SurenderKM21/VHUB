package com.vhub.v1.repository;

import com.vhub.v1.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CustomerRepo extends JpaRepository<Customer,Integer> {

     
}
