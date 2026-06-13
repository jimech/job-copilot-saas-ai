# Codex Workflow

## Purpose

Codex is used ticket-by-ticket, not for the whole project at once. Each ticket should have a clear scope, acceptance criteria, and validation commands.

## Rules

- Give Codex one ticket only.
- Do not ask Codex to implement multiple phases at once.
- Do not let Codex make unrelated changes.
- Review all changes manually.
- Run validation commands before committing.
- Developer commits and pushes manually.

## Ticket Workflow

1. Pick the next ticket.
2. Paste the full ticket prompt into Codex.
3. Let Codex modify local files.
4. Review changed files.
5. Run validation commands.
6. Fix issues if needed.
7. Commit locally.
8. Push manually when ready.

## Prompting Codex

Every prompt should include:

- Goal
- Context
- Files to create or modify
- What not to do
- Acceptance criteria
- Validation commands
- Final response format

## Reviewing Changes

Use Git to inspect the work before committing:

```bash
git status
git diff
```

Review every changed file, especially generated code, configuration, environment files, and documentation.

## Validation

Run:

```bash
npm run typecheck
npm run lint
npm run build
npm run check
```

Use `npm run check` before committing. GitHub Actions runs typecheck, lint, and build after changes are pushed to GitHub.

If a command fails because of the ticket changes, fix the issue before committing. If a command fails because of a local environment issue, document it clearly.

## Commit and Push

Commit manually:

```bash
git add .
git commit -m "message"
git push
```

Use clear commit messages that match the ticket scope.

## What Codex Should Not Do

- Do not use GitHub CLI.
- Do not create GitHub issues.
- Do not push changes.
- Do not add unrelated dependencies.
- Do not delete docs.
- Do not commit secrets.
- Do not implement features outside the ticket.
