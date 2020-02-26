package com.shipsummarry.controller;

import com.shipsummarry.controller.dto.SummarySearchRequest;
import com.shipsummarry.controller.dto.SummaryGenericDetails;
import com.shipsummarry.service.SummaryService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/summaries")
public class SummaryController {

    private final SummaryService summaryService;

    public SummaryController(SummaryService summaryService) {
        this.summaryService = summaryService;
    }

    @PostMapping("/search")
    public List<SummaryGenericDetails> getSummaries(@RequestBody SummarySearchRequest request) {
        return summaryService.getSummaries(request);
    }

}
