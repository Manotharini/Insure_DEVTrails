import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  CloudRain,
  IndianRupee,
  Loader2,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingDown,
  UserRound,
  Wallet,
  Zap,
} from "lucide-react";

const plans = [
  {
    id: "basic",
    name: "Basic",
    premium: 29,
    maxWeeklyPayout: 500,
    maxClaimsPerWeek: 2,
    maxClaimsPerDay: 1,
    coverage: "Max payout ₹500/week • Up to 2 claims/week",
  },
  {
    id: "standard",
    name: "Standard",
    premium: 59,
    maxWeeklyPayout: 1000,
    maxClaimsPerWeek: 2,
    maxClaimsPerDay: 1,
    coverage: "Max payout ₹1000/week • Up to 2 claims/week",
  },
  {
    id: "premium",
    name: "Premium",
    premium: 79,
    maxWeeklyPayout: 1500,
    maxClaimsPerWeek: 2,
    maxClaimsPerDay: 1,
    coverage: "Max payout ₹1500/week • Up to 2 claims/week",
  },
];

const disruptionEvents = [
  {
    id: "extreme-heat",
    category: "Environmental",
    label: "Extreme heat",
    icon: null,
    type: "Extreme heat",
    severity: "High",
    duration: "3 hrs",
    engineCondition: "Temperature > 40°C for 3 hrs",
    engineDataSource: "Weather API",
    impact: {
      cannotWork: "Delivery capacity drops due to heat-stress limits",
      areaInaccessible: "Hotspot zones restricted temporarily",
      ordersAffected: "Order fulfillment slows and cancellations rise",
    },
    loss: 240,
  },
  {
    id: "heavy-rain",
    category: "Environmental",
    label: "Heavy rain",
    icon: CloudRain,
    type: "Rain",
    severity: "High",
    duration: "2 hrs",
    engineCondition: "Rain > 25 mm/hr for 2 hrs",
    engineDataSource: "Weather API",
    impact: {
      cannotWork: "Wetter routes reduce delivery efficiency",
      areaInaccessible: "Waterlogged lanes become inaccessible",
      ordersAffected: "Order pickup/delivery delays spike",
    },
    loss: 200,
  },
  {
    id: "floods",
    category: "Environmental",
    label: "Floods",
    icon: null,
    type: "Floods",
    severity: "Critical",
    duration: "90 min",
    engineCondition: "Flood level above threshold for 90 mins",
    engineDataSource: "Weather API",
    impact: {
      cannotWork: "Routes cannot be serviced safely",
      areaInaccessible: "Large areas isolated by water",
      ordersAffected: "Long delays & failed deliveries",
    },
    loss: 340,
  },
  {
    id: "severe-pollution",
    category: "Environmental",
    label: "Severe pollution",
    icon: null,
    type: "Pollution",
    severity: "Medium",
    duration: "2 hrs",
    engineCondition: "PM2.5 > 250 for 2 hrs",
    engineDataSource: "Weather API",
    impact: {
      cannotWork: "Health-safety restrictions reduce active deliveries",
      areaInaccessible: "Air-quality advisories restrict certain routes",
      ordersAffected: "Demand spikes but fulfillment slows",
    },
    loss: 260,
  },
  // Social disruptions (no accidents / no personal incidents)
  {
    id: "protests",
    category: "Social",
    label: "Protests",
    icon: null,
    type: "Protests",
    severity: "High",
    duration: "60 min",
    engineCondition: "Crowd disruption detected for 60 mins",
    engineDataSource: "Weather API",
    impact: {
      cannotWork: "Delivery work pauses near protest corridors",
      areaInaccessible: "Roadblocks restrict movement in pockets",
      ordersAffected: "Order routes rerouted; delays increase",
    },
    loss: 280,
  },
  {
    id: "strikes",
    category: "Social",
    label: "Strikes",
    icon: null,
    type: "Strikes",
    severity: "Medium",
    duration: "90 min",
    engineCondition: "Service strike window active for 90 mins",
    engineDataSource: "Weather API",
    impact: {
      cannotWork: "Operational capacity reduced",
      areaInaccessible: "Certain areas temporarily unavailable",
      ordersAffected: "Order processing slows and backlogs form",
    },
    loss: 250,
  },
  {
    id: "bharat-bandh",
    category: "Social",
    label: "Bharat Bandh",
    icon: null,
    type: "Bharat Bandh",
    severity: "Critical",
    duration: "120 min",
    engineCondition: "Shutdown event active for 120 mins",
    engineDataSource: "Weather API",
    impact: {
      cannotWork: "Cannot deliver due to widespread curtailment",
      areaInaccessible: "Multiple zones effectively closed",
      ordersAffected: "Order completions drop sharply",
    },
    loss: 420,
  },
  {
    id: "curfews",
    category: "Social",
    label: "Curfews",
    icon: null,
    type: "Curfews",
    severity: "High",
    duration: "60 min",
    engineCondition: "Curfew window active (8 PM - 9 PM)",
    engineDataSource: "Weather API",
    impact: {
      cannotWork: "Delivery hours constrained by curfew rules",
      areaInaccessible: "Movement restricted in curfew zones",
      ordersAffected: "Order fulfillment rates decline fast",
    },
    loss: 300,
  },
  {
    id: "market-closures",
    category: "Social",
    label: "Market closures",
    icon: null,
    type: "Market closures",
    severity: "Medium",
    duration: "90 min",
    engineCondition: "Market closure detected for 90 mins",
    engineDataSource: "Weather API",
    impact: {
      cannotWork: "Cannot work due to store/market downtime",
      areaInaccessible: "Access reduced near closed marketplaces",
      ordersAffected: "Out-of-stock & delays increase order failures",
    },
    loss: 220,
  },
  // System / Public disruptions
  {
    id: "sudden-holidays",
    category: "System/Public",
    label: "Sudden holidays",
    icon: null,
    type: "Sudden holidays",
    severity: "Low",
    duration: "2 hrs",
    engineCondition: "Holiday calendar match for today",
    engineDataSource: "Weather API",
    impact: {
      cannotWork: "Lower partner demand reduces earning work hours",
      areaInaccessible: "Localized access reduced due to closures",
      ordersAffected: "Order volume declines for delivery slots",
    },
    loss: 140,
  },
  {
    id: "government-shutdowns",
    category: "System/Public",
    label: "Government shutdowns",
    icon: null,
    type: "Government shutdowns",
    severity: "Critical",
    duration: "120 min",
    engineCondition: "Government shutdown active for 120 mins",
    engineDataSource: "Weather API",
    impact: {
      cannotWork: "Cannot deliver due to shutdown constraints",
      areaInaccessible: "Large administrative areas restricted",
      ordersAffected: "Orders affected with major fulfillment drop",
    },
    loss: 460,
  },
];

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function computeRiskProfile(persona) {
  // Simulated hyperlocal ML risk engine (logistic model) using weather + platform + dependency signals.
  // Calibrated so default Chennai persona produces ~72% risk and ~Rs 850 weekly loss.
  const rainMmHr = 28; // Baseline for Chennai zone (demo)
  const peakFlag = persona.peakHoursEnabled ? 1 : 0;
  const darkStoreFraction = Math.max(0, Math.min(1, persona.darkStoreDependency / 100));

  const z = -0.76 + 0.02 * rainMmHr + 0.7 * peakFlag + 0.6 * darkStoreFraction;
  const riskScore = Math.max(1, Math.min(99, Math.round(sigmoid(z) * 100)));

  const predictedWeeklyLoss = Math.round(850 * Math.pow(riskScore / 72, 1.08));

  const reasons = [];
  if (rainMmHr >= 24) reasons.push("Frequent heavy rainfall in your zone");
  if (persona.peakHoursEnabled) reasons.push("Peak delivery hours (6-10 PM)");
  if (persona.darkStoreDependency >= 60) reasons.push("High dependency on dark stores");
  if (reasons.length === 0) reasons.push("Moderate local disruption probability");

  const recommendedPlanId = riskScore >= 75 ? "premium" : riskScore >= 65 ? "standard" : "basic";

  return {
    riskScore,
    predictedWeeklyLoss,
    reasons,
    recommendedPlanId,
  };
}

function isPeakHoursNow(date = new Date()) {
  const hour = date.getHours(); // local time
  // 6–10 PM => 18:00–21:59
  return hour >= 18 && hour < 22;
}

function getImpactMultiplier(peak) {
  return peak ? 1.5 : 1.0;
}

function computeTrustScore({ riskScore, darkStoreDependency }) {
  // Simulated multi-signal trust model: higher local volatility => slightly lower trust.
  const raw = 95 - (riskScore - 50) * 0.4 - (darkStoreDependency - 50) * 0.15;
  return Math.max(60, Math.min(99, Math.round(raw)));
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfWeek(date) {
  // Monday start (local time).
  const d = startOfDay(date);
  const day = d.getDay(); // 0=Sun ... 6=Sat
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

function DashboardCard({ policy, currentPlan, persona, remainingClaimsThisWeek, remainingPayoutBalance, isPeakNow }) {
  return (
    <section className="mb-4 rounded-3xl bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-zinc-500">Delivery Partner</p>
          <h2 className="mt-1 flex items-center gap-2 text-lg font-bold">
            <UserRound className="h-4 w-4 text-zinc-500" /> {persona.name}
          </h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-zinc-600">
            <MapPin className="h-4 w-4 text-zinc-400" />
            {persona.city}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          {policy ? "Active" : "Setup required"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-zinc-50 p-3">
          <p className="text-xs text-zinc-500">Selected plan</p>
          <p className="mt-1 font-semibold">
            {policy ? policy.planName : currentPlan.name} • Rs {policy ? policy.weeklyPremium : currentPlan.premium}/week
          </p>
          {policy ? (
            <p className="mt-1 text-[11px] text-zinc-500">
              {isPeakNow ? "Peak hours live: 1.5x auto-boost" : "Normal hours: base payout"}
            </p>
          ) : null}
        </div>
        <div className="rounded-2xl bg-zinc-50 p-3">
          <p className="text-xs text-zinc-500">Remaining this week</p>
          <p className="mt-1 font-semibold">
            Claims left: {policy ? remainingClaimsThisWeek : "—"}/{policy ? policy.maxClaimsPerWeek : "—"}
          </p>
          <p className="text-[11px] text-zinc-500">
            Payout balance: {policy ? `₹${remainingPayoutBalance} / ₹${policy.maxWeeklyPayout}` : "—"}
          </p>
        </div>
      </div>

      {policy ? (
        <div className="mt-3 rounded-2xl bg-zinc-50 p-3">
          <p className="text-[11px] font-semibold text-zinc-600">Policy ID</p>
          <p className="mt-1 text-sm font-bold text-zinc-900">{policy.id}</p>
          <p className="mt-1 text-[11px] text-zinc-500">{policy.coverageLimit}</p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-zinc-500">
        <span className="rounded-full bg-zinc-100 px-2.5 py-1">Coverage active only during delivery hours</span>
        <span className="rounded-full bg-zinc-100 px-2.5 py-1">Hyperlocal risk engine enabled</span>
        <span className="rounded-full bg-zinc-100 px-2.5 py-1">Real-time parametric triggers</span>
      </div>
    </section>
  );
}

function AIInsightsCard({ riskScore, predictedWeeklyLoss, reasons, recommendedPlanId }) {
  const recommendedPlan = plans.find((p) => p.id === recommendedPlanId) ?? plans[0];
  return (
    <section className="mb-4 rounded-3xl bg-zinc-900 p-5 text-zinc-100 shadow-card">
      <p className="flex items-center gap-2 text-sm font-semibold text-blinkitYellow">
        <Sparkles className="h-4 w-4" />
        AI Insights
      </p>
      <div className="mt-3 space-y-3 text-sm">
        <p className="flex items-center justify-between">
          <span>AI Risk Score</span>
          <span className="font-bold text-blinkitYellow">{riskScore}%</span>
        </p>
        <div className="rounded-xl bg-zinc-800 px-3 py-3 text-xs text-zinc-300">
          <p className="mb-1 font-semibold text-zinc-100">High risk due to:</p>
          {reasons.map((r, idx) => (
            <p key={`${r}-${idx}`} className="leading-5">
              - {r}
            </p>
          ))}
        </div>
        <p className="flex items-center justify-between">
          <span>Predicted Weekly Loss</span>
          <span className="font-semibold">Rs {predictedWeeklyLoss}</span>
        </p>
        <p className="rounded-xl bg-emerald-500/15 px-3 py-2 text-xs text-emerald-200">
          Smart Suggestion: AI recommends Rs {recommendedPlan.premium}/week for better protection in high-risk conditions.
        </p>
        <p className="text-[11px] text-zinc-400">
          Model: Hyperlocal Risk Engine (simulated ML)
        </p>
      </div>
    </section>
  );
}

function PremiumSelector({ selectedPlan, onSelect, recommendedPlanId, disabled }) {
  return (
    <section className="mb-5 rounded-3xl bg-white p-5 shadow-card">
      <div className="mb-3 flex items-center gap-2">
        <Wallet className="h-4 w-4 text-zinc-500" />
        <h3 className="text-sm font-semibold text-zinc-700">Weekly Subscription Plans</h3>
      </div>
      <div className="space-y-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            recommended={plan.id === recommendedPlanId}
            selected={plan.id === selectedPlan}
            onSelect={onSelect}
            disabled={disabled}
          />
        ))}
      </div>
    </section>
  );
}

function PlanCard({ plan, recommended, selected, onSelect, disabled }) {
  return (
    <button
      onClick={() => onSelect(plan.id)}
      disabled={disabled}
      className={`relative w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
        selected
          ? "border-emerald-400 bg-emerald-50 shadow-card"
          : "border-zinc-200 bg-white hover:-translate-y-0.5 hover:shadow-md"
      } ${disabled ? "cursor-not-allowed opacity-60 hover:-translate-y-0 hover:shadow-card" : ""}`}
    >
      {recommended ? (
        <span className="group absolute -top-2.5 right-3 inline-flex items-center justify-center rounded-full bg-blinkitYellow px-2.5 py-1 text-[10px] font-bold tracking-wide text-zinc-900">
          AI RECOMMENDED
          <span className="pointer-events-none absolute -right-2 top-7 hidden w-56 rounded-xl bg-zinc-900 p-2 text-[11px] text-zinc-100 shadow-card group-hover:block">
            Covers extended downtime and higher loss scenarios
          </span>
        </span>
      ) : null}

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-900">{plan.name}</p>
        <p className="text-lg font-bold text-zinc-900">Rs {plan.premium}/week</p>
      </div>
      <div className="mt-1 space-y-1 text-[11px] text-zinc-500">
        <p>Max payout: ₹{plan.maxWeeklyPayout}/week</p>
        <p>
          Claims: {plan.maxClaimsPerWeek}/week • {plan.maxClaimsPerDay}/day
        </p>
      </div>
      {recommended ? (
        <div className="mt-3 rounded-xl bg-zinc-900 px-3 py-2 text-xs text-zinc-100">
          <p className="font-semibold">Recommended for high-risk zones</p>
          <p className="mt-1 text-zinc-300">Covers extended downtime and higher loss scenarios</p>
        </div>
      ) : null}
    </button>
  );
}

function DisruptionPanel({ onSelect, disabled, isPeakNow }) {
  return (
    <section className="animate-popIn rounded-3xl bg-white p-5 shadow-card">
      <div className="mb-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-zinc-700">Live Disruption Simulation</h3>
          <div className="flex gap-2">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              Real-time monitoring active
            </span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600">
              Auto-triggered by system
            </span>
            <span className="rounded-full bg-blinkitYellow px-2.5 py-1 text-[11px] font-extrabold text-zinc-900">
              {isPeakNow ? "Peak hours: 1.5x" : "Normal hours: 1.0x"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 px-3 py-3">
          <span className="h-3.5 w-3.5 rounded-full bg-blinkitYellow animate-ping-soft" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-zinc-800">Monitoring real-time data...</p>
            <p className="mt-0.5 text-[11px] text-zinc-500">
              Scanning weather, platform, and location signals
            </p>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-extrabold text-zinc-700">
            Real-time monitoring active
          </span>
          <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${isPeakNow ? "bg-orange-100 text-orange-700" : "bg-zinc-100 text-zinc-700"}`}>
            {isPeakNow ? "Peak hour boost applied" : "Base payout active"}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { title: "Environmental", color: "bg-sky-50 text-sky-700 border-sky-200" },
          { title: "Social", color: "bg-orange-50 text-orange-700 border-orange-200" },
          { title: "System/Public", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
        ].map((cat) => {
          const events = disruptionEvents.filter((e) => e.category === cat.title);
          if (!events.length) return null;
          return (
            <div key={cat.title}>
              <div className={`mb-2 flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-extrabold ${cat.color}`}>
                <Zap className="h-3.5 w-3.5" />
                {cat.title}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {events.map((event) => {
                  const Icon = event.icon ?? AlertTriangle;
                  return (
                    <button
                      key={event.id}
                      onClick={() => onSelect(event)}
                      disabled={disabled}
                      aria-disabled={disabled}
                      className={`rounded-2xl border bg-zinc-50 px-3 py-2 text-left transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-100 ${
                        disabled ? "cursor-not-allowed opacity-40 hover:-translate-y-0 hover:bg-zinc-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-zinc-600" />
                            <p className="truncate text-xs font-bold text-zinc-900">{event.label}</p>
                          </div>
                          <div className="mt-1 space-y-1">
                            <p className="truncate text-[10px] text-zinc-500">{event.impact.cannotWork}</p>
                            <p className="truncate text-[10px] text-zinc-500">{event.impact.areaInaccessible}</p>
                            <p className="truncate text-[10px] font-semibold text-zinc-700">{event.impact.ordersAffected}</p>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MiniSparkline({ data }) {
  const width = 220;
  const height = 44;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const span = Math.max(max - min, 1);

  const points = data
    .map((v, i) => {
      const x = (i / Math.max(1, data.length - 1)) * width;
      const y = height - ((v - min) / span) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-12 w-full">
      <polyline points={points} fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`${points} ${width},${height} 0,${height}`} fill="rgba(34,197,94,0.12)" stroke="none" />
    </svg>
  );
}

function AnalyticsDashboard({ runs }) {
  const totalDisruptions = runs.length;
  const claimsTriggered = runs.filter((r) => r.claimTriggered).length;
  const successfulPayouts = runs.filter((r) => r.success).length;
  const payoutSuccessRate = claimsTriggered ? Math.round((successfulPayouts / claimsTriggered) * 100) : 0;

  const payoutTotal = runs.reduce((acc, r) => acc + (r.payoutAmount ?? r.incomeLoss ?? 0), 0);
  const avgValidationMs = runs.length
    ? Math.round(runs.reduce((acc, r) => acc + r.validationMs, 0) / runs.length)
    : 0;

  const spark = runs.slice(-10).map((r) => r.payoutAmount ?? r.incomeLoss);
  const avgTrust = runs.length
    ? Math.round(runs.reduce((acc, r) => acc + (r.trustScoreAtTrigger ?? 0), 0) / runs.length)
    : 0;

  return (
    <section className="mb-5 rounded-3xl bg-white p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-700">Analytics Dashboard</h3>
        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600">
          Real-time parametric runs
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-zinc-50 p-3">
          <p className="text-xs text-zinc-500">Disruptions</p>
          <p className="mt-1 text-lg font-bold text-zinc-900">{totalDisruptions}</p>
        </div>
        <div className="rounded-2xl bg-zinc-50 p-3">
          <p className="text-xs text-zinc-500">Claims Triggered</p>
          <p className="mt-1 text-lg font-bold text-zinc-900">{claimsTriggered}</p>
        </div>
        <div className="rounded-2xl bg-zinc-50 p-3">
          <p className="text-xs text-zinc-500">Payout Success</p>
          <p className="mt-1 text-lg font-bold text-zinc-900">{payoutSuccessRate}%</p>
        </div>
        <div className="rounded-2xl bg-zinc-50 p-3">
          <p className="text-xs text-zinc-500">Avg Validation</p>
          <p className="mt-1 text-lg font-bold text-zinc-900">{(avgValidationMs / 1000).toFixed(1)}s</p>
        </div>
        <div className="rounded-2xl bg-zinc-50 p-3">
          <p className="text-xs text-zinc-500">Avg Trust Score</p>
          <p className="mt-1 text-lg font-bold text-zinc-900">{avgTrust}%</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="flex items-center justify-between text-xs text-zinc-500">
          <span>Compensation (recent)</span>
          <span className="font-semibold text-zinc-700">Total Rs {payoutTotal}</span>
        </p>
        <div className="mt-2 rounded-2xl bg-zinc-50 p-3">
          {spark.length ? <MiniSparkline data={spark} /> : <div className="h-12 text-xs text-zinc-500">Run a simulation to see trends.</div>}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold text-zinc-500">Recent Claims</p>
        {runs.length ? (
          runs
            .slice(-3)
            .reverse()
            .map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-2xl bg-zinc-50 px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-zinc-800">{r.eventLabel}</p>
                  <p className="truncate text-[11px] text-zinc-500">
                    Trust {r.trustScoreAtTrigger}% • {r.multiplierApplied}x • {r.payoutChannel}
                  </p>
                </div>
                <p className="text-sm font-extrabold text-emerald-700">Rs {r.payoutAmount ?? r.incomeLoss}</p>
              </div>
            ))
        ) : (
          <div className="rounded-2xl bg-zinc-50 px-3 py-2 text-xs text-zinc-500">No runs yet.</div>
        )}
      </div>
    </section>
  );
}

function OnboardingModal({
  step,
  persona,
  setPersona,
  selectedPlan,
  setSelectedPlan,
  riskProfile,
  recommendedPlanId,
  onActivatePolicy,
  onNextStep,
}) {
  const recommendedPlan = plans.find((p) => p.id === recommendedPlanId) ?? plans[0];
  const activePlan = plans.find((p) => p.id === selectedPlan) ?? recommendedPlan;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md animate-popIn rounded-3xl bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Onboarding</p>
          <p className="text-xs font-semibold text-zinc-500">
            Step {step}/2
          </p>
        </div>

        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full rounded-full bg-zinc-900 transition-all duration-500"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-zinc-900">Set up your delivery persona</h3>
              <p className="mt-1 text-xs text-zinc-500">
                Fast onboarding so disruptions and claims feel hyper-real.
              </p>
            </div>

            <label className="block">
              <p className="text-xs font-semibold text-zinc-600">Delivery partner name</p>
              <input
                value={persona.name}
                onChange={(e) => setPersona({ ...persona, name: e.target.value })}
                className="mt-1 w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
              />
            </label>

            <div>
              <p className="text-xs font-semibold text-zinc-600">Preferred payout channel</p>
              <div className="mt-2 flex gap-2">
                {["UPI", "Bank"].map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setPersona({ ...persona, payoutChannel: ch })}
                    className={`flex-1 rounded-2xl border px-3 py-2 text-sm transition ${
                      persona.payoutChannel === ch
                        ? "border-emerald-400 bg-emerald-50 font-bold"
                        : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-zinc-600">
                Dark store dependency ({persona.darkStoreDependency}%)
              </p>
              <input
                type="range"
                min={0}
                max={100}
                value={persona.darkStoreDependency}
                onChange={(e) => setPersona({ ...persona, darkStoreDependency: Number(e.target.value) })}
                className="mt-2 w-full"
              />
              <p className="mt-1 text-[11px] text-zinc-500">Higher means more income volatility.</p>
            </div>

            <label className="flex items-center justify-between rounded-2xl bg-zinc-50 px-3 py-3">
              <p className="text-xs font-semibold text-zinc-700">Peak hours: 6-10 PM</p>
              <input
                type="checkbox"
                checked={persona.peakHoursEnabled}
                onChange={(e) => setPersona({ ...persona, peakHoursEnabled: e.target.checked })}
              />
            </label>

            <button
              onClick={onNextStep}
              className="w-full rounded-2xl bg-zinc-900 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Next: Create Weekly Policy
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-zinc-900">Create your weekly policy</h3>
              <p className="mt-1 text-xs text-zinc-500">
                Pricing is structured weekly. AI picks the best protection for high-risk zones.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-3">
              <p className="text-xs text-zinc-500">Current risk score</p>
              <p className="mt-1 text-2xl font-extrabold text-blinkitYellow">{riskProfile.riskScore}%</p>
              <p className="mt-1 text-xs text-zinc-600">Predicted weekly loss: Rs {riskProfile.predictedWeeklyLoss}</p>
            </div>

            <div className="space-y-3">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  recommended={plan.id === recommendedPlanId}
                  selected={plan.id === selectedPlan}
                  onSelect={setSelectedPlan}
                />
              ))}
            </div>

            <button
              onClick={() =>
                onActivatePolicy({
                  planId: activePlan.id,
                  weeklyPremium: activePlan.premium,
                  coverageLimit: activePlan.coverage,
                })
              }
              className="w-full rounded-2xl bg-blinkitGreen py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Activate weekly policy
            </button>

            <p className="text-[11px] text-zinc-500">
              Micro-detail: Hyperlocal risk engine enabled • Real-time parametric triggers
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ClaimFlowStepper({
  step,
  activeDisruption,
  locationCity,
  payoutChannelLabel,
  payoutTarget,
  baseLoss,
  payoutAmount,
  impactMultiplier,
  isPeakHours,
  trustScore,
  limitError,
}) {
  const isDetectStep = step === 1;
  const isValidating = step === 2;
  const isClaimStep = step === 3;
  const isLossStep = step === 4;
  const isFraudStep = step === 5;
  const isPayoutStep = step === 6;
  const isSuccessStep = step === 7;

  const flowStage =
    step === 1 ? "Detect" : step === 2 ? "Validate" : step <= 5 ? "Claim" : "Payout";
  const flow = ["Detect", "Validate", "Claim", "Payout"];

  return (
    <div className="rounded-3xl border border-white/20 bg-white/95 p-5 text-zinc-900 shadow-2xl backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Parametric automation
        </p>
        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-700">
          {flowStage}
        </span>
      </div>

      <div className="rounded-2xl bg-zinc-50 p-4">
        <p className="flex items-center gap-2 text-sm font-extrabold text-zinc-900">
          <Zap className="h-4 w-4 text-orange-500" />
          Parametric Engine
        </p>

        <div className="mt-3 space-y-2 text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-zinc-500">Condition</span>
            <span className="text-[11px] font-semibold text-zinc-900">{activeDisruption.engineCondition}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-zinc-500">Data Source</span>
            <span className="text-[11px] font-semibold text-zinc-900">{activeDisruption.engineDataSource}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-zinc-500">Status</span>
            <div className="flex gap-2">
              <span className="rounded-full bg-zinc-100 px-2 py-1 text-[10px] font-extrabold text-zinc-700">Monitoring</span>
              <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-extrabold text-orange-700">Triggered</span>
            </div>
          </div>
        </div>

        {isDetectStep ? (
          <div className="mt-3 rounded-xl border border-orange-200 bg-orange-50 p-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-orange-700">
              <AlertTriangle className="h-4 w-4" />
              Threshold crossed → Auto-trigger initiated
            </div>
            <div className="mt-1 text-[11px] text-orange-700/80">
              Detect → Validate → Claim → Payout
            </div>
          </div>
        ) : (
          <div className="mt-3 text-[11px] text-zinc-500">
            Monitoring → Triggered
          </div>
        )}
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {flow.map((label) => {
          const active = flowStage === label;
          return (
            <div
              key={label}
              className={`rounded-full px-2.5 py-1 text-center text-[10px] font-extrabold ${
                active ? "bg-zinc-900 text-white" : "bg-zinc-200 text-zinc-700"
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>

      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-zinc-200">
        <div className="h-full rounded-full bg-zinc-900 transition-all duration-500" style={{ width: `${(step / 7) * 100}%` }} />
      </div>

      {isDetectStep ? (
        <div className="animate-slideUp animate-microVibe space-y-3">
          <p className="flex items-center gap-2 text-base font-bold text-orange-700">
            <AlertTriangle className="h-5 w-5" />
            Disruption Detected in {locationCity}
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-ping-soft" />
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-700">
              Auto-triggered by system
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-700">
              Real-time monitoring active
            </span>
          </div>
          <p className="text-sm font-semibold text-zinc-700">
            {activeDisruption.type} • {activeDisruption.duration} • Severity {activeDisruption.severity}
          </p>

          <div className="grid grid-cols-1 gap-2">
            <p className="rounded-xl bg-zinc-100 px-3 py-2 text-sm">
              <span className="text-zinc-500">Cannot work/deliver:</span>{" "}
              <span className="font-semibold text-zinc-900">{activeDisruption.impact.cannotWork}</span>
            </p>
            <p className="rounded-xl bg-zinc-100 px-3 py-2 text-sm">
              <span className="text-zinc-500">Area inaccessible:</span>{" "}
              <span className="font-semibold text-zinc-900">{activeDisruption.impact.areaInaccessible}</span>
            </p>
            <p className="rounded-xl bg-zinc-100 px-3 py-2 text-sm">
              <span className="text-zinc-500">Orders affected:</span>{" "}
              <span className="font-semibold text-zinc-900">{activeDisruption.impact.ordersAffected}</span>
            </p>
          </div>
        </div>
      ) : null}

      {isValidating ? (
        <div className="animate-slideUp py-8 text-center">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-zinc-700" />
          <p className="mt-3 text-sm font-semibold text-zinc-800">AI validating event...</p>
          <div className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
            Trust Score: {trustScore}%
          </div>
          <p className="mt-2 text-[11px] text-zinc-500">
            Scanning weather, platform, and location signals
          </p>
        </div>
      ) : null}

      {isClaimStep ? (
        <div className="animate-slideUp space-y-3">
          {limitError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-3">
              <p className="flex items-center gap-2 text-base font-bold text-red-800">
                <ShieldAlert className="h-5 w-5" />
                Claim blocked
              </p>
              <p className="mt-1 text-sm font-semibold text-red-900">{limitError}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-red-100 px-3 py-1 text-[11px] font-semibold text-red-800">
                  Peak Hour Multiplier: {impactMultiplier}x applied
                </span>
                {isPeakHours ? (
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-[11px] font-semibold text-orange-700">
                    Peak hour boost applied
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-[11px] text-red-700">
                Parametric event verified, but weekly/day caps reached by your subscription.
              </p>
            </div>
          ) : (
            <>
              <p className="flex items-center gap-2 text-base font-bold text-emerald-700">
                <BadgeCheck className="h-5 w-5" />
                Claim Auto-Triggered
              </p>
              <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                Verified using weather + platform + location data
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">
                  Peak Hour Multiplier: {impactMultiplier}x applied
                </span>
                {isPeakHours ? (
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-700">
                    Peak hour boost applied
                  </span>
                ) : null}
              </div>

              <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                <p className="font-extrabold">Higher compensation during high-demand delivery hours</p>
                <p className="mt-1 text-emerald-700">
                  Example: Base ₹{baseLoss} → Final ₹{payoutAmount}
                </p>
              </div>
            </>
          )}
        </div>
      ) : null}

      {isLossStep ? (
        <div className="animate-slideUp space-y-2 rounded-2xl bg-zinc-100 p-4">
          <p className="text-xs text-zinc-500">Estimated Income Loss (Base)</p>
          <p className="flex items-center gap-2 text-3xl font-black text-zinc-900">
            <IndianRupee className="h-7 w-7" />
            {baseLoss}
          </p>
          <div className="rounded-xl bg-white p-3">
            <p className="text-[11px] font-semibold text-zinc-600">Final payout after multiplier</p>
            <p className="mt-1 flex items-center gap-2 text-lg font-extrabold text-emerald-700">
              <IndianRupee className="h-5 w-5" />
              {payoutAmount}
            </p>
          </div>
        </div>
      ) : null}

      {isFraudStep ? (
        <div className="animate-slideUp space-y-2">
          <p className="flex items-center gap-2 text-base font-bold text-zinc-900">
            <ShieldAlert className="h-5 w-5 text-zinc-700" />
            Fraud Check Complete
          </p>
          <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            No anomalies detected • Trust {trustScore}%
          </p>
        </div>
      ) : null}

      {isPayoutStep ? (
        <div className="animate-slideUp py-8 text-center">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-emerald-600" />
          <p className="mt-3 text-sm font-semibold text-zinc-800">Payout Initiated</p>
          <p className="mt-1 text-[11px] text-zinc-500">Via {payoutChannelLabel}</p>
          <p className="mt-2 text-[11px] font-semibold text-zinc-700">Crediting: ₹{payoutAmount}</p>
        </div>
      ) : null}

      {isSuccessStep ? (
        <PayoutSuccessCard
          payoutAmount={payoutAmount}
          payoutChannelLabel={payoutChannelLabel}
          payoutTarget={payoutTarget}
        />
      ) : null}
    </div>
  );
}

function PayoutSuccessCard({ payoutAmount, payoutChannelLabel, payoutTarget }) {
  return (
    <div className="animate-popIn text-center">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 success-ring">
        <BadgeCheck className="h-7 w-7 text-emerald-600" />
      </div>
      <p className="text-lg font-extrabold text-emerald-700">
        Rs {payoutAmount} Credited to {payoutChannelLabel}
      </p>
      <p className="mt-1 text-[11px] text-zinc-500">
        {payoutChannelLabel === "UPI" ? "UPI ID:" : "Account:"} {payoutTarget}
      </p>
    </div>
  );
}

function LiveSimulationModal({
  activeDisruption,
  currentStep,
  onClose,
  onReset,
  locationCity,
  payoutChannelLabel,
  payoutTarget,
  baseLoss,
  payoutAmount,
  impactMultiplier,
  isPeakHours,
  trustScore,
  limitError,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/70 px-4 pb-4 pt-10 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md animate-popIn">
        <ClaimFlowStepper
          step={currentStep}
          activeDisruption={activeDisruption}
          locationCity={locationCity}
          payoutChannelLabel={payoutChannelLabel}
          payoutTarget={payoutTarget}
          baseLoss={baseLoss}
          payoutAmount={payoutAmount}
          impactMultiplier={impactMultiplier}
          isPeakHours={isPeakHours}
          trustScore={trustScore}
          limitError={limitError}
        />
        {currentStep === 7 || (currentStep === 3 && limitError) ? (
          <button
            onClick={onReset}
            className="mt-3 w-full rounded-2xl bg-white py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
          >
            Run Another Simulation
          </button>
        ) : (
          <button
            disabled
            className="mt-3 w-full rounded-2xl border border-white/30 bg-white/10 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Auto-trigger running...
          </button>
        )}
      </div>
    </div>
  );
}

function App() {
  const [persona, setPersona] = useState({
    name: "Arjun K",
    city: "Chennai",
    payoutChannel: "UPI",
    darkStoreDependency: 75,
    peakHoursEnabled: true,
  });

  const riskProfile = useMemo(() => computeRiskProfile(persona), [persona]);

  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [policy, setPolicy] = useState(null);
  const [onboardingStep, setOnboardingStep] = useState(1);

  const [runs, setRuns] = useState([]);

  const [activeDisruption, setActiveDisruption] = useState(null);
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [triggerImpactMultiplier, setTriggerImpactMultiplier] = useState(1);
  const [triggerPeakHours, setTriggerPeakHours] = useState(false);
  const [trustScoreAtTrigger, setTrustScoreAtTrigger] = useState(0);
  const [payoutAmountAtTrigger, setPayoutAmountAtTrigger] = useState(0);
  const [claimAllowedAtTrigger, setClaimAllowedAtTrigger] = useState(true);
  const [limitErrorAtTrigger, setLimitErrorAtTrigger] = useState(null);

  const [nowTick, setNowTick] = useState(Date.now());

  const _timingRef = useRef({
    startedAt: 0,
    step2At: 0,
    step3At: 0,
    step6At: 0,
    step7At: 0,
  });
  const _finalizeOnceRef = useRef(false);
  const triggerRiskRef = useRef(0);
  const claimAllowedRef = useRef(true);
  const limitErrorRef = useRef(null);

  const isPeakNow = isPeakHoursNow(new Date(nowTick));

  useEffect(() => {
    const t = setInterval(() => setNowTick(Date.now()), 5000);
    return () => clearInterval(t);
  }, []);

  const currentPlan = useMemo(
    () => plans.find((p) => p.id === selectedPlan) ?? plans[0],
    [selectedPlan]
  );

  useEffect(() => {
    if (policy) return;
    setSelectedPlan(riskProfile.recommendedPlanId);
  }, [riskProfile.recommendedPlanId, policy]);

  const payoutTarget = useMemo(() => {
    if (persona.payoutChannel === "UPI") {
      const safe = persona.name.replace(/\s+/g, "").toLowerCase();
      return { channelLabel: "UPI", target: `${safe}@upi` };
    }
    return { channelLabel: "Bank Transfer", target: "HDFC ••9012" };
  }, [persona.name, persona.payoutChannel]);

  const onActivatePolicy = ({ planId, weeklyPremium, coverageLimit }) => {
    const policyId = `POL-${Math.random().toString(16).slice(2, 6).toUpperCase()}`;
    const plan = plans.find((p) => p.id === planId) ?? plans[0];
    setPolicy({
      id: policyId,
      planId,
      weeklyPremium,
      coverageLimit,
      isActive: true,
      maxWeeklyPayout: plan.maxWeeklyPayout,
      maxClaimsPerWeek: plan.maxClaimsPerWeek,
      maxClaimsPerDay: plan.maxClaimsPerDay,
      planName: plan.name,
      createdAt: Date.now(),
      payoutChannel: persona.payoutChannel,
      payoutChannelLabel: payoutTarget.channelLabel,
      payoutTarget: payoutTarget.target,
    });
    setOnboardingStep(1);
  };

  const startSimulation = (event) => {
    if (!policy?.isActive) return;
    if ((event?.loss ?? 0) <= 0) return; // Loss of income triggers ONLY claims

    const baseLoss = event.loss;
    const peak = isPeakNow;
    const multiplier = getImpactMultiplier(peak);
    const trust = computeTrustScore({
      riskScore: riskProfile.riskScore,
      darkStoreDependency: persona.darkStoreDependency,
    });
    const payoutAmount = Math.round(baseLoss * multiplier);

    const now = new Date(nowTick);
    const weekStart = startOfWeek(now).getTime();
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const dayStart = startOfDay(now).getTime();
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const successfulClaimsThisWeek = runs.filter(
      (r) => r.claimTriggered && r.startedAt >= weekStart && r.startedAt < weekEnd.getTime()
    );
    const successfulClaimsToday = runs.filter(
      (r) => r.claimTriggered && r.startedAt >= dayStart && r.startedAt < dayEnd.getTime()
    );

    const payoutThisWeek = successfulClaimsThisWeek.reduce((acc, r) => acc + (r.payoutAmount ?? 0), 0);
    const claimsThisWeek = successfulClaimsThisWeek.length;
    const claimsToday = successfulClaimsToday.length;

    let nextLimitError = null;
    if (claimsThisWeek >= policy.maxClaimsPerWeek) nextLimitError = "Weekly limit reached";
    else if (claimsToday >= policy.maxClaimsPerDay) nextLimitError = "Daily limit reached";
    else if (payoutThisWeek + payoutAmount > policy.maxWeeklyPayout) nextLimitError = "Weekly limit reached";

    const allowed = !nextLimitError;

    claimAllowedRef.current = allowed;
    limitErrorRef.current = nextLimitError;

    setClaimAllowedAtTrigger(allowed);
    setLimitErrorAtTrigger(nextLimitError);
    setTriggerImpactMultiplier(multiplier);
    setTriggerPeakHours(peak);
    setTrustScoreAtTrigger(trust);
    setPayoutAmountAtTrigger(payoutAmount);

    _finalizeOnceRef.current = false;
    _timingRef.current = { startedAt: Date.now(), step2At: 0, step3At: 0, step6At: 0, step7At: 0 };
    triggerRiskRef.current = riskProfile.riskScore;

    setActiveDisruption(event);
    setCurrentStep(1);
    setIsSimulationOpen(true);
  };

  useEffect(() => {
    if (!isSimulationOpen || !activeDisruption) return undefined;

    const shouldClaim = claimAllowedRef.current;
    const sequence = shouldClaim
      ? [
          { step: 2, delay: 1000 },
          { step: 3, delay: 1500 },
          { step: 4, delay: 900 },
          { step: 5, delay: 1100 },
          { step: 6, delay: 800 },
          { step: 7, delay: 1100 },
        ]
      : [
          // If subscription caps are exceeded, we stop at Claim stage with an error.
          { step: 2, delay: 1000 },
          { step: 3, delay: 1500 },
        ];

    const timers = [];
    let cumulative = 0;

    sequence.forEach(({ step, delay }) => {
      cumulative += delay;
      timers.push(
        setTimeout(() => {
          setCurrentStep(step);
        }, cumulative)
      );
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [isSimulationOpen, activeDisruption]);

  useEffect(() => {
    if (!isSimulationOpen || !activeDisruption) return;

    if (currentStep === 2 && _timingRef.current.step2At === 0) _timingRef.current.step2At = Date.now();
    if (currentStep === 3 && _timingRef.current.step3At === 0) _timingRef.current.step3At = Date.now();
    if (currentStep === 6 && _timingRef.current.step6At === 0) _timingRef.current.step6At = Date.now();

    const shouldFinalizeSuccess = claimAllowedRef.current && currentStep === 7;
    const shouldFinalizeBlocked = !claimAllowedRef.current && currentStep === 3;
    if ((shouldFinalizeSuccess || shouldFinalizeBlocked) && !_finalizeOnceRef.current) {
      _finalizeOnceRef.current = true;
      const startedAt = _timingRef.current.startedAt;
      const step6At = _timingRef.current.step6At;
      const step2At = _timingRef.current.step2At;
      const endAt = Date.now();

      const validationMs = step2At ? Math.max(0, step2At - startedAt) : 0;
      const payoutMs = step6At ? Math.max(0, endAt - step6At) : 0;

      // Claim triggers ONLY when loss of income is detected.
      const claimTriggered =
        claimAllowedRef.current && (activeDisruption?.loss ?? 0) > 0 && policy?.isActive;

      const baseIncomeLoss = activeDisruption.loss;
      const payoutAmount = claimTriggered ? payoutAmountAtTrigger : 0;

      const run = {
        id: `RUN-${Math.random().toString(16).slice(2, 7)}`,
        eventId: activeDisruption.id,
        eventLabel: activeDisruption.label,
        baseIncomeLoss,
        incomeLoss: payoutAmount, // for legacy analytics calculations
        payoutAmount,
        riskScoreAtTrigger: triggerRiskRef.current,
        multiplierApplied: triggerImpactMultiplier,
        isPeakHours: triggerPeakHours,
        trustScoreAtTrigger,
        payoutChannel: policy.payoutChannelLabel,
        startedAt,
        endedAt: endAt,
        validationMs,
        payoutMs,
        claimTriggered,
        success: claimTriggered,
        limitError: limitErrorRef.current,
      };

      setRuns((prev) => [...prev, run].slice(-20));
    }
  }, [
    activeDisruption,
    currentStep,
    isSimulationOpen,
    policy,
    payoutAmountAtTrigger,
    triggerImpactMultiplier,
    triggerPeakHours,
    trustScoreAtTrigger,
  ]);

  const closeSimulation = () => setIsSimulationOpen(false);

  const resetFlow = () => {
    setIsSimulationOpen(false);
    setCurrentStep(1);
    setActiveDisruption(null);
    setTriggerImpactMultiplier(1);
    setTriggerPeakHours(false);
    setTrustScoreAtTrigger(0);
    setPayoutAmountAtTrigger(0);
    setClaimAllowedAtTrigger(true);
    setLimitErrorAtTrigger(null);
    claimAllowedRef.current = true;
    limitErrorRef.current = null;
  };

  const recommendedPlanId = riskProfile.recommendedPlanId;
  const remainingThisWeek = useMemo(() => {
    if (!policy?.isActive) {
      return { remainingClaimsThisWeek: "—", remainingPayoutBalance: "—" };
    }

    const now = new Date(nowTick);
    const weekStart = startOfWeek(now).getTime();
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const successfulClaimsThisWeek = runs.filter(
      (r) => r.claimTriggered && r.startedAt >= weekStart && r.startedAt < weekEnd.getTime()
    );
    const claimsThisWeek = successfulClaimsThisWeek.length;
    const payoutThisWeek = successfulClaimsThisWeek.reduce((acc, r) => acc + (r.payoutAmount ?? 0), 0);

    return {
      remainingClaimsThisWeek: Math.max(0, policy.maxClaimsPerWeek - claimsThisWeek),
      remainingPayoutBalance: Math.max(0, policy.maxWeeklyPayout - payoutThisWeek),
    };
  }, [policy, runs, nowTick]);

  return (
    <div className="mx-auto min-h-screen max-w-md bg-gradient-to-b from-zinc-100 via-zinc-50 to-zinc-100 px-4 pb-10 pt-6 text-zinc-900">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Blinkit Partner Protect
          </p>
          <h1 className="text-xl font-bold">AI Parametric Cover</h1>
          <p className="mt-1 text-[11px] text-zinc-500">Protection that moves at delivery speed.</p>
        </div>
        <span className="rounded-full bg-blinkitYellow px-3 py-1 text-xs font-extrabold text-zinc-900">
          Demo
        </span>
      </header>

      <DashboardCard
        policy={policy}
        currentPlan={currentPlan}
        persona={persona}
        remainingClaimsThisWeek={remainingThisWeek.remainingClaimsThisWeek}
        remainingPayoutBalance={remainingThisWeek.remainingPayoutBalance}
        isPeakNow={isPeakNow}
      />
      <AIInsightsCard
        riskScore={riskProfile.riskScore}
        predictedWeeklyLoss={riskProfile.predictedWeeklyLoss}
        reasons={riskProfile.reasons}
        recommendedPlanId={recommendedPlanId}
      />
      <PremiumSelector
        selectedPlan={selectedPlan}
        onSelect={setSelectedPlan}
        recommendedPlanId={recommendedPlanId}
        disabled={!!policy}
      />
      <DisruptionPanel onSelect={startSimulation} disabled={!policy?.isActive} isPeakNow={isPeakNow} />

      {policy ? <AnalyticsDashboard runs={runs} /> : null}

      {!policy ? (
        <OnboardingModal
          step={onboardingStep}
          persona={persona}
          setPersona={setPersona}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          riskProfile={riskProfile}
          recommendedPlanId={recommendedPlanId}
          onActivatePolicy={onActivatePolicy}
          onNextStep={() => setOnboardingStep(2)}
        />
      ) : null}

      {isSimulationOpen && activeDisruption ? (
        <LiveSimulationModal
          activeDisruption={activeDisruption}
          currentStep={currentStep}
          onClose={closeSimulation}
          onReset={resetFlow}
          locationCity={persona.city}
          payoutChannelLabel={policy?.payoutChannelLabel ?? "UPI"}
          payoutTarget={policy?.payoutTarget ?? "user@upi"}
          baseLoss={activeDisruption.loss}
          payoutAmount={payoutAmountAtTrigger}
          impactMultiplier={triggerImpactMultiplier}
          isPeakHours={triggerPeakHours}
          trustScore={trustScoreAtTrigger}
          limitError={limitErrorAtTrigger}
        />
      ) : null}
    </div>
  );
}

export default App;
