
package com.jobtracker.dto;

public class DashboardStats {

    private long totalApplications;
    private long applied;
    private long shortlisted;
    private long interviews;
    private long selected;
    private long rejected;

    public DashboardStats(long totalApplications, long applied,
                          long shortlisted, long interviews,
                          long selected, long rejected) {
        this.totalApplications = totalApplications;
        this.applied = applied;
        this.shortlisted = shortlisted;
        this.interviews = interviews;
        this.selected = selected;
        this.rejected = rejected;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public long getApplied() {
        return applied;
    }

    public long getShortlisted() {
        return shortlisted;
    }

    public long getInterviews() {
        return interviews;
    }

    public long getSelected() {
        return selected;
    }

    public long getRejected() {
        return rejected;
    }
}
