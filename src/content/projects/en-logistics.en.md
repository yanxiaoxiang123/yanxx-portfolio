---
lang: en
translationKey: logistics
slug: logistics
title: YTO Express volume forecasting
subtitle: Before 19:00, guess how much freight is still coming tonight
role: Algorithm development and rollout support
period: Aug 2026 — Sep 2026
year: "2026"
kind: Forecasting model
stack: [Python, Pandas, LightGBM, Optuna, Scikit-learn, Parquet, Linux]
image: logistics
lenses: [data, model, delivery]
order: 3
---

## Background

Freight planning needs to know, early in the day, how much volume will still arrive tonight. The business can provide cumulative volume by 19:00 for each origin-to-destination sorting route; the task is to predict the evening increment and the final full-day volume. That definition did not exist on its own; it had to be agreed with the people using the forecast.

## What I did

- Built roughly 60 features from volume changes, rolling route statistics, sorting hub aggregates and holidays, then used LightGBM Tweedie regression for the non-negative, skewed volume distribution.
- Added P10 / P50 / P90 quantile forecasts with conformal calibration, giving planners both a point forecast and an uncertainty range for risk reserve.
- Used strict rolling time validation and a 90 day held out test to prevent leakage, with Optuna for hyperparameter search.
- Set fallback rules for missing data and new routes, keeping the full-day forecast at or above the cumulative volume already known.
- Handled Linux deployment, model versioning and monitoring of WAPE, bias and interval coverage.

## A trade-off

Accuracy is not the only objective. For capacity planning, under-forecasting usually costs more than over-forecasting, so the model also produces intervals and a high quantile, letting the planner decide how much buffer to keep. Evaluation therefore looks at WAPE, bias and interval coverage together rather than choosing one flattering error number.

## Result

On the held out test set, route-level WAPE was 7.32% and daily total WAPE 2.22%, with a bias of -0.24% and about a 27% error reduction against a route weekday baseline. The system was deployed and monitored, and work began on extending it to roughly 6 million route-days and 34,000 routes nationally.

## Limits

These figures come from the project record and were not independently re-run for this page; the test set and baseline follow the definitions used at the time. The underlying business data is not public. The national extension was still in progress, not a completed result.
