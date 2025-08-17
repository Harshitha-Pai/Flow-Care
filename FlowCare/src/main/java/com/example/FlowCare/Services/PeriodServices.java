package com.example.FlowCare.Services;

import com.example.FlowCare.Entity.Period;
import com.example.FlowCare.Repository.PeriodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PeriodServices {

    @Autowired
    private PeriodRepository periodRepository;

    // Add a new period entry
    public Period addPeriod(String userId, Period period) {
        period.setUserId(userId);
        return periodRepository.save(period);
    }

    // Get all period entries for a user
    public List<Period> getPeriodsByUser(String userId) {
        return periodRepository.findByUserId(userId);
    }

    // Update an existing period entry
    public Period updatePeriod(String periodId, Period updatedPeriod) {
        Optional<Period> existingPeriodOpt = periodRepository.findById(periodId);

        if (existingPeriodOpt.isPresent()) {
            Period existingPeriod = existingPeriodOpt.get();
            existingPeriod.setStartDate(updatedPeriod.getStartDate());
            existingPeriod.setEndDate(updatedPeriod.getEndDate());
            existingPeriod.setCycleLength(updatedPeriod.getCycleLength());
            existingPeriod.setDiary(updatedPeriod.getDiary()); // ✅ updated diary
            return periodRepository.save(existingPeriod);
        } else {
            throw new RuntimeException("Period not found with id: " + periodId);
        }
    }

    // Delete a period entry
    public void deletePeriod(Long periodId) {
        if (!periodRepository.existsById(String.valueOf(periodId))) {
            throw new RuntimeException("Period not found with id: " + periodId);
        }
        periodRepository.deleteById(String.valueOf(periodId));
    }
}
