package com.shipsummarry.data.dto;

import com.shipsummarry.data.entity.RecordType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PeriodSummaryInfo {

    private String fromDate;
    private String toDate;
    private int recordsQuantity;
    private Map<RecordType, List<RecordPeriodData>> stats;
    private List<RecordAverageData> avg;

}
