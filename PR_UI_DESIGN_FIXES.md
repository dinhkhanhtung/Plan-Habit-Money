PR: UI design tokens & history/usage pages

What changed
- Aligned Tailwind color tokens with component usage (added `card`, `text.primary-light`, `border`, `success`, etc.) in `tailwind.config.js` so classes like `bg-card-light` and `border-border-light` are generated.
- Fixed `globals.css` variables so body text and form inputs use the correct design tokens.
- Wrapped several pages/areas with card containers using design tokens: dashboard, weekly-planner, habit-tracker, support.
- Added History components: `UsageHistoryTable`, improved `TransactionHistoryTable`, `UsageSummaryCards`, `ExportOptions`.

Why
- Many components referenced token names that Tailwind didn't generate, causing missing CSS utilities on production.
- This PR groups the UI fixes and component additions so they can be reviewed before wider rollout.

Notes
- Commits were already pushed to `master` earlier. This branch mirrors the current master state and includes this PR description for review.
- Recommended next step: review the changes and run a production build locally (`npm run build`) or redeploy on Vercel to verify styling.

How to create the PR (one click)
Open this URL (replace owner/repo if needed):

https://github.com/dinhkhanhtung/Plan-Habit-Money/compare/master...pr/ui-design-fixes?expand=1

(If the compare page shows no differences, that's expected because master already contains the commits; use this PR as a review artifact or let me revert and open a clean PR if you want strict review before merging.)
