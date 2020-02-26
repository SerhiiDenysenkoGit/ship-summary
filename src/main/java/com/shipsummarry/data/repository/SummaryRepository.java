package com.shipsummarry.data.repository;

import com.shipsummarry.data.entity.Summary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SummaryRepository extends JpaRepository<Summary, Integer>, JpaSpecificationExecutor<Summary> {

}
