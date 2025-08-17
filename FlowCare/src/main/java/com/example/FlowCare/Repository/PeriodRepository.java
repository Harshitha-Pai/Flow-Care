package com.example.FlowCare.Repository;

import com.example.FlowCare.Entity.Period;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PeriodRepository extends MongoRepository<Period, String> {
    List<Period> findByUserId(String userId);
}