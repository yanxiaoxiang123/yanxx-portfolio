---
lang: en
translationKey: patent
slug: patent
title: AI patent review assistant
subtitle: Review rules for a local model, judgement left to people
role: Independent development and rollout support
period: Mar 2026 — May 2026
year: "2026"
kind: System and rollout
stack: [FastAPI, Vue 3, MySQL, Redis, Ollama, SSE, Nginx]
image: patent
lenses: [system, delivery]
order: 2
---

## Background

Patent review runs on detailed rules that change often. When every rule lives in code, each change means a new release and the people using the system can only wait. This project moved the rules out of code into configurable templates, and used a locally deployed language model for structured analysis, compliance checks and classification suggestions.

## What I built

I developed the system independently and also handled deployment, demonstrations, training and post launch support.

- A multi-agent rules engine calls a local Ollama model and shows the review process and conclusion as a conversation.
- Review rules are JSON configuration with four built-in templates, so a rule change no longer requires editing code and shipping a release.
- The backend uses async FastAPI with MySQL and a Redis connection pool; the frontend is Vue 3 with a shared API interceptor and composables.
- Local model and environment deployment, an Nginx reverse proxy, token authentication, Redis rate limiting, session revocation, failover and end to end timeouts.
- Demonstrated the system to users, explained the review flow and rule configuration, led training and handled issues after launch.

## A trade-off

The system uses a local Ollama model and configurable rule templates. Model output remains an aid to review; rule configuration, authentication, rate limits, timeouts and human judgement define how the system is used.

## Result

Rules can be changed without code, the review process is visible to its users, and the system was deployed and used inside an internal network. This work added frontend, proxy, authentication, rate limiting and user support to what I had done before, rather than staying on the backend.

## Limits

Client names, business material and interface screenshots are not public. This page describes the system's capability and my role only. There is no public evaluation of review quality, and the system does not replace a reviewer's professional judgement.
