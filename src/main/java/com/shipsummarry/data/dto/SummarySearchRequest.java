package com.shipsummarry.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SummarySearchRequest {

    private int page;
    private int pageSize;
    private String date;

}
