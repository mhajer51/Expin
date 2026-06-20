# Expin Expo Production Structure

## File tree

```text
app/                         # Expo Router file-based routes
  _layout.tsx                # Root providers + Stack
  (tabs)/                    # Nested tab navigator
  campaigns/[id].tsx         # Deep-linkable typed dynamic route
src/
  app/providers/             # App-wide providers
  features/                  # Feature-based modules: api/components/hooks/types/utils per domain
  shared/                    # Reusable primitives, API client, i18n, tokens
  locales/{en,ar}/           # Translation resources
```

Feature-based architecture keeps campaign code beside campaign queries, components, types, and utilities. A type-based structure (`components/`, `screens/`, `hooks/`) is acceptable for prototypes, but large production teams spend more time jumping across folders, create unclear ownership, and accidentally couple unrelated domains.

## Bootstrap and Expo SDK 56 notes

This repo targets Expo SDK 56, React Native 0.85, React 19.2, and Node 22.13+ per the versioned SDK table. Expo packages should be installed with `npx expo install` so native versions stay compatible.

## Navigation

Expo Router is selected for a new 2026 app because routes, deep links, and code-splitting follow the filesystem, while still using React Navigation underneath. The app uses a root Stack in `app/_layout.tsx`, nested Tabs in `app/(tabs)/_layout.tsx`, and `/campaigns/[id]` for typed dynamic deep links. RTL stack animation is centralized in `src/shared/lib/navigation.ts` so Arabic slides from the opposite side.

Interview prompts:
- Why does Expo Router still need React Navigation concepts such as Stack and Tabs?
- Where would you enforce route-param types for dynamic routes?

## Styling and design tokens

NativeWind is configured through `babel.config.js`, `metro.config.js`, `tailwind.config.js`, and `src/shared/styles/global.css`. Tokens live in both Tailwind theme extension and `src/shared/constants/design.ts` for places that require raw values. Prefer logical spacing (`ms-`, `me-`, `ps-`, `pe-`) over physical `ml-`/`mr-` so RTL layouts remain correct.

Interview prompts:
- Why keep tokens centralized instead of hardcoding colors in components?
- What breaks when teams use `ml-4` for Arabic UI?

## Data management with React Query

`QueryProvider` configures slow-network defaults: longer `staleTime`, retained cache via `gcTime`, reconnect refetching, and retry suppression for 4xx errors. API code is separate from UI through `src/shared/lib/api.ts`, which applies bearer tokens and normalizes Laravel 422 validation errors. Campaigns use an infinite query with `select` to flatten pages; wallet boost uses optimistic updates with rollback.

Avoid unnecessary re-renders by selecting only the data a screen needs, keeping `structuralSharing` on, memoizing row components, and updating cached objects immutably so unchanged row references survive.

Interview prompts:
- What is the difference between stale data and garbage-collected data?
- Why can a bad optimistic update make every list row re-render?

## Large lists performance

Campaign lists use Shopify FlashList with `estimatedItemSize`, stable `keyExtractor`, memoized `renderItem`, and memoized row components. Use React DevTools Profiler, Flipper, and why-did-you-render in development to identify rows re-rendering from unstable props.

Bad update that breaks memoization:

```ts
items.map((item) => ({ ...item })); // every object is new, every memoized row re-renders
```

Better update:

```ts
items.map((item) => (item.id === changedId ? { ...item, budget: item.budget + 50 } : item));
```

Interview prompts:
- Why is index an unsafe key for a paginated list?
- How does `select` reduce render pressure in React Query?

## Animation

Reanimated is enabled in Babel with its plugin last. Production animations such as skeleton shimmer or optimistic feedback should use shared values and animated styles so work runs on the UI thread instead of blocking on slow JS execution.

Interview prompts:
- Why must the Reanimated plugin be last?
- What makes an animation JS-thread-bound versus UI-thread-bound?

## Real RTL support checklist

The language provider persists language, changes i18next immediately, and calls `I18nManager.forceRTL`. True native RTL for flexbox, gestures, and some navigation state may need a controlled restart because React Native resolves layout direction natively at launch.

Test these Arabic interactive surfaces:
- Back icons mirror; logos and product images do not.
- Text aligns right automatically through `AppText`.
- Row ordering and logical spacing use RTL-aware utilities.
- Stack transitions and back gestures originate from the Arabic side.
- Swipeables, carousels, pagers, and pull-to-refresh behave naturally.
- Form validation messages map Laravel fields to Arabic labels.
- Currency/date/number formatting matches the selected Gulf locale.

Interview prompts:
- Why is a `dir` flag not enough in React Native?
- Which assets must never be mirrored?

## Laravel backend integration

`src/shared/lib/api.ts` uses one Axios instance, attaches Sanctum/Passport bearer tokens from SecureStore, and converts Laravel validation responses shaped as `{ errors: { field: [...] } }` into an `ApiError` for forms and toast handling.

## Code quality

ESLint, Prettier, Husky, and lint-staged are configured. Commits should use Conventional Commits (`feat:`, `fix:`, `chore:`). AI-generated changes may scaffold code and tests, but authentication, payments, RTL behavior, and API contracts require manual human review before merge.
