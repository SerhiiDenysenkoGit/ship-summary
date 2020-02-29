package com.shipsummarry.data.dto;

import com.shipsummarry.data.entity.RecordType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordAverageData {

    private RecordType name;
    private String typeName;
    private Double dayAvg;

}
