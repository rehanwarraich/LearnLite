# LearnLite

LearnLite is a connectivity-aware learning prototype for students who study with slow, intermittent, unreliable, or expensive internet access.

Its central question is simple:

> If a student has only a small amount of unreliable internet, how can we make sure the limited connectivity they do have provides the maximum possible learning value?

## The problem

Most learning platforms assume a student can browse, stream, and download whenever they need to. That assumption breaks down when connectivity is expensive or disappears without warning. A student may have a short window online but no good way to decide which of many resources are worth spending that data on.

LearnLite focuses on that decision. It watches the connection, respects a student-defined data budget, ranks resources by learning value, downloads the best-fitting combination, and keeps the resulting lessons usable offline.

This is not a replacement for a full learning management system or a large educational content platform. The prototype demonstrates the focused combination of data-aware prioritization, connectivity-aware synchronization, and offline-first study.

## Core features

- Student dashboard with connection status, budget, offline resources, pending work, and recommendations
- Small sample library spanning Mathematics, Physics, Computer Science, Biology, Chemistry, and English
- Data budget presets and custom budgets
- Priority engine that considers importance, urgency, prerequisite value, subject preference, expected use, connection quality, and resource size
- Lightweight, compressed, and text resource versions selected for the current connection and budget
- Connectivity simulator for strong, weak, intermittent, and offline conditions
- Chunked simulated downloads that pause and resume without losing progress
- Local offline shelf for reading lessons and taking quizzes
- Locally stored learning progress with a pending synchronization queue
- Sync center showing active, paused, pending, and completed operations
- Installable PWA shell with a service worker for app-shell caching

## Architecture

The browser's local IndexedDB database is the primary source of truth for this prototype. Dexie provides the local database layer and stores:

- Resource metadata and content
- Download state and resumable progress
- Data budget and learning preferences
- Synchronization operations
- Offline learning progress

The UI is organized around five screens: Overview, Resource library, Offline learning, Sync center, and Preferences. The priority engine and connectivity manager are isolated from the UI so a future API or server-backed resource provider can replace the sample data without changing the selection experience.

## Prioritization algorithm

Each resource receives a score based on:

```
importance × urgency × prerequisite value × student preference × usage likelihood − size penalty
```

The size penalty increases when a resource uses a larger share of the remaining budget. Weak or intermittent connectivity adds another penalty to discourage large downloads that are more likely to be interrupted.

Selection uses a greedy knapsack-style approximation: resources are ranked by score, then selected when they fit the remaining budget. This runs quickly and is suitable for the small prototype library. The scoring and selection functions are intentionally separate so a dynamic-programming knapsack or another optimizer can be introduced later.

## Offline-first behavior

After a resource is synchronized, its content and metadata remain available in the local database. The Offline learning screen does not depend on a connection. Quiz answers and completion status are stored locally immediately. When connectivity returns, the sync manager uploads those progress records and marks them synchronized.

The simulated downloader moves in chunks. If the connection changes to Offline, it saves its percentage and marks the operation paused. A later sync continues from the stored percentage instead of starting over.

## Running the project

Install dependencies and start the Vite development server as usual for a React TypeScript app. The app opens to the Overview screen with the sample resource library seeded into IndexedDB on first launch.

For a production build, use the included build script. The generated app includes the PWA manifest and service worker.

## Demonstration scenario

1. Open Preferences and select a 10 MB data budget.
2. Select Weak in the Connectivity simulator.
3. Return to Overview and review the recommended resources.
4. Use Sync now. The system chooses a high-value combination, not simply the first resources in the list.
5. Switch the simulator to Offline while a resource downloads. The download pauses and preserves its progress.
6. Switch back to Strong and sync again. The download resumes.
7. Open an available lesson from Offline learning and complete the included content or quiz.
8. The progress is saved locally and appears as pending until a later synchronization.
9. Use Sync now after restoring connectivity to mark the progress synchronized.

## Limitations

- Sample resources are bundled in the client rather than fetched from a live content API.
- Downloading is simulated in chunks; real HTTP Range requests would be needed for large external files.
- The service worker caches the application shell. A production resource delivery layer should explicitly cache selected resource payloads.
- Browser background sync support varies, so the prototype relies on an in-app fallback rather than requiring a background-sync API.
- The prototype has no authentication or multi-user server. Local state belongs to the current device.
- The greedy selection method is an approximation and can be replaced with an exact optimizer for a larger library.

## Future improvements

- Connect the resource manager to a real educational content API
- Add a server-side progress endpoint and conflict resolution
- Use true resumable downloads with HTTP range requests
- Add resource dependencies to boost prerequisites automatically
- Add a richer local content renderer for PDF and image resources
- Add automated browser and unit test execution in CI
- Use Background Sync where supported with the current in-app fallback retained

LearnLite does not claim to invent offline learning or synchronization. Its contribution is the focused combination of data-aware resource prioritization, connectivity-aware synchronization, and an offline-first learning workflow.
