package com.example.FlowCare.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "periods")
public class Period {

    @Id
    private String id; // MongoDB ObjectId (stored as String)

    private String userId;
    private LocalDate startDate;
    private LocalDate endDate;
    private int cycleLength;
    private LocalDate nextPeriodStart;
    private String diary; // user notes / symptoms

    public Period() {}

    // --- Getters and setters ---
    public String getId() { return id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
        calculateNextPeriod();
    }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public int getCycleLength() { return cycleLength; }
    public void setCycleLength(int cycleLength) {
        this.cycleLength = cycleLength;
        calculateNextPeriod();
    }

    public LocalDate getNextPeriodStart() { return nextPeriodStart; }

    public String getDiary() { return diary; }
    public void setDiary(String diary) { this.diary = diary; }

    // --- Helper to calculate next period ---
    private void calculateNextPeriod() {
        if (startDate != null && cycleLength > 0) {
            this.nextPeriodStart = startDate.plusDays(cycleLength);
        }
    }
}
