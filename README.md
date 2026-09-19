# LearnLite

> A connectivity-aware learning system designed to help students make the most of limited, unreliable, or expensive internet access.

🌐 **Live Demo:** https://rehanwarraich.github.io/LearnLite/

💻 **GitHub Repository:** https://github.com/rehanwarraich/LearnLite

---

## Overview

For students in low-connectivity areas, the problem is not always the complete absence of educational resources. Often, internet access is available only for short periods, with limited data and unreliable connections.

**LearnLite explores a different approach:**

> Instead of simply providing more content, how can a student get the maximum learning value from the limited connectivity they have?

LearnLite prioritizes educational resources, selects an appropriate version based on the available data budget, downloads content when connectivity is available, and keeps it accessible offline.

---

## Core Idea

LearnLite separates the problem into two decisions:

### 1. What should be downloaded first?

The **Priority Engine** considers factors such as:

- Educational importance
- Urgency
- Prerequisites
- Student preferences
- Expected usefulness
- Resource size

It then selects a combination of resources that provides high learning value within the available data budget.

### 2. Which version should be downloaded?

Each resource can have three versions:

| Version | Purpose |
|---|---|
| **Full** | Complete learning experience |
| **Light** | Reduced-size version with core content |
| **Text** | Minimal-data version for very limited connectivity |

This allows the system to adapt not only **what** gets downloaded, but also **how much data each resource consumes**.

---

## Key Features

### 🧠 Resource Prioritization

A greedy, knapsack-style selection approach chooses high-value resources while respecting the user's data budget.

### 📦 Adaptive Resource Versions

Resources can be downloaded as Full, Light, or Text versions depending on available data.

### 📊 Data Budget

Users can set a data limit and see how much of it has been used. Downloads cannot exceed the available budget.

### 📡 Connectivity Simulation

The prototype can simulate different conditions:

- Good connection
- Weak connection
- Offline

This makes it possible to demonstrate how the system behaves under unreliable connectivity.

### 🔄 Connectivity-Aware Synchronization

Downloads can pause when connectivity is lost and continue when it becomes available again.

### 💾 Offline Learning

Downloaded lessons and quizzes remain available without an internet connection.

### 📈 Offline Progress

Learning progress is stored locally and can remain available while offline.

### 📝 Sync Queue

Actions that cannot be synchronized immediately are placed in a local queue for later synchronization.

---

## Sample Learning Library

The prototype includes resources across six subjects:

**Mathematics · Physics · Computer Science · English · Biology · Chemistry**

The sample content includes lessons, explanations, examples, practice questions, and interactive quizzes.

---

## Architecture

```text
                    LearnLite
                       │
              ┌────────┴────────┐
              │                 │
       Priority Engine    Version Selector
              │                 │
              └────────┬────────┘
                       │
                 Sync Manager
                       │
                IndexedDB / Dexie
                       │
              ┌────────┴────────┐
              │                 │
       Offline Content    Learning Progress
````

The prototype follows a **local-first architecture**. Downloaded content, progress, and synchronization state are stored locally using IndexedDB through Dexie.js.

---

## Technology Stack

* **React + TypeScript**
* **Vite**
* **Tailwind CSS**
* **Dexie.js / IndexedDB**
* **Progressive Web App architecture**

The current prototype is intentionally client-side and does not require a backend, authentication system, or external database.

---

## Running Locally

```bash
git clone https://github.com/rehanwarraich/LearnLite.git
cd LearnLite
npm install
npm run dev
```

Then open the local development URL shown by Vite.

---

## Demonstration

A typical demonstration can follow this workflow:

1. Set a limited data budget.
2. Browse available learning resources.
3. Let LearnLite prioritize resources.
4. Select or accept an appropriate resource version.
5. Simulate a weak or interrupted connection.
6. Continue learning from downloaded content while offline.
7. Restore connectivity and observe pending synchronization.

---

## Evaluation

The prototype can be evaluated by comparing LearnLite's prioritization against a normal download order under different data limits.

Possible measurements include:

* Useful learning content delivered
* Essential resources available offline
* Data used on lower-priority resources
* Number of essential resources obtained
* Time required to obtain essential content

---

## Limitations

LearnLite is currently a prototype.

* The learning library contains sample curriculum content.
* Downloads are simulated rather than transferred from a production content server.
* There is currently no backend or user authentication.
* Synchronization is demonstrated locally rather than between real devices or servers.
* The prioritization algorithm is an approximation and is not guaranteed to produce a mathematically optimal selection.

---

## Future Directions

Potential future development includes:

* Real educational content repositories
* Server-side synchronization
* More advanced resource-selection algorithms
* Automatic network-quality detection
* Smarter personalization based on learning progress
* Android support for deeper background synchronization
* Real-world testing in low-connectivity communities

---

## Project Philosophy

LearnLite is built around a simple idea:

> **Limited connectivity should limit how much data a student can access — not how much they can learn.**

