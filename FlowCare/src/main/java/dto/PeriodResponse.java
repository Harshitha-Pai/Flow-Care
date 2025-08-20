package dto;

import com.example.FlowCare.Entity.Period;
import java.time.LocalDate;

public class PeriodResponse {
    private Period period;
    private LocalDate nextPeriodStart;

    public PeriodResponse(Period period, LocalDate nextPeriodStart) {
        this.period = period;
        this.nextPeriodStart = nextPeriodStart;
    }

    public Period getPeriod() {
        return period;
    }

    public LocalDate getNextPeriodStart() {
        return nextPeriodStart;
    }
}