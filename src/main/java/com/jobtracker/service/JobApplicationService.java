
package com.jobtracker.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.jobtracker.dto.DashboardStats;
import com.jobtracker.entity.JobApplication;
import com.jobtracker.enums.ApplicationStatus;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.repository.JobApplicationRepository;

@Service
public class JobApplicationService {

    private final JobApplicationRepository repository;

    public JobApplicationService(JobApplicationRepository repository) {
        this.repository = repository;
    }

    public JobApplication addJob(JobApplication job) {
        return repository.save(job);
    }

    public List<JobApplication> getAllJobs() {
        return repository.findAll();
    }

    public JobApplication getJobById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Job application not found with ID: " + id
                        ));
    }

    public JobApplication updateJob(Long id, JobApplication updatedJob) {

        JobApplication existingJob = getJobById(id);

        existingJob.setCompanyName(updatedJob.getCompanyName());
        existingJob.setJobRole(updatedJob.getJobRole());
        existingJob.setJobLocation(updatedJob.getJobLocation());
        existingJob.setJobType(updatedJob.getJobType());
        existingJob.setStatus(updatedJob.getStatus());
        existingJob.setAppliedDate(updatedJob.getAppliedDate());
        existingJob.setInterviewDate(updatedJob.getInterviewDate());
        existingJob.setJobDescription(updatedJob.getJobDescription());

        return repository.save(existingJob);
    }

    public void deleteJob(Long id) {
        JobApplication job = getJobById(id);
        repository.delete(job);
    }

    // Search by company
    public List<JobApplication> searchByCompany(String companyName) {
        return repository.findByCompanyNameContainingIgnoreCase(companyName);
    }

    // Search by role
    public List<JobApplication> searchByRole(String jobRole) {
        return repository.findByJobRoleContainingIgnoreCase(jobRole);
    }

    // Filter by status
    public List<JobApplication> filterByStatus(ApplicationStatus status) {
        return repository.findByStatus(status);
    }

    // Search by location
    public List<JobApplication> searchByLocation(String location) {
        return repository.findByJobLocationContainingIgnoreCase(location);
    }

    // Dashboard statistics
    public DashboardStats getDashboardStats() {

        long total = repository.count();

        long applied = repository.countByStatus(ApplicationStatus.APPLIED);
        long shortlisted = repository.countByStatus(ApplicationStatus.SHORTLISTED);
        long interviews = repository.countByStatus(ApplicationStatus.INTERVIEW);
        long selected = repository.countByStatus(ApplicationStatus.SELECTED);
        long rejected = repository.countByStatus(ApplicationStatus.REJECTED);

        return new DashboardStats(
                total, applied, shortlisted, interviews, selected, rejected
        );
    }

    // Pagination and sorting
    public Page<JobApplication> getJobsWithPagination(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
