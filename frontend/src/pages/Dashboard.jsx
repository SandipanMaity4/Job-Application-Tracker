
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    BriefcaseBusiness,
    Send,
    CalendarCheck,
    CheckCircle,
    LogOut,
    Plus,
    Clock,
    Building2
} from "lucide-react";
import API from "../services/api";

function Dashboard() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await API.get("/jobs");
            setJobs(response.data);
        } catch (err) {
            setError("Unable to load applications. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const total = jobs.length;
    const applied = jobs.filter(job => job.status === "APPLIED").length;
    const interviews = jobs.filter(job => job.status === "INTERVIEW").length;
    const offers = jobs.filter(job => job.status === "OFFER").length;

    const stats = [
        { title: "Total Applications", value: total, icon: BriefcaseBusiness, color: "blue" },
        { title: "Applied", value: applied, icon: Send, color: "purple" },
        { title: "Interviews", value: interviews, icon: CalendarCheck, color: "orange" },
        { title: "Offers", value: offers, icon: CheckCircle, color: "green" }
    ];

    const recentJobs = [...jobs].reverse().slice(0, 5);

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <h2 className="sidebar-logo">JobTracker</h2>

                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="nav-link active">
                        <LayoutDashboard size={19} /> Dashboard
                    </Link>

                    <Link to="/applications" className="nav-link">
                        <BriefcaseBusiness size={19} /> Applications
                    </Link>
                </nav>

                <button className="logout-button" onClick={logout}>
                    <LogOut size={19} /> Logout
                </button>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Track and manage your job applications.</p>
                    </div>

                    <Link to="/applications" className="add-job-button">
                        <Plus size={18} /> Add Application
                    </Link>
                </header>

                <section className="stats-grid">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div className="stat-card" key={stat.title}>
                                <div className={`stat-icon ${stat.color}`}>
                                    <Icon size={23} />
                                </div>
                                <div>
                                    <p>{stat.title}</p>
                                    <h2>{loading ? "..." : stat.value}</h2>
                                </div>
                            </div>
                        );
                    })}
                </section>

                <section className="recent-section">
                    <div className="section-heading">
                        <div>
                            <h2>Recent Applications</h2>
                            <p>Your latest job application activity</p>
                        </div>

                        <Link to="/applications" className="view-all">
                            View All
                        </Link>
                    </div>

                    {loading ? (
                        <p className="empty-message">Loading applications...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : recentJobs.length === 0 ? (
                        <div className="empty-message">
                            <BriefcaseBusiness size={35} />
                            <h3>No applications yet</h3>
                            <p>Start tracking your job search today.</p>
                            <Link to="/applications" className="add-job-button">
                                <Plus size={17} /> Add Application
                            </Link>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="applications-table">
                                <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>Job Role</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                        <th>Applied Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentJobs.map((job) => (
                                        <tr key={job.id}>
                                            <td>
                                                <div className="company-cell">
                                                    <Building2 size={18} />
                                                    {job.companyName}
                                                </div>
                                            </td>
                                            <td>{job.jobRole}</td>
                                            <td>{job.jobLocation}</td>
                                            <td>
                                                <span className={`status-badge ${String(job.status).toLowerCase()}`}>
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td>
                                                <Clock size={14} />
                                                {job.appliedDate || "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
