package com.example.FlowCare.Controller;

import com.example.FlowCare.Entity.Period;
import com.example.FlowCare.Services.PeriodServices;
import dto.PeriodResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/periods")
@CrossOrigin(origins = "*")
public class PeriodController {

    @Autowired
    private PeriodServices periodService;

    // Add a period
    @PostMapping("/add")
    public PeriodResponse addPeriod(@RequestBody Period period, @RequestParam String userId) {
        Period savedPeriod = periodService.addPeriod(userId, period);

        // Predict next period (startDate + cycleLength days)
        LocalDate nextPeriodStart = null;
        if (savedPeriod.getStartDate() != null && savedPeriod.getCycleLength() > 0) {
            nextPeriodStart = savedPeriod.getStartDate().plusDays(savedPeriod.getCycleLength());
        }

        return new PeriodResponse(savedPeriod, nextPeriodStart);
    }

    // Get all periods for a user
    @GetMapping("/user")
    public List<Period> getPeriods(@RequestParam String userId) {
        return periodService.getPeriodsByUser(userId);
    }

    // Update a period
    @PutMapping("/update/{periodId}")
    public Period updatePeriod(
            @PathVariable String periodId,
            @RequestBody Period updatedPeriod
    ) {
        return periodService.updatePeriod(periodId, updatedPeriod);
    }

    // Delete a period
    @DeleteMapping("/delete/{periodId}")
    public String deletePeriod(@PathVariable String periodId) {
        periodService.deletePeriod(periodId);
        return "Period with ID " + periodId + " deleted successfully.";
    }

}
