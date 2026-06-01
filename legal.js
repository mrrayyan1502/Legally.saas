/* 
   LegAlly - Web Accessibility & Compliance Shield
   Legal Documentation Engine (legal.js)
   Protects the SaaS owner with strong disclaimers, GDPR, CCPA, and ADA terms.
*/

const LegalDocs = {
    privacy: `
        <h2>Privacy Policy</h2>
        <p><strong>Effective Date: June 1, 2026</strong></p>
        <p>LegAlly ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard user information when you visit and use our website and accessibility analysis tools.</p>
        
        <h3>1. Information We Collect</h3>
        <p>We do not require account registration for basic scanning. When you use our services, we may collect:</p>
        <ul>
            <li><strong>Scanned Data:</strong> URLs and HTML code snippets submitted for accessibility audits. This data is processed temporarily in real-time to generate your compliance score.</li>
            <li><strong>Account Information:</strong> If you purchase a premium license, we collect your name, email address, and billing information through our secure payment gateway providers.</li>
            <li><strong>Technical Logs:</strong> IP address, browser type, and operating system to monitor platform health, improve scanning algorithms, and prevent abuse.</li>
        </ul>

        <h3>2. How We Use Your Information</h3>
        <p>We process your data to:</p>
        <ul>
            <li>Perform real-time accessibility compliance analysis.</li>
            <li>Deliver detailed remediation reports and copy-pasteable code fixes.</li>
            <li>Send premium reports, license verification keys, and critical product roadmap updates.</li>
            <li>Enforce terms of use and prevent automated scanner abuse.</li>
        </ul>

        <h3>3. Data Retention & Security</h3>
        <p>For anonymous users, scanned HTML snippets are processed entirely client-side or transiently in memory, and are never saved on our databases. For premium users, audit summaries are stored securely in Supabase. We implement strict technical and organizational measures to safeguard all stored records against unauthorized access.</p>

        <h3>4. GDPR & CCPA Rights</h3>
        <p>Under UK/EU GDPR and USA state laws (CCPA), you have the right to access, rectify, or request erasure of any personal records we hold. To exercise these rights, please submit a request through our support portal.</p>
    `,

    terms: `
        <h2>Terms of Service</h2>
        <p><strong>Last Updated: June 1, 2026</strong></p>
        <p>By accessing or using LegAlly ("the Service"), you agree to be bound by these Terms of Service. Please read them carefully.</p>
        
        <h3>1. Permitted Use of the Service</h3>
        <p>You may use the Service to check the accessibility compliance of websites you own, manage, or have explicit permission to audit. You agree not to run automated scraping scripts or load-testing attacks against our scanning infrastructure.</p>

        <h3>2. Subscription Plans & Payments</h3>
        <ul>
            <li><strong>Free Scans:</strong> Offered for single page scans with limited reports. Abuse or excessive scanning may result in rate-limiting.</li>
            <li><strong>Premium Licenses:</strong> Annual plans are billed at £299.00/year (or £239.20/year under active launch promo rules). Licenses are valid for 12 months from the date of activation.</li>
            <li><strong>Refund Policy:</strong> We offer a 14-day money-back guarantee. If you are unsatisfied with the depth of our WCAG reports, contact support for a full, hassle-free refund.</li>
        </ul>

        <h3>3. Disclaimer of Warranties</h3>
        <p>The Service is provided on an "as is" and "as available" basis. While we utilize the gold-standard Axe-Core engine, we do not warrant that our reports will detect 100% of accessibility violations, or that fixing highlighted issues guarantees immunity from digital lawsuits.</p>

        <h3>4. Governing Law</h3>
        <p>These Terms are governed by and construed in accordance with the laws of the United Kingdom. Any legal actions or disputes arising from the use of this Service shall be resolved under the jurisdiction of UK courts.</p>
    `,

    disclaimer: `
        <h2>Disclaimer</h2>
        <div style="background: rgba(239, 68, 68, 0.08); border-left: 4px solid #ef4444; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
            <strong style="color: #fca5a5; display: block; margin-bottom: 6px; font-size: 1rem;">IMPORTANT LEGAL NOTICE</strong>
            LegAlly provides automated accessibility scanning tools based on the public Web Content Accessibility Guidelines (WCAG 2.1) and general American Disability Act (ADA) digital requirements. 
            <strong>This tool does not provide legal advice, nor does its reports guarantee complete regulatory compliance or absolute immunity from web-related legal actions.</strong>
        </div>

        <h3>1. Limits of Automated Accessibility Audits</h3>
        <p>Automated scanners (including industry standards like Axe-core) are exceptionally highly effective at catching structural, high-impact issues such as missing text alternatives, incorrect heading orders, and severe color contrast ratios. However, automated systems can generally detect approximately 70% to 80% of all potential WCAG violations. Full compliance requires supplementary manual testing with screen-readers and keyboard-only focus reviews.</p>

        <h3>2. No Lawyer-Client Relationship</h3>
        <p>Any information, tutorials, code snippets, or support conversations provided by this tool are for educational and technical remediation purposes only. They do not constitute formal legal counsel. If your business has received a formal digital lawsuit notice or settlement letter, we strongly advise you to consult with a qualified legal professional specializing in digital civil rights and web accessibility laws in the USA or UK.</p>

        <h3>3. Limitation of Liability</h3>
        <p>Under no circumstances shall LegAlly, its founders, or affiliates be held liable for any legal fines, lawsuit settlements, loss of business, or damages resulting from accessibility failures on your websites, regardless of whether those files were audited by our tool.</p>
    `,

    accessibility: `
        <h2>Accessibility Statement</h2>
        <p>LegAlly is dedicated to ensuring digital accessibility for people with disabilities. We are continuously improving the user experience for everyone and applying the relevant accessibility standards to our own platform.</p>

        <h3>1. Conformance Status</h3>
        <p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. <strong>LegAlly is fully conformant with WCAG 2.1 Level AA.</strong></p>

        <h3>2. Accessibility Features Built into our SaaS</h3>
        <ul>
            <li><strong>Keyboard Accessibility:</strong> All active fields, scanner inputs, and dashboard panels can be navigated entirely using the Tab and Enter keys without keyboard traps.</li>
            <li><strong>High Color Contrast:</strong> Text colors and interactive components maintain a contrast ratio exceeding 4.5:1, fulfilling WCAG AA standard readability.</li>
            <li><strong>ARIA Labels & Semantics:</strong> Full integration of semantic HTML elements and ARIA descriptors ensures that screen-readers read dashboard elements, compliance gauges, and scan metrics accurately.</li>
            <li><strong>Screen-Reader Friendly Alerts:</strong> Scanning updates and live score adjustments are announced dynamically using ARIA live regions.</li>
        </ul>

        <h3>3. Feedback & Contact</h3>
        <p>We welcome your feedback on the accessibility of our SaaS website. If you encounter any barriers, please let us know immediately so we can fix them:</p>
        <p><strong>Email:</strong> accessibility@uselegally.com</p>
    `
};
