# InSure – AI-Powered Parametric Insurance for Q-Commerce Delivery Partners

Protecting gig worker income, automatically — no claims, no paperwork, no waiting.



## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Solution Overview](#solution-overview)
3. [Persona-Based Scenarios](#persona-based-scenarios)
4. [Application Workflow](#application-workflow)
5. [Weekly Premium Model](#weekly-premium-model)
6. [Parametric Triggers](#parametric-triggers)
7. [Why Mobile](#why-mobile)
8. [AI/ML Integration](#aiml-integration)
9. [Integration Layer](#integration-layer)
10. [Analytics Dashboard](#analytics-dashboard)
11. [Tech Stack](#tech-stack)
12. [Development Plan](#development-plan)
13. [Business Impact](#business-impact)



## Problem Statement

Q-commerce delivery partners in India operate in high-pressure, high-frequency environments. Their income depends entirely on uninterrupted order flow — but disruptions happen every single day. Heavy rain, floods, city-wide strikes, sudden bandhs, and curfews can wipe out an entire day's earnings with zero warning and zero recourse.

A delivery partner in a city like Chennai can lose anywhere between ₹200 to ₹800 on a single disrupted day. Multiply that across weeks and months, and the income volatility becomes severe — especially for workers who have no savings buffer, no employer benefits, and no existing insurance product built for their reality.

Traditional insurance doesn't work here. It's too slow, too manual, and designed for a very different kind of risk. There is currently no financial safety net for short-duration, high-frequency income loss in the gig economy.

**InSure exists to fix that.**



## Solution Overview

InSure is a parametric insurance product built specifically for Q-commerce delivery partners. Instead of filing claims after a disruption, the system detects disruptions automatically, validates worker activity in real time, and triggers payouts directly to the worker's UPI — all without any manual intervention.

> **InSure insures earning time, not just events.**

> **Unlike traditional insurance, InSure eliminates claims entirely through parametric automation.**

The core idea is simple: define measurable thresholds for disruption events, monitor those conditions continuously, and pay out the moment a threshold is crossed given the worker was active in that zone.

**InSure strictly covers income loss only and does not include health, accident, or asset-based insurance.** This narrow focus enables precision in modeling, simplicity in product design, and speed in execution.

Onboarding is optimized to require minimal inputs — location, working hours, and platform — while generating a full AI risk profile instantly.

**Key capabilities:**
- Real-time monitoring of weather, civic events, and platform signals
- AI-based risk scoring per worker, per zone, per time window
- Parametric auto-triggering with zero manual claims
- Fraud-resistant validation using location and activity data
- UPI-based instant payout in under 10 minutes



## Persona-Based Scenarios

### Persona 1 — Manotharini, Blinkit Partner, Chennai

Manotharini works 6–10 PM daily, which are peak delivery hours. She is on the Standard plan (₹59/week) after the AI flagged her zone's risk score at 72% due to frequent heavy rainfall and high dark store dependency.

**Scenario:** On a Tuesday evening, rainfall in her zone crosses 20mm/hr. The InSure monitoring engine detects this, classifies it as a parametric trigger, and confirms Manotharini was active in that zone during the window. Her income loss is calculated at ₹200 base, with a 1.5x peak-hour multiplier applied — she receives ₹300 directly to her UPI within minutes, without doing anything.



### Persona 2 — Ravi, Zepto Partner, Bengaluru

Ravi works mornings and is in a lower-risk zone. The AI recommends the Basic plan (₹29/week). One morning, a city-wide bandh is declared. Order volume drops sharply, dark stores shut down, and Ravi cannot complete deliveries.

**Scenario:** InSure detects the bandh classification through government alert APIs, verifies Ravi was logged in and active, and triggers a payout based on his estimated hourly income loss for that window. The payout hits his account before noon.



### Persona 3 — Divya, New Partner, Hyderabad

Divya just signed up. Her zone has no prior disruption history. The AI assigns her a low-risk score and recommends the Basic plan. After two weeks of clean data, her zone records a severe heat advisory — AQI and temperature thresholds are crossed.

**Scenario:** InSure classifies this as an environmental disruption, validates Divya's activity, and initiates a payout. Her trust score is newly established, so the system runs a quick verification pass before releasing the payment — completed in under 10 minutes.



## Application Workflow

```
User Onboarding
      ↓
AI Risk Scoring (zone, hours, location history)
      ↓
Plan Recommendation → Plan Selected → Coverage Activated
      ↓
Continuous Monitoring Loop (runs 24/7, polls every 15 minutes)
      ↓
Disruption Detected? → No → Loop continues
      ↓ Yes
Disruption Classification (Environmental / Social / System)
      ↓
Threshold Check → Not met → Loop continues
      ↓ Met
AI Validation Engine triggered
      ↓
Verify User Activity in Zone
      ↓
User Eligible? → No → Claim denied, loop continues
      ↓ Yes
Income Loss Calculation (base amount + multipliers)
      ↓
Fraud Detection Checks
      ↓
Fraud Detected? → Yes → Flag and review
      ↓ No
Payout Initiated via UPI
      ↓
Coverage and Claims Updated → Loop continues
```

The entire flow from disruption detection to payout is designed to complete in under 10 minutes.



## Weekly Premium Model

InSure operates on a weekly subscription model, designed around the short earning cycles of gig workers. Premiums are low, accessible, and tied directly to payout potential.

| Plan    | Weekly Premium | Max Weekly Payout | Claims per Week | Claims per Day |
|---------|---------------|-------------------|-----------------|----------------|
| Basic   | ₹29           | ₹500              | 2               | 1              |
| Standard| ₹59           | ₹1,000            | 2               | 1              |
| Premium | ₹79           | ₹1,500            | 2               | 1              |

**How the model works:**
- Coverage is active only during declared delivery hours
- The AI recommends a plan at onboarding based on the worker's zone risk score
- Peak-hour deliveries (6–10 PM) receive a 1.5x payout multiplier
- Weekly plan limits reset every Monday
- Workers can upgrade or downgrade their plan at the start of a new week

The weekly structure was chosen deliberately — gig workers don't think in monthly or annual terms. Their income cycle is daily and weekly, so their insurance should match that rhythm.

> The model is designed to remain sustainable by capping weekly payouts and limiting coverage to the highest-impact disruptions only.



## Parametric Triggers

Parametric insurance pays out based on objective, measurable events — not subjective loss assessments. Below are the defined trigger categories and thresholds used in InSure.

### Environmental Triggers
| Event            | Threshold                                      |
|------------------|------------------------------------------------|
| Heavy Rain       | Rainfall > 15mm/hr in delivery zone            |
| Extreme Heat     | Temperature > 42°C with active heat advisory   |
| Floods           | Government flood alert issued for zone         |
| Severe Pollution | AQI > 300 in active delivery area              |

### Social Triggers
| Event           | Threshold                                          |
|-----------------|----------------------------------------------------|
| Protests/Strikes| Verified roadblock or delivery halt in zone        |
| Bharat Bandh    | National or state-level bandh declared             |
| Curfews         | Section 144 or curfew active in delivery zone      |
| Market Closures | > 60% of dark stores in zone offline               |

### System/Public Triggers
| Event             | Threshold                                        |
|-------------------|--------------------------------------------------|
| Sudden Holidays   | Unplanned public holiday with platform demand drop > 40% |
| Government Shutdown| Administrative restriction on delivery operations |

All thresholds are checked against real-time data from weather APIs, government alert feeds, and platform order signals. A trigger only fires if the worker was verified as active in the affected zone during the disruption window.



## Why Mobile

InSure is built as a mobile-first product for the following reasons:

**1. The user is always on a phone.** Delivery partners work entirely through mobile apps — Blinkit, Zepto, Swiggy. They check assignments, navigate routes, and manage earnings on their phones. A web platform would create unnecessary friction in their workflow.

**2. GPS and location data.** Mobile enables real-time GPS tracking, which is essential for verifying that the worker was active in the disrupted zone. This is a core part of the validation engine and cannot be replicated effectively on web.

**3. UPI and payment integrations.** Mobile platforms have native, seamless UPI integration. Triggering instant payouts via UPI is far more reliable and user-friendly on mobile than on web for this demographic.

**4. Push notifications.** Workers need to be informed the moment a payout is triggered — not when they next open a browser. Mobile push notifications enable real-time communication that is critical for trust and transparency.

**5. Accessibility.** A large proportion of delivery partners are not comfortable navigating web browsers for financial products. A clean, simple mobile app reduces cognitive overhead and increases adoption.



## AI/ML Integration

### 1. Risk Scoring Engine
At onboarding and on a rolling weekly basis, a risk model evaluates:
- Historical weather disruption frequency in the worker's zone (micro-location level)
- Time-of-day earning concentration (peak-hour dependency)
- Platform order volatility in their area
- Frequency of past operational disruptions

Output: a dynamic risk score (0–100%) used to recommend the appropriate plan and adjust payout calculations.

**Model type:** Gradient Boosted Trees (XGBoost) trained on historical weather, platform, and civic event data. Simulated ML is used in the current prototype phase.

### 2. Disruption Classification
When a monitoring signal is detected, an NLP + rule-based classifier determines the disruption type (environmental, social, system) and maps it to the correct parametric threshold.

### 3. Loss Calculation Model
Income loss is calculated based on:
- Worker's average hourly earnings (derived from platform activity history)
- Duration of the disruption window
- Zone-level order volume drop percentage
- Peak-hour multiplier (1.5x for 6–10 PM window)

### 4. Fraud Detection
Multi-layer fraud checks run before every payout:
- GPS location cross-validation against declared active zone
- Platform activity verification (was the worker actually logged in?)
- Duplicate claim detection across the weekly window
- Anomaly scoring on claim patterns vs. historical behaviour

**Model type:** Isolation Forest for anomaly detection + rule-based hard limits (max 2 claims/week, 1/day).

### 5. Trust Score
Each worker builds a Trust Score over time based on claim history, location consistency, and platform engagement. A high Trust Score enables instant payout. A lower score triggers an additional verification pass before release.



## Integration Layer

InSure is built on a set of real-time data integrations that power the monitoring, validation, and payout pipeline. Each integration is explicitly tied to a stage in the claim lifecycle.

| Integration                  | Purpose                                                        |
|------------------------------|----------------------------------------------------------------|
| OpenWeatherMap / IMD API      | Real-time rainfall, temperature, AQI monitoring per zone       |
| Platform APIs (simulated)     | Order volume signals, partner activity logs, dark store status |
| Government / Civic Alert Feeds| Bandh, curfew, Section 144, flood advisories                  |
| Razorpay UPI API              | Instant payout disbursement to partner accounts                |
| Google Maps / Mapbox          | GPS zone mapping, delivery area boundary validation            |
| Firebase Auth                 | Phone OTP-based identity verification at onboarding            |

> Platform API integration (Blinkit, Zepto) is currently simulated in the prototype. Live integration is planned for Phase 2.



## Analytics Dashboard

InSure includes a built-in analytics dashboard for both delivery partners and platform administrators.

### Worker View
- Earnings protected this week (total payout received)
- Claims used vs. claims remaining (weekly limit tracker)
- Current AI risk score and trend over past 4 weeks
- Recent claim history with disruption type and payout amount
- Trust Score and what it means for payout speed

### Admin / Platform View
- Total payouts disbursed across all partners
- Loss ratios per zone and per disruption type
- Most frequently triggered disruptions (ranked)
- High-risk zones map overlay
- Fraud flag rate and anomaly detection summary
- Weekly claim volume trends



## Tech Stack

| Layer              | Technology                                      |
|--------------------|-------------------------------------------------|
| Mobile Frontend    | React Native (iOS + Android)                    |
| Backend API        | Node.js + Express                               |
| Database           | PostgreSQL (structured data) + Redis (caching)  |
| AI/ML              | Python (scikit-learn, XGBoost, FastAPI)         |
| Real-time Monitoring | Cron jobs + WebSocket event pipeline          |
| Weather Data       | OpenWeatherMap API / IMD data feeds             |
| Civic Alerts       | Government open data APIs + manual feed         |
| Location Services  | Google Maps API / Mapbox                        |
| Payments           | Razorpay UPI API                                |
| Authentication     | Firebase Auth (phone OTP)                       |
| Hosting            | AWS EC2 + S3 + RDS                              |



## Development Plan

### Phase 1 — Prototype (Current)
- Frontend simulation of full user journey (onboarding → dashboard → monitoring → payout)
- Simulated ML risk scoring engine
- Static parametric trigger definitions
- UI for plan selection, disruption monitoring, and analytics dashboard

### Phase 2 — Core Backend
- Live weather and civic alert API integrations
- Real-time monitoring loop (15-minute polling)
- Parametric threshold engine with classification logic
- PostgreSQL schema for users, plans, claims, and payouts

### Phase 3 — AI/ML Pipeline
- Risk scoring model trained on historical data
- Fraud detection integration
- Trust Score system
- Loss calculation engine with peak-hour multiplier

### Phase 4 — Payments + Launch
- Razorpay UPI payout integration
- End-to-end claim automation testing
- Security audit and fraud stress testing
- Pilot launch with a small cohort of delivery partners



## Business Impact

- Reduces income volatility for millions of Q-commerce gig workers
- Provides immediate financial support during disruptions without friction
- Builds long-term trust between delivery partners and platforms
- Creates a new embedded insurance distribution channel within gig ecosystems
- Scalable to other gig categories: cab drivers, freelance workers, daily wage earners


