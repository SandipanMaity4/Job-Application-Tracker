
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    BriefcaseBusiness,
    Plus,
    Pencil,
    Trash2,
    X,
    LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const emptyForm = {
    companyName: "",
    jobRole: "",
    jobLocation: "",
    jobType: "FULL_TIME",
    status: "APPLIED",
    appliedDate: new Date().toISOString().split("T")[0],
    interviewDate: "",
    jobLink: "",
    notes: ""
};

function Applications() {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await API.get("/jobs");
            setJobs(response.data);
            setError("");
        } catch (err) {
            setError("Unable to load applications.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const openAddForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setShowForm(true);
        setError("");
    };

    const openEditForm = (job) => {
        setFormData({
            companyName: job.companyName || "",
            jobRole: job.jobRole || "",
            jobLocation: job.jobLocation || "",
            jobType: job.jobType?.toUpperCase().replaceAll(" ", "_") || "FULL_TIME",
            status: job.status || "APPLIED",
            appliedDate: job.appliedDate || "",
            interviewDate: job.interviewDate || "",
            jobLink: job.jobLink || "",
            notes: job.notes || job.jobDescription || ""
        });

        setEditingId(job.id);
        setShowForm(true);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        const payload = {
            ...formData,
            interviewDate: formData.interviewDate || null
        };

        try {
            if (editingId) {
                await API.put(`/jobs/${editingId}`, payload);
            } else {
                await API.post("/jobs", payload);
            }

            setShowForm(false);
            setFormData(emptyForm);
            setEditingId(null);
            await fetchJobs();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Unable to save application. Check the entered details."
            );
        } finally {
            setSaving(false);
        }
    };

    const deleteJob = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmed) return;

        try {
            await API.delete(`/jobs/${id}`);
            await fetchJobs();
        } catch (err) {
            setError("Unable to delete application.");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <h2 className="sidebar-logo">JobTracker</h2>

                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="nav-link">
                        <LayoutDashboard size={19} />
                        Dashboard
                    </Link>

                    <Link to="/applications" className="nav-link active">
                        <BriefcaseBusiness size={19} />
                        Applications
                    </Link>
                </nav>

                <button className="logout-button" onClick={logout}>
                    <LogOut size={19} />
                    Logout
                </button>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div>
                        <h1>Applications</h1>
                        <p>Manage and track all your job applications.</p>
                    </div>

                    <button
                        className="add-job-button"
                        onClick={openAddForm}
                    >
                        <Plus size={18} />
                        Add Application
                    </button>
                </header>

                {error && (
                    <div className="error-message">{error}</div>
                )}

                {showForm && (
                    <section className="recent-section application-form-section">
                        <div className="section-heading">
                            <div>
                                <h2>
                                    {editingId ? "Edit Application" : "Add New Application"}
                                </h2>
                                <p>Enter your job application details.</p>
                            </div>

                            <button
                                className="close-form-button"
                                onClick={() => setShowForm(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form className="job-form" onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Company Name *</label>
                                    <input
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="e.g. TCS"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Job Role *</label>
                                    <input
                                        name="jobRole"
                                        value={formData.jobRole}
                                        onChange={handleChange}
                                        placeholder="e.g. Java Developer"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Location *</label>
                                    <input
                                        name="jobLocation"
                                        value={formData.jobLocation}
                                        onChange={handleChange}
                                        placeholder="e.g. Kolkata"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Job Type</label>
                                    <select
                                        name="jobType"
                                        value={formData.jobType}
                                        onChange={handleChange}
                                    >
                                        <option value="FULL_TIME">Full Time</option>
                                        <option value="PART_TIME">Part Time</option>
                                        <option value="INTERNSHIP">Internship</option>
                                        <option value="CONTRACT">Contract</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Application Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="APPLIED">Applied</option>
                                        <option value="INTERVIEW">Interview</option>
                                        <option value="OFFER">Offer</option>
                                        <option value="REJECTED">Rejected</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Applied Date *</label>
                                    <input
                                        type="date"
                                        name="appliedDate"
                                        value={formData.appliedDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Interview Date</label>
                                    <input
                                        type="date"
                                        name="interviewDate"
                                        value={formData.interviewDate}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Job Link</label>
                                    <input
                                        type="url"
                                        name="jobLink"
                                        value={formData.jobLink}
                                        onChange={handleChange}
                                        placeholder="https://company.com/careers"
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Notes / Description</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Add additional details..."
                                        rows="3"
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="add-job-button"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId
                                            ? "Update Application"
                                            : "Save Application"}
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                <section className="recent-section">
                    <div className="section-heading">
                        <div>
                            <h2>All Applications</h2>
                            <p>{jobs.length} applications found</p>
                        </div>
                    </div>

                    {loading ? (
                        <p className="empty-message">Loading applications...</p>
                    ) : jobs.length === 0 ? (
                        <div className="empty-message">
                            <BriefcaseBusiness size={35} />
                            <h3>No applications found</h3>
                            <p>Click Add Application to get started.</p>
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
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {jobs.map((job) => (
                                        <tr key={job.id}>
                                            <td>
                                                <div className="company-cell">
                                                    <BriefcaseBusiness size={18} />
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

                                            <td>{job.appliedDate || "-"}</td>

                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="edit-button"
                                                        onClick={() => openEditForm(job)}
                                                        title="Edit"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>

                                                    <button
                                                        className="delete-button"
                                                        onClick={() => deleteJob(job.id)}
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
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

export default Applications;
