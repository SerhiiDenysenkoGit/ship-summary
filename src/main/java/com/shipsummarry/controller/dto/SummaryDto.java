package com.shipsummarry.controller.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.shipsummarry.service.util.CustomStringDoubleDeserializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SummaryDto {

    private int summaryId;
    private String date;
    @JsonDeserialize(using = CustomStringDoubleDeserializer.class)
    private Double longitude;
    @JsonDeserialize(using = CustomStringDoubleDeserializer.class)
    private Double latitude;
    @JsonDeserialize(using = CustomStringDoubleDeserializer.class)
    private Double speed;
    private String heading;
    private String mode;
    @JsonDeserialize(using = CustomStringDoubleDeserializer.class)
    private Double trawlingCount;
    private String comments;

    private List<SummaryRecordDto> summaryRecords;

}
