
package com.jobtracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobtracker.entity.JobApplication;
import com.jobtracker.enums.ApplicationStatus;

@Repository
public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByCompanyNameContainingIgnoreCase(String companyName);

    List<JobApplication> findByJobRoleContainingIgnoreCase(String jobRole);

    List<JobApplication> findByStatus(ApplicationStatus status);

    List<JobApplication> findByJobLocationContainingIgnoreCase(String jobLocation);

    long countByStatus(ApplicationStatus status);
}
