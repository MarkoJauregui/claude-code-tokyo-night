# Tokyo Night for Claude Code

A [Claude Code mod](https://code.claude.com/docs/en/plugins/mods/interface) that paints the desktop app's Code tab in [Tokyo Night](https://github.com/tokyo-night/tokyo-night-vscode-theme): **Tokyo Night** in dark mode and **Tokyo Night Light** in light mode. The app follows your system appearance, so you get whichever one fits.

| | Dark: Tokyo Night | Light: Tokyo Night Light |
| --- | --- | --- |
| Page | `#1a1b26` | `#d6d8df` |
| Cards / panels | `#1e202e` / `#202330` | `#dfe0e6` / `#e6e7ed` |
| Text | `#c0caf5` | `#343b58` |
| Muted text | `#828bb8` | `#606269` |
| Accent | `#7aa2f7` | `#2959aa` |
| Danger · success · warning · purple | `#f7768e` · `#9ece6a` · `#e0af68` · `#bb9af7` | `#8c4351` · `#385f0d` · `#8f5e15` · `#65359d` |

In dark mode, code blocks use the app's built-in `tokyo-night` highlighting theme. In light mode, code is colored from the roles above.

## Requirements

- The Claude desktop app, with Claude Code **v2.1.324 or later** in the Code tab. Update the app if colors don't appear.
- A local session. Cloud sessions don't draw themes yet.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install tokyo-night --marketplace MarkoJauregui/claude-code-tokyo-night
```

Answer `y` to add the marketplace, then pick a scope (user scope makes it load in every session).

Or from a shell:

```bash
claude plugin install tokyo-night --marketplace MarkoJauregui/claude-code-tokyo-night
```

Or in the desktop app: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `MarkoJauregui/claude-code-tokyo-night`, then **Add plugin**.

Then start a new local session in the Code tab.

## How it works

The whole mod is [`hooks/register.ts`](hooks/register.ts). At `session.start` it calls `$.theme.set({ colors })` once, and the app paints the Code tab from then on.

The app's theme is about 100 design-system colors per mode, so the mod doesn't write them by hand. It gives `makeColors` (from Claude Code's plugin-authoring skill) a few anchors per mode: the surfaces, three text levels, five role colors and the git colors. `makeColors` derives the rest and checks contrast.

### Where it differs from the VS Code theme

Desktop won't paint a theme whose text falls under its contrast floor, and two of the VS Code values did:

- **Dark muted text** is `#828bb8` rather than `#787c99`. The original went under 3:1 on hovered buttons.
- **Dark diff colors** use the palette's bright `#73daca` / `#f7768e` / `#7aa2f7` rather than the theme's file-decoration colors `#449dab` / `#914c54` / `#6183bb`. Removed lines were 2.6:1 against the page.

Both swaps stay inside the Tokyo Night palette.

## Customize

Change any hex value in `hooks/register.ts`. Every color is six-digit hex. If a change makes `makeColors` report a line starting `Desktop won't paint this theme`, the mod shows it as a toast at session start.

## Uninstall

Disable or uninstall the plugin (desktop app: **Manage plugins**; terminal: `/plugin`), then start a new session. If the colors stay, open Settings from the Code tab, search for **code appearance**, and choose **Remove colors**.

## Credits

- [Tokyo Night](https://github.com/tokyo-night/tokyo-night-vscode-theme) by enkia and contributors (MIT), the source of every color here.
- `hooks/make-colors.js` and `hooks/make-colors.d.ts` are copied unchanged from Claude Code's plugin-authoring skill, as its docs instruct.

## License

MIT for this repository's own files; see [LICENSE](LICENSE).
