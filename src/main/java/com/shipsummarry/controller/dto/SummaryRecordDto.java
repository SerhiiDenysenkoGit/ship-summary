package com.shipsummarry.controller.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.shipsummarry.data.entity.RecordType;
import com.shipsummarry.service.util.CustomStringDoubleDeserializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SummaryRecordDto {

    private int summaryRecordId;

    private RecordType name;

    private String units;

    @JsonDeserialize(using = CustomStringDoubleDeserializer.class)
    private Double day;

    @JsonDeserialize(using = CustomStringDoubleDeserializer.class)
    private Double board;

}
