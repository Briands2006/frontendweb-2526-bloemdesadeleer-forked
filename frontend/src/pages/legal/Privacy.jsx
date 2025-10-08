import React from 'react';
import './Privacy.css'

const Privacy = () => {

    const getCurrentYear = () => new Date().getFullYear();

    return (
        <div className='privacy' style={{ padding: '10px', fontFamily: 'Arial, sans-serif', color: '#fff' }}>
            <h1>Privacy Policy</h1>
            <p>Last updated: {getCurrentYear()}</p>

            <h2>Introduction</h2>
            <p>
                Welcome to F1 Tracker. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
                <li>Personal identification information (Name, email address, phone number, etc.)</li>
                <li>Usage data (e.g., pages visited, time spent on the site)</li>
                <li>Cookies and tracking technologies</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
                <li>To provide and maintain our services</li>
                <li>To improve user experience</li>
                <li>To communicate with you</li>
                <li>To comply with legal obligations</li>
            </ul>

            <h2>Sharing Your Information</h2>
            <p>
                We do not sell or share your personal information with third parties, except as necessary to provide our services or comply with the law.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
                <li>Access, update, or delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of the data we hold about you</li>
            </ul>

            <h2>Security</h2>
            <p>
                We take reasonable measures to protect your personal information from unauthorized access, disclosure, or destruction.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>

            <h2>Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at email@email.com.
            </p>
        </div>
    );
};

export default Privacy;