import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Auth.css'; // Reusing auth styles for consistency

const AwaitingApproval = () => {
    return (
        <div className="auth-page">
            <Header showSignUp={false} />
            <main className="auth-main">
                <div className="auth-container">
                    <div className="auth-card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', color: '#f59e0b', marginBottom: '1rem' }}>
                            <ion-icon name="time-outline"></ion-icon>
                        </div>
                        <h2>Awaiting Approval</h2>
                        <p className="auth-description">
                            Your provider account has been successfully verified!
                        </p>
                        <p style={{ margin: '1rem 0', color: '#4b5563', lineHeight: '1.6' }}>
                            Our admin team is currently reviewing your details. You will receive an email once your account is approved and ready for use.
                        </p>
                        <div style={{ marginTop: '2rem' }}>
                            <Link to="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AwaitingApproval;
