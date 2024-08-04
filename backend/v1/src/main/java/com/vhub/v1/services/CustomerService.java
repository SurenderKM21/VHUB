package com.vhub.v1.services;

import com.vhub.v1.repository.*;
import com.vhub.v1.model.*;

import java.util.List;
import java.util.Optional;

// import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    
    @Autowired
    CustomerRepo ur;
   
    public Customer create(Customer k)
    {
        return ur.save(k);
    }
    public List<Customer> getAllCustomer(){
        return ur.findAll();
    }

    public Optional<Customer> getCustomerById(int id) 
    {
        return ur.findById(id);
    }

    public Customer updateCustomer(int id, Customer u)
    {
        if (ur.existsById(id)) 
        {
            u.setId(id);
            return ur.save(u);
        }
        return null;
    }

    public boolean deleteCustomer(int id) 
    {
        if (ur.existsById(id))
        {
            ur.deleteById(id);
            return true;
        }
        return false;
    }
}
