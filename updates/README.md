# updates/

One small JSON file per game, read by the game's soft update prompt
(claude-game-experiment, player interruptions spec 5.1). The app fetches
`https://install.carnaxidegames.com/updates/<slug>.json` at most once a day,
compares its own version with what the store serves, and offers the store page
when it is behind. A missing file (404) keeps every copy of the app silent.

## Schema 1

```json
{
  "schema": 1,
  "android": {
    "latest": "1.0.1",
    "min_supported": "1.0.0",
    "url": "https://play.google.com/store/apps/details?id=com.carnaxide_games.<package>"
  },
  "ios": {
    "latest": "1.0.1",
    "min_supported": "1.0.0",
    "url": "https://apps.apple.com/app/id<apple id>"
  },
  "notes": {
    "en": "Fixes a crash on the Garage screen.",
    "de": "Behebt einen Absturz im Garagenbildschirm."
  }
}
```

- `schema`: bumped on any incompatible change. An app ignores a schema it does
  not know.
- `latest`: the version name the store serves **now**. An app whose own
  version is lower, by numeric segments (`1.0.10 > 1.0.9`; a missing segment
  reads 0), is behind. A non-numeric version on either side never prompts.
- `min_supported`: an app below this sees the "Please update" card at every
  launch (still dismissable; no forced update). Between it and `latest`, a
  soft "Update available" card, once per version, then weekly, at most three
  times. Optional; leave it out and nothing is ever "important".
- `url`: the store page, `https://` only.
- `notes`: optional, one sentence per language code (`en`, `ja`, `ko`,
  `zh_Hans`, `zh_Hant`, `de`, `fr`, `es`, `pt_BR`, `it`, `nl`, `pl`, `ru`).
  The card shows the player's language, else `en`, else no note line.
- A missing platform block means no information for that platform: no prompt.

## Who edits it, and when

- **Edit `<slug>.json` only after the operator reports a store approval** of
  the release it names. `latest` is what the store serves now, never a
  version still in review: an app told about a version it cannot download
  sends the player to a store page with nothing new on it.
- **`min_supported` moves only on an operator ruling** (a crash that loses
  saves, say). By default it stays at the game's 1.0.
- Each game's adoption commits its file here without pushing; the manager
  pushes when the operator reports that store's approval. A push publishes in
  about a minute; GitHub Pages caches for 10 minutes, and apps fetch at most
  daily, so a change reaches everyone online within a day.
- To stop a prompt, delete the platform block or set `latest` to the current
  version.

## Slugs

| Game | Slug | File |
|---|---|---|
| Nibgrid | `nibgrid` | `updates/nibgrid.json` |
| Beam Logic | `laser` | `updates/laser.json` |
| Battle Shape | `battle_shape` | `updates/battle_shape.json` |
| Knight Adventure | `knight_adventure` | `updates/knight_adventure.json` |
| Rockhopper | `spacemine` | `updates/spacemine.json` |

The slugs match the share pages under `games/`. `robots.txt` keeps crawlers
out of this folder.
