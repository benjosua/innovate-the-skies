import { defineConfig } from 'wxt';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  srcDir: 'src',
  vite: () => ({
    plugins: [svelte()],
  }),
  manifest: {
    permissions: ['sidePanel', 'scripting', 'activeTab', 'storage'],
    action: {
      default_title: 'Open Innovate the Skies',
    },
    side_panel: {
      default_path: 'sidepanel.html',
    },
    commands: {
      'open-sidepanel': {
        suggested_key: {
          default: 'Ctrl+Shift+Y',
          mac: 'Command+Shift+Y',
        },
        description: 'Open the side panel',
      },
    },
  },
});
