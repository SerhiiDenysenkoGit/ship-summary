package com.shipsummarry.service;

import com.shipsummarry.controller.dto.SummarySearchRequest;
import com.shipsummarry.controller.dto.SummaryGenericDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class SummaryService {

    public List<SummaryGenericDetails> getSummaries(SummarySearchRequest request) {
        return Collections.emptyList();
    }

}
