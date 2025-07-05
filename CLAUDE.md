# Astro numbers developement guide

## What's this project

Read README.md

## Development Philosophy

- This game is developped with react-router
- Prefer configuration/variables changes over custom CSS when possible
- Keep customisations minimal and maintainable

## Git guidelines

- Don't use emojis in commit messages
- Use clear, concise commit messages describing the changes

## Code Quality Commands

- `npm run format` - Format code with prettier
- `npm run format:check` - Check if code is properly formatted
- `npm run lint` - Check for linting issues
- `npm run lint:fix` - Fix linting issues automatically
- `npm run typecheck` - Check TypeScript types

Pre-commit hooks will automatically run prettier, eslint, and typecheck.
If any tool finds unfixable issues, the commit will be blocked.
