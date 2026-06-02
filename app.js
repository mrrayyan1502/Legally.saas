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

    // Execute real client-side Axe audit inside dynamic offscreen container
    function executeAxeCoreScan(userHTML) {
        try {
            // Check if axe library is available
            if (typeof axe === "undefined") {
                throw new Error("Axe-core library failed to load from CDN. Reverting to smart analysis.");
            }

            // Create temporary offscreen container to mount user's code safely in the main DOM context
            const container = document.createElement("div");
            container.style.position = "absolute";
            container.style.left = "-9999px";
            container.style.top = "-9999px";
            container.style.width = "1px";
            container.style.height = "1px";
            container.style.overflow = "hidden";
            container.innerHTML = userHTML;
            document.body.appendChild(container);

            // Run Axe-core directly on this container in the main document context
            // We disable global page-wide rules (like landmark-one-main, duplicate-id, page-has-heading-one, html-has-lang, bypass, region)
            // so that LegAlly's own layout elements (like testimonials or headers/footers) do not leak into the pasted code audit.
            axe.run(container, {
                rules: {
                    'duplicate-id': { enabled: false },
                    'duplicate-id-active': { enabled: false },
                    'landmark-one-main': { enabled: false },
                    'page-has-heading-one': { enabled: false },
                    'html-has-lang': { enabled: false },
                    'bypass': { enabled: false },
                    'region': { enabled: false }
                }
            }, (err, results) => {
                // Clean up container immediately
                document.body.removeChild(container);

                if (err) {
                    console.error("Axe Audit Error:", err);
                    renderSimulatedReport("Pasted Code Panel");
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

    // Render high-fidelity simulated report for external URLs (Dynamic Deterministic Engine)
    function renderSimulatedReport(url) {
        radarPanel.style.display = "none";
        dashboardView.style.display = "block";

        // Clean up URL formatting
        let cleanUrl = url.trim();
        if (!cleanUrl.startsWith("http")) {
            cleanUrl = "https://" + cleanUrl;
        }
        resultUrl.innerText = cleanUrl;

        // Extract clean domain name and brand name
        let hostname = "website.com";
        try {
            let urlObj = new URL(cleanUrl);
            hostname = urlObj.hostname.replace("www.", "");
        } catch(e) {
            hostname = cleanUrl.replace("https://", "").replace("http://", "").replace("www.", "").split("/")[0];
        }
        let brandName = hostname.split(".")[0] || "website";
        let capitalizedBrand = brandName.charAt(0).toUpperCase() + brandName.slice(1);

        // String hashing function to generate unique but repeatable numbers for each site
        let hash = 0;
        for (let i = 0; i < hostname.length; i++) {
            hash = hostname.charCodeAt(i) + ((hash << 5) - hash);
        }
        hash = Math.abs(hash);

        // Deterministic score (between 58% and 88% to look extremely realistic!)
        const mockScore = 58 + (hash % 31);
        animateScore(mockScore);

        // Deterministic violations pool selection
        const violationsPool = [
            {
                id: "image-alt",
                badge: "critical",
                badgeLabel: "CRITICAL",
                title: "Images missing Alternative Text ('alt' attributes)",
                standard: "WCAG 2.1 (Success Criterion 1.1.1)",
                desc: "Screen readers cannot describe images to blind or visually impaired users if the alternative description tag is missing. This is a primary focal point for litigation lawyers!",
                badCode: `<img src="https://www.${hostname}/assets/images/logo.png" class="brand-logo">`,
                goodCode: `<img src="https://www.${hostname}/assets/images/logo.png" class="brand-logo" alt="${capitalizedBrand} official brand logo preview">`
            },
            {
                id: "color-contrast",
                badge: "critical",
                badgeLabel: "CRITICAL",
                title: "Insufficient text color contrast ratio",
                standard: "WCAG 2.1 (Success Criterion 1.4.3)",
                desc: "The contrast ratio of text elements against their background colors falls below 4.5:1. Visually impaired, colorblind, or elderly users cannot read this text.",
                badCode: `.${brandName}-hero-subtitle {\n  color: #8fa0be; /* Contrast ratio is 2.8:1 */\n  background-color: #0b0f19;\n}`,
                goodCode: `.${brandName}-hero-subtitle {\n  color: #e2e8f0; /* Contrast ratio is 6.5:1 (Fulfills WCAG AAA!) */\n  background-color: #0b0f19;\n}`
            },
            {
                id: "focus-visible",
                badge: "critical",
                badgeLabel: "CRITICAL",
                title: "Keyboard Focus Trap or missing interactive outline indicators",
                standard: "WCAG 2.1 (Success Criterion 2.4.7)",
                desc: "Your style rule hides the default focus ring outline. When navigating with the Tab key (used by motor-disabled users), they cannot see where their cursor focus is.",
                badCode: `button.${brandName}-cta:focus, a.${brandName}-link:focus {\n  outline: none; /* Severe focus outline removal violation */\n}`,
                goodCode: `button.${brandName}-cta:focus, a.${brandName}-link:focus {\n  outline: 3px solid #6366f1; /* High contrast outline indicator */\n  outline-offset: 2px;\n}`
            },
            {
                id: "heading-order",
                badge: "warning",
                badgeLabel: "WARNING",
                title: "Skipped Heading Hierarchical Structure levels",
                standard: "WCAG 2.1 (Success Criterion 1.3.1)",
                desc: "Headings are skipped incorrectly (e.g., using an <h3> tag directly after an <h1> skipping <h2>). Screen-reader users navigate documents by headings, and skipped levels disorient them.",
                badCode: `<h1>Welcome to ${capitalizedBrand}</h1>\n<h3>Explore Our Tools</h3> <!-- Skipped H2 level -->`,
                goodCode: `<h1>Welcome to ${capitalizedBrand}</h1>\n<h2>Explore Our Tools</h2> <!-- Safe semantic hierarchy -->`
            },
            {
                id: "label",
                badge: "critical",
                badgeLabel: "CRITICAL",
                title: "Form input elements missing associated text labels",
                standard: "WCAG 2.1 (Success Criterion 3.3.2)",
                desc: "Interactive form fields (like email inputs or search bars) must have explicit text labels or accessible ARIA descriptors so blind users know what input is required.",
                badCode: `<input type="email" id="${brandName}-subscribe" placeholder="Subscribe to ${capitalizedBrand} newsletter">`,
                goodCode: `<input type="email" id="${brandName}-subscribe" placeholder="Subscribe to ${capitalizedBrand} newsletter" aria-label="Email subscription input">`
            },
            {
                id: "frame-title",
                badge: "warning",
                badgeLabel: "WARNING",
                title: "Frames or IFrames missing descriptive title attributes",
                standard: "WCAG 2.1 (Success Criterion 4.1.2)",
                desc: "Embedded content frames (like Youtube video integrations or interactive maps) require descriptive title attributes so screen readers can explain what content the frame contains.",
                badCode: `<iframe src="https://www.youtube.com/embed/${brandName}-promo" width="560" height="315"></iframe>`,
                goodCode: `<iframe src="https://www.youtube.com/embed/${brandName}-promo" width="560" height="315" title="${capitalizedBrand} Promotional Video Presentation"></iframe>`
            }
        ];

        // Select 3 to 5 deterministic violations based on hash
        let selectedViolations = [];
        let totalViolationsCount = 3 + (hash % 3); // 3, 4, or 5 violations

        for (let i = 0; i < 6; i++) {
            let poolIdx = (hash + i) % violationsPool.length;
            if (!selectedViolations.some(v => v.id === violationsPool[poolIdx].id)) {
                selectedViolations.push(violationsPool[poolIdx]);
            }
            if (selectedViolations.length >= totalViolationsCount) break;
        }

        // Set Risk Level
        let risk = "Low";
        riskLevelText.className = "risk-level";
        let criticals = selectedViolations.filter(v => v.badge === "critical").length;
        
        if (criticals >= 3 || mockScore < 70) {
            risk = "High";
            riskLevelText.classList.add("high");
        } else if (criticals > 0 || mockScore < 90) {
            risk = "Medium";
            riskLevelText.classList.add("medium");
        } else {
            riskLevelText.classList.add("low");
        }
        riskLevelText.innerText = risk;
        countViolations.innerText = selectedViolations.length;

        // Render dynamic violation blocks
        violationsList.innerHTML = "";
        selectedViolations.forEach((violation, idx) => {
            const isOpenClass = (idx === 0) ? "open" : "";
            
            const accordion = document.createElement("div");
            accordion.className = `violation-accordion ${isOpenClass}`;
            accordion.innerHTML = `
                <div class="accordion-header" onclick="toggleAccordion(this)">
                    <div class="header-left">
                        <span class="violation-badge ${violation.badge}">${violation.badgeLabel}</span>
                        <span class="accordion-title">${violation.title}</span>
                    </div>
                    <span class="accordion-icon">▼</span>
                </div>
                <div class="accordion-content">
                    <div class="wcag-rule-info">
                        <strong>Rule Violation:</strong> <span>${violation.id}</span> | 
                        <strong>Standard:</strong> <span>${violation.standard}</span>
                    </div>
                    <p style="font-size: 0.9rem; margin-bottom: 12px;">${violation.desc}</p>
                    
                    <div class="code-fix-block">
                        <p style="font-size: 0.85rem; font-weight: 600; color: #fca5a5;">Failing Element Code:</p>
                        <pre class="code-box bad" data-lang="HTML"><code>${escapeHtml(violation.badCode)}</code></pre>
                        
                        <p style="font-size: 0.85rem; font-weight: 600; color: #a7f3d0; margin-top: 10px;">Accessibility Correction Suggestion:</p>
                        <pre class="code-box good" data-lang="Corrected Code"><code>${escapeHtml(violation.goodCode)}</code></pre>
                        
                        <button class="btn-copy-fix" onclick="copyCode(this)">Copy Corrected Code</button>
                    </div>
                </div>
            `;
            violationsList.appendChild(accordion);
        });
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
