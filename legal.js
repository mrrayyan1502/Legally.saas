/* 
   LegAlly - Web Accessibility & Audit Tool
   Legal Documentation Engine (legal.js)
   Sets clear disclaimers, GDPR, CCPA, and ADA terms.
*/

const LegalDocs = {
    privacy: `
        <h2>Privacy Policy</h2>
        <p><strong>Effective Date: June 1, 2026</strong></p>
        <p>LegAlly ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard user information when you visit and use our website and accessibility analysis tools.</p>
        
        <h3>1. Information We Collect</h3>
        <p>We do not require account registration for basic scanning. When you use our services, we may process:</p>
        <ul>
            <li><strong>Scanned Data:</strong> URLs and HTML code snippets submitted for accessibility audits. This data is processed entirely client-side in real-time inside your browser to generate your accessibility score, and is never transmitted to our servers.</li>
            <li><strong>Account Information:</strong> If you purchase a premium license, we collect your name, email address, and billing information through our secure payment gateway providers.</li>
            <li><strong>Technical Logs:</strong> IP address, browser type, and operating system to monitor platform health, improve scanning algorithms, and prevent abuse.</li>
        </ul>

        <h3>2. How We Use Your Information</h3>
        <p>We process your data to:</p>
        <ul>
            <li>Perform real-time client-side accessibility analysis.</li>
            <li>Deliver detailed remediation reports and copy-pasteable code fixes in your browser.</li>
            <li>Send premium reports, license verification keys, and critical product updates.</li>
            <li>Enforce terms of use and prevent automated scanner abuse.</li>
        </ul>

        <h3>3. Data Retention & Security</h3>
        <p>We operate on a strict zero-data retention model for scans. For both free and premium users, scanned HTML snippets and audit summaries are processed entirely client-side in memory and are never saved on our databases or servers. All report downloads are generated locally inside your browser.</p>

        <h3>4. GDPR & CCPA Rights</h3>
        <p>Under UK/EU GDPR and USA state laws (CCPA), you have the right to access, rectify, or request erasure of any personal records we hold (such as billing or account information). To exercise these rights, please submit a request through our support portal.</p>
    `,

    terms: `
        <h2>Terms of Service</h2>
        <p><strong>Last Updated: June 1, 2026</strong></p>
        <p>By accessing or using LegAlly ("the Service"), you agree to be bound by these Terms of Service. Please read them carefully.</p>
        
        <h3>1. Permitted Use of the Service</h3>
        <p>You may use the Service to audit the accessibility of websites you own, manage, or have explicit permission to audit. You agree not to run automated scraping scripts or load-testing attacks against our website or scanner infrastructure.</p>

        <h3>2. Subscription Plans & Payments</h3>
        <ul>
            <li><strong>Free Scans:</strong> Offered for single page scans with limited reports. Abuse or excessive scanning may result in rate-limiting.</li>
            <li><strong>Premium Licenses:</strong> Annual plans are billed at £299.00/year (or £239.20/year under active launch promo rules). Licenses are valid for 12 months from the date of activation.</li>
            <li><strong>Refund Policy:</strong> We offer a 14-day money-back guarantee. If you are unsatisfied with the depth of our WCAG reports, contact support for a full, hassle-free refund.</li>
        </ul>

        <h3>3. Disclaimer of Warranties</h3>
        <p>The Service is provided on an "as is" and "as available" basis without warranties of any kind. While we utilize the industry-standard Axe-Core engine, we do not warrant that our reports will detect 100% of accessibility violations, that suggestions or auto-fixes are error-free, or that using the Service guarantees regulatory compliance, legal compliance, or absolute immunity from web-related legal actions or lawsuits.</p>

        <h3>4. Limitation of Liability</h3>
        <p>To the maximum extent permitted by applicable law, in no event shall LegAlly, its founders, directors, employees, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to legal fees, lawsuit settlements, regulatory fines, loss of profits, loss of business, or damages resulting from accessibility failures on your websites, regardless of whether those websites were scanned by our tool.</p>

        <h3>5. Governing Law</h3>
        <p>These Terms are governed by and construed in accordance with the laws of the United Kingdom. Any legal actions or disputes arising from the use of this Service shall be resolved under the exclusive jurisdiction of UK courts.</p>
    `,

    disclaimer: `
        <h2>Disclaimer</h2>
        <div style="background: rgba(239, 68, 68, 0.08); border-left: 4px solid #ef4444; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
            <strong style="color: #fca5a5; display: block; margin-bottom: 6px; font-size: 1rem;">IMPORTANT LEGAL NOTICE</strong>
            LegAlly provides automated accessibility scanning tools based on the Web Content Accessibility Guidelines (WCAG 2.1) and the general digital accessibility requirements of the Americans with Disabilities Act (ADA) and the UK Equality Act 2010. 
            <strong>This tool does not provide legal advice, nor do its reports guarantee complete regulatory compliance or absolute immunity from web-related legal actions.</strong>
        </div>

        <h3>1. Limits of Automated Accessibility Audits</h3>
        <p>Automated scanners (including industry standards like Axe-Core) are highly effective at catching structural, high-impact issues such as missing text alternatives, incorrect heading orders, and severe color contrast ratios. However, automated systems can generally detect approximately 70% to 80% of all potential WCAG violations. Full compliance requires supplementary manual testing with screen-readers and keyboard-only focus reviews.</p>

        <h3>2. No Lawyer-Client Relationship</h3>
        <p>Any information, tutorials, code snippets, or support conversations provided by this tool are for educational and technical remediation purposes only. They do not constitute formal legal counsel. If your business has received a formal digital accessibility lawsuit notice or settlement letter, we strongly advise you to consult with a qualified legal professional specialising in digital civil rights and web accessibility law in the USA or UK.</p>

        <h3>3. Limitation of Liability</h3>
        <p>Under no circumstances shall LegAlly, its founders, or affiliates be held liable for any legal fines, lawsuit settlements, loss of business, or damages resulting from accessibility failures on your websites, regardless of whether those websites were audited by our tool.</p>
    `,

    accessibility: `
        <h2>Accessibility Statement</h2>
        <p>LegAlly is dedicated to ensuring digital accessibility for people with disabilities. We are continuously improving the user experience for everyone and applying the relevant accessibility standards to our own platform.</p>

        <h3>1. Conformance Status</h3>
        <p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. <strong>LegAlly is partially conformant with WCAG 2.1 Level AA.</strong> Partially conformant means that some parts of the content do not fully conform to the accessibility standard, though we actively work to identify and resolve any usability barriers.</p>

        <h3>2. Accessibility Features Built into our SaaS</h3>
        <p>We work to implement features that facilitate digital access. Key features include:</p>
        <ul>
            <li><strong>Keyboard Accessibility:</strong> We strive to ensure all active fields, scanner inputs, and dashboard panels can be navigated using the Tab and Enter keys without keyboard traps.</li>
            <li><strong>High Color Contrast:</strong> Text colors and interactive components aim to maintain a contrast ratio exceeding 4.5:1 to support WCAG AA standard readability.</li>
            <li><strong>ARIA Labels & Semantics:</strong> We utilize semantic HTML elements and ARIA descriptors designed to assist screen-readers in parsing dashboard elements, gauges, and scan metrics.</li>
            <li><strong>Screen-Reader Friendly Alerts:</strong> Scanning updates and live score adjustments are announced dynamically using ARIA live regions to keep assistive technologies informed.</li>
        </ul>

        <h3>3. Feedback & Contact</h3>
        <p>We welcome your feedback on the accessibility of our SaaS website. If you encounter any barriers, please let us know so we can address them:</p>
        <p><strong>Email:</strong> accessibility@uselegally.com</p>
    `
};
