---
lang: en
translationKey: backing
slug: backing
title: Backing
subtitle: An A-share research and strategy platform
role: Independent design and development
period: Feb 2026 — present
year: "2026"
kind: Full-stack system
stack: [FastAPI, React, LangGraph, DeepSeek, Redis, Pandas, SSE]
repo: https://github.com/yanxiaoxiang123/backing
image: backing
lenses: [system, model, data]
order: 1
---

## Background

I wanted to test one thing: placed inside a real research workflow, can a language model do more than chat? Can it call tools within limits, leave records that can be inspected, and hand the final judgement back to a person? Backing is the experiment, and a personal project I used to practise building a complete system.

## What I built

The platform chains market data, technical screening, strategy backtesting, multi-agent research, human approval and simulated trading into one run. I handled the requirements, backend, frontend, deployment and ongoing maintenance myself.

- LangGraph orchestrates data quality, technical research, strategy, backtest review and risk control nodes, with multi-turn context, streaming, tool calls, step limits, timeouts and cancellation.
- Run, Step, Tool Call, Artifact and Approval facts are persisted. Progress streams over SSE, with replay after a dropped connection and recovery of interrupted tasks.
- A gateway for 17 kinds of quantitative tools constrains the model with a whitelist, permissions, Pydantic validation, output size limits and call auditing.
- A unified signal and backtest framework for 13 strategy types computes return, annualised return, Sharpe ratio, maximum drawdown and win rate. The simulated account follows A-share T+1, price limits, board lots and trading fees.
- Daily backups run through systemd, and 534 tests have passed over the course of the project.

## A trade-off

Letting an agent call tools freely is tempting, but backtesting has two dangerous failure modes: look-ahead bias, and a model inventing a flattering result. The gateway therefore keeps time truncation, parameter validation and auditing outside the model. The model can propose a call; it cannot bypass the rules. Market and event data are cut at `as_of`, so the research only sees what would have been visible at the time.

## Result

The system runs the full path from data to a research conclusion, resumes after an interruption, and keeps a person in the approval step. It remains a maintained personal project, and is the main way I have learned where an agent system's boundaries should sit.

## Limits

The trading account is simulated, not live. Nothing here is investment advice, and there are no external users or returns to report. The test count and feature scope come from the project record and were not independently re-run for this page; the public README and the development record may differ in detail.
