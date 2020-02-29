package com.shipsummarry.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RecordTypeDto {

    private String typeEnum;
    private String typeName;
    private String typeGroup;
    private int priority;

}
