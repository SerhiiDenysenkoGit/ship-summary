package com.shipsummarry.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SummaryGenericDetails {

    private int summaryId;
    private String date;
    private Double longitude;
    private Double latitude;
}
