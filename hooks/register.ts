import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Colors from github.com/tokyo-night/tokyo-night-vscode-theme: "Tokyo Night" for dark mode, "Tokyo Night Light" for
// light mode. Where a value moved off the theme's own, it moved to another color of the same palette so text stays
// readable: dark muted text and dark diff colors were under the contrast Desktop needs to paint the theme.
const { theme, problems } = makeColors({
  label: 'Tokyo Night',
  // The app ships the same theme for code highlighting; light mode colors code from the roles below.
  codeTheme: { dark: 'tokyo-night' },
  dark: {
    roles: { accent: '#7aa2f7', danger: '#f7768e', success: '#9ece6a', warning: '#e0af68', pro: '#bb9af7' },
    gray: {
      anchors: {
        'surface-0': '#1a1b26', // editor.background
        'surface-1': '#1e202e',
        'surface-2': '#202330', // list.activeSelectionBackground
        'surface-3': '#222436',
        'text-primary': '#c0caf5',
        'text-secondary': '#a9b1d6', // editor.foreground
        'text-muted': '#828bb8',
      },
    },
    git: { added: '#73daca', removed: '#f7768e', modified: '#7aa2f7', conflicting: '#e0af68', merged: '#bb9af7' },
  },
  light: {
    roles: { accent: '#2959aa', danger: '#8c4351', success: '#385f0d', warning: '#8f5e15', pro: '#65359d' },
    gray: {
      anchors: {
        'surface-0': '#d6d8df', // sideBar.background
        'surface-1': '#dfe0e6',
        'surface-2': '#e6e7ed', // editor.background
        'text-primary': '#343b58',
        'text-secondary': '#40434f',
        'text-muted': '#606269',
      },
    },
    git: {
      added: '#166775',
      removed: '#914c54',
      modified: '#2959aa',
      conflicting: '#8f5e15',
      merged: '#65359d',
      closed: '#8c4351',
      draft: '#5a607d',
    },
  },
})

const LOOK: ThemeSetArgs = { colors: theme }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    // A line that starts this way means Desktop ignores the whole theme: say so rather than paint nothing quietly.
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      void $.ui.toast(`tokyo-night: ${unpainted}`)
    }

    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      void $.ui.status(set.reason)
    }

    return next(e)
  })
}
