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
        <ul>
            <li><strong>Scanned Data:</strong> Any URLs or HTML code snippets submitted for accessibility audits are processed entirely client-side within your browser. This data is processed in real-time to generate your accessibility score and is never transmitted to, stored on, or seen by our servers.</li>
            <li><strong>Account & Billing Information:</strong> For premium license purchases, we collect your name, email address, and billing details. All payments are processed through secure third-party payment gateways (e.g., Stripe). We do not store your full credit card information on our servers.</li>
            <li><strong>Technical Logs:</strong> We may collect standard web logs (IP address, browser type) to monitor platform health, prevent automated abuse, and improve our scanning algorithms.</li>
        </ul>

        <h3>2. How We Use Your Information</h3>
        <p>We process your data to:</p>
        <ul>
            <li>Perform real-time client-side accessibility analysis.</li>
            <li>Deliver detailed remediation reports and code fixes directly in your browser.</li>
            <li>Manage premium licenses and send critical product updates.</li>
            <li>Ensure the security and integrity of our platform.</li>
        </ul>

        <h3>3. Data Retention & Security</h3>
        <p>We operate on a Zero-Data Retention model for all accessibility scans. Audit results and patched HTML files are generated locally in your browser session and are cleared immediately once the session is closed. We only retain account-related data (email and billing history) as required for license management, customer support, and tax purposes.</p>

        <h3>4. Third-Party Services</h3>
        <p>We use secure third-party providers for payment processing (e.g., Stripe). These providers have their own privacy policies governing how they handle your billing information.</p>

        <h3>5. GDPR & CCPA Rights</h3>
        <p>Depending on your location (such as the UK, EU, or USA), you have the right to access, rectify, or request the erasure of any personal records we hold (such as billing or account information). To exercise these rights, please contact us at <strong>legally.support@gmail.com</strong>.</p>
        
        <p>For legal limitations and service disclaimers, please refer to our separate Legal Disclaimer page.</p>
    `,

    terms: `
        <h2>Terms of Service</h2>
        <p><strong>Last Updated: June 1, 2026</strong> | <strong>Governing Law: United Kingdom</strong></p>
        
        <div style="background: rgba(239, 68, 68, 0.08); border-left: 4px solid #ef4444; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
            <strong style="color: #fca5a5; display: block; margin-bottom: 6px;">⚠️ IMPORTANT NOTICE</strong>
            By accessing or using LegAlly ("the Service"), you agree to be bound by these Terms of Service. Please read them carefully before use. If you do not agree, please do not use this Service.
        </div>

        <h3>Section 01: Permitted Use of the Service</h3>
        <p>You may use the Service to audit the accessibility of websites you own, manage, or have explicit permission to audit. By using this Service, you agree not to:</p>
        <ul>
            <li>Run automated scraping scripts or load-testing attacks against our website or scanner infrastructure.</li>
            <li>Use the Service for any unlawful purpose or in violation of any applicable regulations.</li>
            <li>Misrepresent the results of our automated scans as legal certification or a guarantee of full compliance.</li>
        </ul>

        <h3>Section 02: Subscription Plans & Payments</h3>
        <p>LegAlly offers the following subscription plans:</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 0.9rem; text-align: left;">
            <thead>
                <tr style="border-bottom: 1px solid var(--border-color); color: #fff;">
                    <th style="padding: 10px 5px;">Plan</th>
                    <th style="padding: 10px 5px;">Billing</th>
                    <th style="padding: 10px 5px;">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 10px 5px;">Starter Plan</td>
                    <td style="padding: 10px 5px;">Free Forever</td>
                    <td style="padding: 10px 5px;">£0.00</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 10px 5px;">Professional Plan</td>
                    <td style="padding: 10px 5px;">Monthly</td>
                    <td style="padding: 10px 5px;">£29.00 / month</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 10px 5px;">Professional Plan</td>
                    <td style="padding: 10px 5px;">Annual</td>
                    <td style="padding: 10px 5px;">£299.00 / year</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 10px 5px;">Agency Plan</td>
                    <td style="padding: 10px 5px;">Monthly</td>
                    <td style="padding: 10px 5px;">£99.00 / month</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 10px 5px;">Agency Plan</td>
                    <td style="padding: 10px 5px;">Annual</td>
                    <td style="padding: 10px 5px;">£990.00 / year</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 10px 5px;">Enterprise Plan</td>
                    <td style="padding: 10px 5px;">Bespoke</td>
                    <td style="padding: 10px 5px;">Custom pricing</td>
                </tr>
            </tbody>
        </table>
        
        <p>Annual licenses are valid for 12 months from the date of activation. A launch promotional discount (code LAUNCH20) may be available for a limited time, reducing the first-year Professional Plan to £239.20.</p>
        
        <ul>
            <li><strong>Refund Policy — Annual Plans:</strong> We offer a 14-day money-back guarantee on all Annual plans. If you are unsatisfied with the depth of our WCAG audit reports within 14 days of purchase, contact us at <strong>legally.support@gmail.com</strong> for a full, hassle-free refund — no questions asked.</li>
            <li><strong>Refund Policy — Monthly Plans:</strong> Monthly plans are non-refundable. However, you may cancel your subscription at any time before the next billing cycle, and you will not be charged further. No partial refunds are issued for unused days in an active monthly billing period.</li>
        </ul>

        <h3>Section 03: Disclaimer of Warranties</h3>
        <p>The Service is provided on an "as is" and "as available" basis without warranties of any kind. While we utilise the industry-standard Axe-Core engine, we expressly do not warrant that:</p>
        <ul>
            <li>Our reports will detect 100% of accessibility violations (automated tools typically identify 70%–80% of structural issues).</li>
            <li>Suggested code auto-fixes are error-free or universally compatible with all website platforms.</li>
            <li>Using the Service guarantees regulatory compliance, legal compliance, or absolute immunity from web-related legal actions under the Americans with Disabilities Act (ADA), the UK Equality Act 2010, the European Accessibility Act, or any other applicable law.</li>
            <li>The Service constitutes legal advice of any kind. For formal legal matters, please consult a qualified solicitor or attorney specialising in digital accessibility law.</li>
        </ul>

        <h3>Section 04: Limitation of Liability</h3>
        <p>To the maximum extent permitted by applicable law, in no event shall LegAlly, its founders, directors, employees, or affiliates be liable for any:</p>
        <ul>
            <li>Direct, indirect, incidental, special, consequential, or punitive damages.</li>
            <li>Legal fees, lawsuit settlements, or regulatory fines.</li>
            <li>Loss of profits, loss of business, or damages resulting from accessibility failures on your websites.</li>
        </ul>
        <p>This limitation applies regardless of whether those websites were scanned by our tool, and regardless of the theory of liability (contract, tort, negligence, or otherwise).</p>

        <h3>Section 05: Governing Law</h3>
        <p>These Terms are governed by and construed in accordance with the laws of the United Kingdom. Any legal actions or disputes arising from the use of this Service shall be subject to the exclusive jurisdiction of UK courts.</p>
        <p>Users accessing the Service from outside the United Kingdom are responsible for ensuring compliance with their local laws and regulations.</p>

        <h3>Section 06: Agency & Third-Party Reseller Terms</h3>
        <p>If you subscribe to the Agency Plan or use the Service to audit websites on behalf of third-party clients, you agree to the following:</p>
        <ul>
            <li>You are solely responsible for managing your clients' expectations and compliance requirements.</li>
            <li>LegAlly provides technical, automated scans and code suggestions only — these do not constitute legal advice.</li>
            <li>LegAlly's total liability to agencies is strictly limited to the subscription fees paid in the preceding 30 days.</li>
            <li>Under no circumstances shall LegAlly be liable for any disputes, legal notices, or settlement claims between you (the reseller or agency) and your client websites.</li>
            <li>You agree to fully indemnify, defend, and hold harmless LegAlly, its founders, and affiliates from any claims, liabilities, damages, or legal expenses arising out of your auditing of third-party websites.</li>
        </ul>

        <h3>Section 07: Changes to These Terms</h3>
        <p>LegAlly reserves the right to update or modify these Terms of Service at any time. We will notify users of significant changes by updating the "Last Updated" date at the top of this page. Continued use of the Service after any modifications constitutes your acceptance of the revised Terms.</p>
        
        <p>For any questions regarding these Terms, please contact us at <strong>legally.support@gmail.com</strong>.</p>
    `,

    disclaimer: `
        <h2>Disclaimer</h2>
        <p><strong>Last Updated: June 1, 2026</strong> | <strong>Governing Law: United Kingdom</strong></p>
        
        <div style="background: rgba(239, 68, 68, 0.08); border-left: 4px solid #ef4444; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
            <strong style="color: #fca5a5; display: block; margin-bottom: 6px; font-size: 1rem;">⚠️ IMPORTANT LEGAL NOTICE</strong>
            LegAlly provides automated accessibility scanning tools based on the Web Content Accessibility Guidelines (WCAG 2.1) and the general digital accessibility requirements of the Americans with Disabilities Act (ADA) and the UK Equality Act 2010. 
            <strong>This tool does not provide legal advice, nor do its reports guarantee complete regulatory compliance or absolute immunity from web-related legal actions.</strong>
        </div>

        <h3>Section 01: Limits of Automated Accessibility Audits</h3>
        <p>Automated scanners (including industry standards like Axe-Core) are highly effective at catching structural, high-impact issues such as missing text alternatives, incorrect heading orders, and severe color contrast ratios.</p>
        <p>However, automated systems can generally detect approximately 70% to 80% of all potential WCAG violations. Full compliance requires supplementary manual testing with screen-readers and keyboard-only focus reviews.</p>
        <p>A passing score or low violation count in our tool does not mean your website is fully compliant with the ADA, UK Equality Act 2010, or any other applicable accessibility law.</p>

        <h3>Section 02: No Lawyer-Client Relationship</h3>
        <p>Any information, tutorials, code snippets, or support conversations provided by this tool are for educational and technical remediation purposes only. They do not constitute formal legal counsel.</p>
        <p>If your business has received a formal digital accessibility lawsuit notice or settlement letter, we strongly advise you to consult with a qualified legal professional specialising in digital civil rights and web accessibility law in the USA or UK.</p>
        <p><strong>Note:</strong> No use of this Service creates an attorney-client relationship between you and LegAlly or any of its team members.</p>

        <h3>Section 03: Limitation of Liability</h3>
        <p>To the maximum extent permitted by applicable law, LegAlly, its founders, or affiliates shall not be held liable for any legal fines, lawsuit settlements, loss of business, or damages resulting from accessibility failures on your websites, regardless of whether those websites were audited by our tool.</p>
        <p>This limitation applies regardless of the theory of liability — whether based in contract, tort, negligence, strict liability, or otherwise — and even if LegAlly has been advised of the possibility of such damages.</p>

        <h3>Section 04: Legal Enquiries & Contact</h3>
        <p>If you have any legal questions, formal complaints, or require clarification regarding this Disclaimer, please contact us directly:</p>
        <p>📩 <strong>Legal Enquiries:</strong> <a href="mailto:legally.support@gmail.com" style="color: var(--primary); text-decoration: underline;">legally.support@gmail.com</a></p>
        <p>We aim to respond to all legal correspondence within 5 business days.</p>
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
