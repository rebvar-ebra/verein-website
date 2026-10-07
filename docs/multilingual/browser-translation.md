# On-demand translation without CMS edits

## Approved scope
German remains the source language in Sanity. Visitors select English, Russian,
Ukrainian, Arabic, or Persian in a compact dropdown at the upper-right of the
header, outside the mobile navigation. Translation is on demand; no translated
Sanity documents or locale URL copies are created. Label machine translations.
Arabic and Persian use right-to-left layout. Do not push without user instruction.

## Integration decision still required
The translation provider and available credentials are not yet known. Do not
ship a selector that claims to translate without a working provider. Keep secret
credentials server-side. Do not subscribe to paid services automatically.

## Implementation requirements
- Preserve the current route and restore the German source when selected.
- Handle navigation, open/close controls, loading, and failed requests without
  mixing languages or applying responses from an earlier language selection.
- Render translations through React rather than modifying React-owned DOM nodes.
- Translate public editorial strings and UI labels; never send form values or
  private submissions. Keep contact identifiers, URLs and brand names intact.
- Keep emergency quick-exit usable immediately, even if translation fails.
- Use accessible keyboard-operable selector with native-language labels.
- Cache using source text hash, target language and provider/model version.
  Changed source text must invalidate the corresponding translation.
- Reuse public translation results across visitors where the hosting cache
  supports it; do not promise persistent shared caching using process memory.
- Bound and validate translation requests, limit cost and rate-limit abuse.
  Do not expose a general-purpose public translation proxy.
- Preserve original German page metadata; do not claim multilingual SEO pages.
- Verify narrow mobile widths, RTL forms/contact identifiers, all supported
  languages, error fallback, cache invalidation and rapid language switching.

## Branches
Start with codex/multilingual-foundation. Each language then has a separate
codex/language-en, codex/language-ru, codex/language-uk, codex/language-ar or
codex/language-fa branch based on the integrated foundation. These are integration
branches for one website, not separate deployments. Do not merge or push yet.
