
package com.jobtracker.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobtracker.dto.DashboardStats;
import com.jobtracker.entity.JobApplication;
import com.jobtracker.enums.ApplicationStatus;
import com.jobtracker.service.JobApplicationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobApplicationController {

    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    @PostMapping
    public JobApplication addJob(@Valid @RequestBody JobApplication job) {
        return service.addJob(job);
    }

    @GetMapping
    public List<JobApplication> getAllJobs() {
        return service.getAllJobs();
    }

    @GetMapping("/{id}")
    public JobApplication getJobById(@PathVariable Long id) {
        return service.getJobById(id);
    }

    @PutMapping("/{id}")
    public JobApplication updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobApplication job) {
        return service.updateJob(id, job);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {
        service.deleteJob(id);
        return ResponseEntity.ok("Job application deleted successfully.");
    }

    @GetMapping("/search/company")
    public List<JobApplication> searchByCompany(
            @RequestParam String company) {
        return service.searchByCompany(company);
    }

    @GetMapping("/search/role")
    public List<JobApplication> searchByRole(
            @RequestParam String role) {
        return service.searchByRole(role);
    }

    @GetMapping("/filter/status")
    public List<JobApplication> filterByStatus(
            @RequestParam ApplicationStatus status) {
        return service.filterByStatus(status);
    }

    @GetMapping("/search/location")
    public List<JobApplication> searchByLocation(
            @RequestParam String location) {
        return service.searchByLocation(location);
    }

    @GetMapping("/dashboard")
    public DashboardStats getDashboardStats() {
        return service.getDashboardStats();
    }

    // Pagination and sorting
    @GetMapping("/page")
    public Page<JobApplication> getJobsWithPagination(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "appliedDate") String sortBy,

            @RequestParam(defaultValue = "desc") String direction) {

        // Prevent invalid page and size values
        if (page < 0 || size < 1 || size > 100) {
            throw new IllegalArgumentException(
                    "Page must be 0 or greater and size must be between 1 and 100."
            );
        }

        // Allow sorting only by valid entity fields
        List<String> allowedFields = List.of(
                "id",
                "companyName",
                "jobRole",
                "jobLocation",
                "status",
                "appliedDate",
                "interviewDate"
        );

        if (!allowedFields.contains(sortBy)) {
            throw new IllegalArgumentException("Invalid sorting field: " + sortBy);
        }

        Sort.Direction sortDirection =
                direction.equalsIgnoreCase("asc")
                        ? Sort.Direction.ASC
                        : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortDirection, sortBy)
        );

        return service.getJobsWithPagination(pageable);
    }
}
