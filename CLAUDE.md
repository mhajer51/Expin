# Project rules

- Use feature-based folders under `src/features/<domain>`.
- Components use PascalCase; hooks start with `use`; API files end in `Api.ts` or `use*.ts` for query hooks.
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- Do not hardcode user-facing strings outside locale JSON files.
- Prefer NativeWind logical utilities (`ms`, `me`, `ps`, `pe`) for horizontal spacing.
- AI tools may scaffold repetitive code and tests, but auth, payments, production API contracts, and RTL flows require manual review.
