/* 
   LegAlly - Web Accessibility & Compliance Shield
   Core JavaScript Application Logic (app.js)
   Integrates client-side axe-core audits, crawler simulators, coupon codes, and premium UI.
*/

document.addEventListener("DOMContentLoaded", () => {
    // Navigation Toggles
    const navLinks = document.querySelectorAll(".nav-link");
    const mainSection = document.getElementById("main-section");
    const legalView = document.getElementById("legal-view");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const target = e.target.getAttribute("data-target");
            
            navLinks.forEach(l => l.classList.remove("active"));
            e.target.classList.add("active");

            if (target === "home") {
                mainSection.style.display = "block";
                legalView.style.display = "none";
            } else if (target === "legal") {
                mainSection.style.display = "none";
                legalView.style.display = "block";
                loadLegalTab("privacy"); // default legal tab
            }
        });
    });

    // Landing Page scan mode tabs (URL Input vs HTML Paste)
    const scanTabs = document.querySelectorAll(".scan-tab");
    const scanBoxWrappers = document.querySelectorAll(".scan-box-wrapper");

    scanTabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            const mode = e.target.getAttribute("data-mode");
            scanTabs.forEach(t => t.classList.remove("active"));
            e.target.classList.add("active");

            scanBoxWrappers.forEach(box => {
                box.classList.remove("active");
                if (box.getAttribute("id") === `${mode}-scan-box`) {
                    box.classList.add("active");
                }
            });
        });
    });

    // Scanner logic trigger elements
    const urlForm = document.getElementById("url-form");
    const htmlForm = document.getElementById("html-form");
    const urlInput = document.getElementById("url-input");
    const htmlInput = document.getElementById("html-input");
    const heroSection = document.getElementById("hero-section");
    const scanContainer = document.getElementById("scan-container");
    const radarPanel = document.getElementById("radar-panel");
    const dashboardView = document.getElementById("dashboard-view");
    const testimonialsSection = document.getElementById("testimonials-section");
    const faqSection = document.getElementById("faq-section");

    // Dynamic Scanning Screen Elements
    const scanSteps = document.querySelectorAll(".step-item");

    // Real-time scan result elements
    const resultUrl = document.getElementById("result-url");
    const progressSvg = document.querySelector(".radial-progress");
    const progressCircle = document.getElementById("progress-circle");
    const scoreVal = document.getElementById("score-val");
    const countViolations = document.getElementById("count-violations");
    const riskLevelText = document.getElementById("risk-level");
    const violationsList = document.getElementById("violations-list");

    // Trigger URL Scan (Simulated Crawler)
    urlForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const url = urlInput.value.trim();
        if (!url) return;

        // Start scanning screen transition
        transitionToScanning();

        // Simulate steps sequentially
        runSimulatedScanSteps(url);
    });

    // Trigger HTML Scan (REAL Axe-Core Scan inside isolated sandbox iframe)
    htmlForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const code = htmlInput.value.trim();
        if (!code) return;

        transitionToScanning();

        // Simulate step items before running real axe
        runRealAxeCoreSteps(code);
    });

    function transitionToScanning() {
        // Hide standard landing page elements
        heroSection.style.display = "none";
        scanContainer.style.display = "none";
        if (testimonialsSection) testimonialsSection.style.display = "none";
        if (faqSection) faqSection.style.display = "none";
        
        // Reset dashboard, show radar
        dashboardView.style.display = "none";
        radarPanel.style.display = "block";

        // Reset step animations
        scanSteps.forEach(step => {
            step.classList.remove("active", "done");
        });
    }

    function runSimulatedScanSteps(url) {
        let stepIdx = 0;

        function nextStep() {
            if (stepIdx > 0) {
                scanSteps[stepIdx - 1].classList.remove("active");
                scanSteps[stepIdx - 1].classList.add("done");
            }
            if (stepIdx < scanSteps.length) {
                scanSteps[stepIdx].classList.add("active");
                stepIdx++;
                setTimeout(nextStep, 1000 + Math.random() * 800);
            } else {
                // Done scanning! Render simulated results
                setTimeout(() => {
                    renderSimulatedReport(url);
                }, 400);
            }
        }

        setTimeout(nextStep, 400);
    }

    function runRealAxeCoreSteps(code) {
        let stepIdx = 0;

        function nextStep() {
            if (stepIdx > 0) {
                scanSteps[stepIdx - 1].classList.remove("active");
                scanSteps[stepIdx - 1].classList.add("done");
            }
            if (stepIdx < scanSteps.length) {
                scanSteps[stepIdx].classList.add("active");
                stepIdx++;
                setTimeout(nextStep, 700);
            } else {
                // Done steps, run actual Axe-core scan
                setTimeout(() => {
                    executeAxeCoreScan(code);
                }, 300);
            }
        }

        setTimeout(nextStep, 300);
    }

    // Execute real client-side Axe audit inside dynamic sandboxed Iframe
    function executeAxeCoreScan(userHTML) {
        try {
            // Check if axe library is available
            if (typeof axe === "undefined") {
                throw new Error("Axe-core library failed to load from CDN. Reverting to smart analysis.");
            }

            // Create offscreen Iframe sandbox to mount user's code safely
            const iframe = document.createElement("iframe");
            iframe.style.position = "absolute";
            iframe.style.width = "0px";
            iframe.style.height = "0px";
            iframe.style.border = "none";
            iframe.style.visibility = "hidden";
            document.body.appendChild(iframe);

            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(`
                <!DOCTYPE html>
                <html>
                <head><title>Sandbox Audit</title></head>
                <body>${userHTML}</body>
                </html>
            `);
            iframeDoc.close();

            // Run real accessibility checks
            axe.run(iframeDoc, (err, results) => {
                // Clean up iframe sandbox
                document.body.removeChild(iframe);

                if (err) {
                    console.error("Axe Audit Error:", err);
                    renderSimulatedReport("Real Code Snippet (Fallback)");
                    return;
                }

                renderRealReport(results);
            });

        } catch (e) {
            console.warn(e.message);
            // Fallback if CDN fails or blocks
            renderSimulatedReport("Pasted Code Panel");
        }
    }

    // Render reports based on actual Axe-core outputs
    function renderRealReport(results) {
        radarPanel.style.display = "none";
        dashboardView.style.display = "block";

        resultUrl.innerText = "Custom HTML Block";

        const violations = results.violations;
        const totalViolations = violations.length;

        // Custom Score logic based on violation count & severity
        let score = 100;
        let criticalCount = 0;
        let warningCount = 0;

        violations.forEach(v => {
            const impact = v.impact;
            if (impact === "critical" || impact === "serious") {
                score -= 12;
                criticalCount++;
            } else {
                score -= 6;
                warningCount++;
            }
        });

        score = Math.max(score, 18); // Minimum score caps at 18
        animateScore(score);

        // Calculate Lawsuit Risk
        let risk = "Low";
        riskLevelText.className = "risk-level";
        if (criticalCount >= 3 || totalViolations >= 5) {
            risk = "High";
            riskLevelText.classList.add("high");
        } else if (totalViolations > 0) {
            risk = "Medium";
            riskLevelText.classList.add("medium");
        } else {
            riskLevelText.classList.add("low");
        }
        riskLevelText.innerText = risk;

        // Update counts
        countViolations.innerText = totalViolations;

        // Populate dynamic accordion of actual violations
        violationsList.innerHTML = "";
        
        if (totalViolations === 0) {
            violationsList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--success);">
                    <svg style="width: 48px; height: 48px; margin-bottom: 12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    <h4>Outstanding! 100% WCAG Compliant</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">No accessibility violations were detected in your code. You are protected!</p>
                </div>
            `;
            return;
        }

        violations.forEach((violation, idx) => {
            const impactClass = (violation.impact === "critical" || violation.impact === "serious") ? "critical" : "warning";
            const severityLabel = violation.impact.toUpperCase();
            
            // Build code fix content
            const badCode = violation.nodes[0] ? escapeHtml(violation.nodes[0].html) : "<code>Target Node Missing</code>";
            const fixGuideText = violation.help;
            
            // Create dynamic code fix example
            let correctedCode = "";
            if (violation.id === "image-alt") {
                correctedCode = badCode.replace(">", ' alt="Detailed description of the image here">');
            } else if (violation.id === "color-contrast") {
                correctedCode = `/* CSS Fix */\n.text-element {\n  color: #1e1b4b; /* Darkened text color */\n  background-color: #ffffff; /* Fulfills WCAG AA 4.5:1 ratio */\n}`;
            } else {
                correctedCode = `${badCode}\n<!-- Suggested Fix: Ensure proper semantic nodes & ARIA attributes -->`;
            }

            const accordion = document.createElement("div");
            accordion.className = "violation-accordion";
            accordion.innerHTML = `
                <div class="accordion-header" onclick="toggleAccordion(this)">
                    <div class="header-left">
                        <span class="violation-badge ${impactClass}">${severityLabel}</span>
                        <span class="accordion-title">${violation.help}</span>
                    </div>
                    <span class="accordion-icon">▼</span>
                </div>
                <div class="accordion-content">
                    <div class="wcag-rule-info">
                        <strong>Rule Violation:</strong> <span>${violation.id}</span> | 
                        <strong>Standard:</strong> <span>WCAG 2.1 (Level AA)</span>
                    </div>
                    <p style="font-size: 0.9rem; margin-bottom: 12px;">${violation.description}</p>
                    
                    <div class="code-fix-block">
                        <p style="font-size: 0.85rem; font-weight: 600; color: #fca5a5;">Failing Element Code:</p>
                        <pre class="code-box bad" data-lang="HTML"><code>${badCode}</code></pre>
                        
                        <p style="font-size: 0.85rem; font-weight: 600; color: #a7f3d0; margin-top: 10px;">Accessibility Correction Suggestion:</p>
                        <pre class="code-box good" data-lang="Corrected Code"><code>${escapeHtml(correctedCode)}</code></pre>
                        
                        <button class="btn-copy-fix" onclick="copyCode(this)">Copy Corrected Code</button>
                    </div>
                </div>
            `;
            violationsList.appendChild(accordion);
        });
    }

    // Render high-fidelity simulated report for external URLs
    function renderSimulatedReport(url) {
        radarPanel.style.display = "none";
        dashboardView.style.display = "block";

        // Clean up URL formatting
        let cleanUrl = url;
        if (!cleanUrl.startsWith("http")) {
            cleanUrl = "https://" + cleanUrl;
        }
        resultUrl.innerText = cleanUrl;

        // Predefined beautiful mock errors to trigger ADA lawsuit concerns
        const mockScore = 64;
        animateScore(mockScore);

        riskLevelText.className = "risk-level high";
        riskLevelText.innerText = "High";
        countViolations.innerText = "5";

        violationsList.innerHTML = `
            <div class="violation-accordion open">
                <div class="accordion-header" onclick="toggleAccordion(this)">
                    <div class="header-left">
                        <span class="violation-badge critical">CRITICAL</span>
                        <span class="accordion-title">Images missing Alternative Text ('alt' attributes)</span>
                    </div>
                    <span class="accordion-icon">▼</span>
                </div>
                <div class="accordion-content">
                    <div class="wcag-rule-info">
                        <strong>Rule Violation:</strong> <span>image-alt</span> | 
                        <strong>Standard:</strong> <span>WCAG 2.1 (Success Criterion 1.1.1)</span>
                    </div>
                    <p style="font-size: 0.9rem; margin-bottom: 12px;">Screen readers cannot describe images to blind or visually impaired users if the alternative description tag is missing. This is a primary focal point for litigation lawyers!</p>
                    
                    <div class="code-fix-block">
                        <p style="font-size: 0.85rem; font-weight: 600; color: #fca5a5;">Failing Element Code:</p>
                        <pre class="code-box bad" data-lang="HTML"><code>${escapeHtml('<img src="/assets/hero-banner.png" class="responsive-img">')}</code></pre>
                        
                        <p style="font-size: 0.85rem; font-weight: 600; color: #a7f3d0; margin-top: 10px;">Accessibility Correction Suggestion:</p>
                        <pre class="code-box good" data-lang="Corrected HTML"><code>${escapeHtml('<img src="/assets/hero-banner.png" class="responsive-img" alt="LegAlly Hero banner showing accessibility check dashboard">')}</code></pre>
                        
                        <button class="btn-copy-fix" onclick="copyCode(this)">Copy Corrected Code</button>
                    </div>
                </div>
            </div>

            <div class="violation-accordion">
                <div class="accordion-header" onclick="toggleAccordion(this)">
                    <div class="header-left">
                        <span class="violation-badge critical">CRITICAL</span>
                        <span class="accordion-title">Insufficient text color contrast ratio</span>
                    </div>
                    <span class="accordion-icon">▼</span>
                </div>
                <div class="accordion-content">
                    <div class="wcag-rule-info">
                        <strong>Rule Violation:</strong> <span>color-contrast</span> | 
                        <strong>Standard:</strong> <span>WCAG 2.1 (Success Criterion 1.4.3)</span>
                    </div>
                    <p style="font-size: 0.9rem; margin-bottom: 12px;">The contrast ratio of text elements against their background colors falls below 4.5:1. Visually impaired, colorblind, or elderly users cannot read this text.</p>
                    
                    <div class="code-fix-block">
                        <p style="font-size: 0.85rem; font-weight: 600; color: #fca5a5;">Failing Element CSS:</p>
                        <pre class="code-box bad" data-lang="CSS"><code>${escapeHtml('.hero-subtext {\n  color: #8fa0be; /* Contrast ratio is 2.8:1 */\n  background-color: #0b0f19;\n}')}</code></pre>
                        
                        <p style="font-size: 0.85rem; font-weight: 600; color: #a7f3d0; margin-top: 10px;">Accessibility Correction Suggestion:</p>
                        <pre class="code-box good" data-lang="Corrected CSS"><code>${escapeHtml('.hero-subtext {\n  color: #e2e8f0; /* Contrast ratio is 6.5:1 (Fulfills WCAG AAA!) */\n  background-color: #0b0f19;\n}')}</code></pre>
                        
                        <button class="btn-copy-fix" onclick="copyCode(this)">Copy Corrected Code</button>
                    </div>
                </div>
            </div>

            <div class="violation-accordion">
                <div class="accordion-header" onclick="toggleAccordion(this)">
                    <div class="header-left">
                        <span class="violation-badge critical">CRITICAL</span>
                        <span class="accordion-title">Keyboard Focus Trap or missing interactive outline indicators</span>
                    </div>
                    <span class="accordion-icon">▼</span>
                </div>
                <div class="accordion-content">
                    <div class="wcag-rule-info">
                        <strong>Rule Violation:</strong> <span>focus-visible</span> | 
                        <strong>Standard:</strong> <span>WCAG 2.1 (Success Criterion 2.4.7)</span>
                    </div>
                    <p style="font-size: 0.9rem; margin-bottom: 12px;">Your style rule hides the default focus ring outline. When navigating with the Tab key (used by motor-disabled users), they cannot see where their cursor focus is.</p>
                    
                    <div class="code-fix-block">
                        <p style="font-size: 0.85rem; font-weight: 600; color: #fca5a5;">Failing Element CSS:</p>
                        <pre class="code-box bad" data-lang="CSS"><code>${escapeHtml('button:focus, a:focus {\n  outline: none; /* Severe focus outline removal violation */\n}')}</code></pre>
                        
                        <p style="font-size: 0.85rem; font-weight: 600; color: #a7f3d0; margin-top: 10px;">Accessibility Correction Suggestion:</p>
                        <pre class="code-box good" data-lang="Corrected CSS"><code>${escapeHtml('button:focus, a:focus {\n  outline: 3px solid #6366f1; /* High contrast outline indicator */\n  outline-offset: 2px;\n}')}</code></pre>
                        
                        <button class="btn-copy-fix" onclick="copyCode(this)">Copy Corrected Code</button>
                    </div>
                </div>
            </div>

            <div class="violation-accordion">
                <div class="accordion-header" onclick="toggleAccordion(this)">
                    <div class="header-left">
                        <span class="violation-badge warning">WARNING</span>
                        <span class="accordion-title">Skipped Heading Hierarchical Structure levels</span>
                    </div>
                    <span class="accordion-icon">▼</span>
                </div>
                <div class="accordion-content">
                    <div class="wcag-rule-info">
                        <strong>Rule Violation:</strong> <span>heading-order</span> | 
                        <strong>Standard:</strong> <span>WCAG 2.1 (Success Criterion 1.3.1)</span>
                    </div>
                    <p style="font-size: 0.9rem; margin-bottom: 12px;">Headings are skipped incorrectly (e.g., using an &lt;h3&gt; tag directly after an &lt;h1&gt; skipping &lt;h2&gt;). Screen-reader users navigate documents by headings, and skipped levels disorient them.</p>
                    
                    <div class="code-fix-block">
                        <p style="font-size: 0.85rem; font-weight: 600; color: #fca5a5;">Failing Element structure:</p>
                        <pre class="code-box bad" data-lang="HTML"><code>${escapeHtml('<h1>Main Page Title</h1>\n<h3>Section Title</h3> <!-- Skipped H2 level -->')}</code></pre>
                        
                        <p style="font-size: 0.85rem; font-weight: 600; color: #a7f3d0; margin-top: 10px;">Accessibility Correction Suggestion:</p>
                        <pre class="code-box good" data-lang="Corrected HTML"><code>${escapeHtml('<h1>Main Page Title</h1>\n<h2>Section Title</h2> <!-- Safe semantic hierarchy -->')}</code></pre>
                        
                        <button class="btn-copy-fix" onclick="copyCode(this)">Copy Corrected Code</button>
                    </div>
                </div>
            </div>
        `;
    }

    // SVG Score Animate Function
    function animateScore(targetScore) {
        let currentScore = 0;
        scoreVal.innerText = "0%";
        
        progressSvg.className = "radial-progress";
        if (targetScore < 70) {
            progressSvg.classList.add("fail");
        } else if (targetScore < 90) {
            progressSvg.classList.add("warning");
        }

        const circumference = 2 * Math.PI * 30; // r=30
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;

        const interval = setInterval(() => {
            if (currentScore >= targetScore) {
                clearInterval(interval);
            } else {
                currentScore++;
                scoreVal.innerText = `${currentScore}%`;
                const offset = circumference - (currentScore / 100) * circumference;
                progressCircle.style.strokeDashoffset = offset;
            }
        }, 15);
    }

    // Escape HTML strings safely
    function escapeHtml(string) {
        return string.replace(/&/g, "&amp;")
                     .replace(/</g, "&lt;")
                     .replace(/>/g, "&gt;")
                     .replace(/"/g, "&quot;")
                     .replace(/'/g, "&#039;");
    }

    // Interactive checkout promo engine with LAUNCH20 calculations
    const couponInput = document.getElementById("coupon-input");
    const btnApply = document.getElementById("btn-apply");
    const strikePrice = document.getElementById("strike-price");
    const discountRow = document.getElementById("discount-row");
    const discountVal = document.getElementById("discount-val");
    const finalPriceVal = document.getElementById("final-price");
    const btnCheckout = document.getElementById("btn-checkout");
    const countdownVal = document.getElementById("countdown-val");

    btnApply.addEventListener("click", () => {
        const code = couponInput.value.trim().toUpperCase();
        if (code === "LAUNCH20") {
            // Check if coupon is expired (Launch: June 1, 2026 | Expiry: July 1, 2026)
            const expiryDate = new Date("2026-07-01T23:59:59");
            const currentDate = new Date();
            
            if (currentDate > expiryDate) {
                alert("This promo code (LAUNCH20) expired on July 1, 2026. The 30-day launch campaign has successfully concluded.");
                return;
            }
            
            // Apply 20% discount on £299
            strikePrice.style.display = "inline";
            discountRow.style.display = "flex";
            discountVal.innerText = "-£59.80";
            finalPriceVal.innerText = "£239.20";
            btnCheckout.innerText = "Secure Premium License - £239.20 / yr";
            
            // Add custom visual glow
            btnApply.style.background = "var(--success)";
            btnApply.innerText = "APPLIED";
            btnApply.disabled = true;
            couponInput.disabled = true;

            alert("LAUNCH20 Applied! 20% Launch Discount has been deducted.");
        } else {
            alert("Invalid Promo Code! Use code 'LAUNCH20' to get 20% discount.");
        }
    });

    // Mock interactive overlay accessibility widget previews
    const widgetIcon = document.getElementById("widget-icon");
    widgetIcon.addEventListener("click", () => {
        alert("🛡️ LegAlly Accessibility Overlay Widget Mock!\n\nThis is a premium widget module. In the premium tier (£239/yr), pasting a single-line script tag onto your site loads this floating button. It lets disabled visitors toggle text resizing, high contrast filters, screen readers, and keyboard navigation guides on-the-fly, giving you instantly improved legal protection!");
    });

    // Premium PDF Purchase modal logic
    const pdfModal = document.getElementById("pdf-modal");
    const premiumBtn = document.getElementById("btn-premium-action");
    const cancelModalBtn = document.getElementById("cancel-modal-btn");
    const confirmPaymentBtn = document.getElementById("confirm-payment-btn");
    const payEmail = document.getElementById("pay-email");
    const payCard = document.getElementById("pay-card");

    premiumBtn.addEventListener("click", () => {
        pdfModal.style.display = "flex";
    });

    cancelModalBtn.addEventListener("click", () => {
        pdfModal.style.display = "none";
    });

    confirmPaymentBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const email = payEmail.value.trim();
        const card = payCard.value.trim();

        if (!email || !card) {
            alert("Please fill in your payment details first.");
            return;
        }

        pdfModal.style.display = "none";
        alert("Payment Successful! Generating your premium white-labeled PDF Accessibility Compliance Audit...");
        
        // Open native print window which styles dashboard for a gorgeous PDF printout
        window.print();
    });

    // Live active license counter FOMO logic
    let remainingLicenses = 14;
    const licenseInterval = setInterval(() => {
        if (remainingLicenses > 3) {
            remainingLicenses -= Math.floor(Math.random() * 2);
            countdownVal.innerText = remainingLicenses;
        } else {
            clearInterval(licenseInterval);
        }
    }, 45000); // decrement occasionally

    // Dynamic FAQ accordion handler
    window.toggleFaq = (header) => {
        const accordion = header.parentElement;
        accordion.classList.toggle("open");
    };

    // Make global functions accessible to inline events
    window.toggleAccordion = (header) => {
        const accordion = header.parentElement;
        accordion.classList.toggle("open");
    };

    window.copyCode = (btn) => {
        const codeBox = btn.parentElement.querySelector(".code-box.good code");
        navigator.clipboard.writeText(codeBox.innerText).then(() => {
            const originalText = btn.innerText;
            btn.innerText = "COPIED!";
            btn.style.background = "var(--success)";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "rgba(255, 255, 255, 0.05)";
            }, 1500);
        });
    };

    window.loadLegalTab = (tabName) => {
        const tabBtns = document.querySelectorAll(".legal-tab-btn");
        const bodyContent = document.getElementById("legal-content-body");

        tabBtns.forEach(btn => {
            btn.classList.remove("active");
            if (btn.getAttribute("onclick").includes(tabName)) {
                btn.classList.add("active");
            }
        });

        // Inject text from legal.js
        if (typeof LegalDocs !== "undefined" && LegalDocs[tabName]) {
            bodyContent.innerHTML = LegalDocs[tabName];
        }
    };

    window.openLegalInFooter = (docName) => {
        // Toggle view
        mainSection.style.display = "none";
        legalView.style.display = "block";
        
        // Mark link as active
        navLinks.forEach(l => {
            l.classList.remove("active");
            if (l.getAttribute("data-target") === "legal") {
                l.classList.add("active");
            }
        });

        loadLegalTab(docName);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.resetScanner = () => {
        heroSection.style.display = "block";
        scanContainer.style.display = "block";
        if (testimonialsSection) testimonialsSection.style.display = "block";
        if (faqSection) faqSection.style.display = "block";
        dashboardView.style.display = "none";
        urlInput.value = "";
        htmlInput.value = "";
    };
});
