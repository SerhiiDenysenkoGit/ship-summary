package com.shipsummarry.data.repository;

import com.shipsummarry.data.entity.SummaryRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SummaryRecordRepository extends JpaRepository<SummaryRecord, Integer>, JpaSpecificationExecutor<SummaryRecord> {
}
