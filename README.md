# Tokyo Night for Claude Code

[Tokyo Night](https://github.com/tokyo-night/tokyo-night-vscode-theme) colors for the Claude Code desktop app: Tokyo Night in dark mode, Tokyo Night Light in light mode. The app follows your system appearance.

| | Dark | Light |
| --- | --- | --- |
| Page | `#1a1b26` | `#d6d8df` |
| Panels | `#1e202e` `#202330` | `#dfe0e6` `#e6e7ed` |
| Text | `#c0caf5` | `#343b58` |
| Muted text | `#828bb8` | `#606269` |
| Accent | `#7aa2f7` | `#2959aa` |
| Danger | `#f7768e` | `#8c4351` |
| Success | `#9ece6a` | `#385f0d` |
| Warning | `#e0af68` | `#8f5e15` |
| Purple | `#bb9af7` | `#65359d` |

Code blocks use the app's built-in `tokyo-night` highlighting in dark mode and the colors above in light mode.

## Install

Requires Claude Code 2.1.324 or later and a local session. Cloud sessions don't draw themes yet.

In a Claude Code terminal session:

```
/plugin install tokyo-night --marketplace MarkoJauregui/claude-code-tokyo-night
```

Answer `y` to add the marketplace, then pick a scope. User scope loads the theme in every session.

From a shell:

```bash
claude plugin install tokyo-night --marketplace MarkoJauregui/claude-code-tokyo-night
```

In the desktop app: **+** next to the prompt box, **Plugins**, **Add marketplace** with `MarkoJauregui/claude-code-tokyo-night`, then **Add plugin**.

The colors appear in the next session you start in the Code tab.

## Uninstall

Uninstall the plugin (`/plugin` in a terminal, **Manage plugins** in the desktop app) and start a new session. If the colors stay, open Settings from the Code tab, search for **code appearance**, and choose **Remove colors**.

## Differences from the VS Code theme

Two dark mode values are other Tokyo Night colors than the ones the VS Code theme uses:

- **Muted text** is `#828bb8`, not `#787c99`. The original drops under 3:1 on secondary fills, and the app won't paint a theme with text below that.
- **Diff colors** are the palette's bright `#73daca`, `#f7768e` and `#7aa2f7`, not the file-decoration colors `#449dab`, `#914c54` and `#6183bb`. Removed lines were 2.6:1 on panels.

## Customize

Every color is set in [`hooks/register.ts`](hooks/register.ts): a few anchors per mode, which `makeColors` expands into the app's full theme and checks for contrast.

To change one, fork the repository, edit the hex value, and install from your fork. If a change takes text under 3:1, the app won't paint the theme, and the mod says which color is at fault in a toast at session start.

## Credits

- [Tokyo Night](https://github.com/tokyo-night/tokyo-night-vscode-theme) by enkia and contributors, the source of every color here.
- `hooks/make-colors.js` and `hooks/make-colors.d.ts` are Anthropic's, copied unchanged from Claude Code's plugin-authoring skill as its documentation instructs.

## License

[MIT](LICENSE), for this repository's own files.
