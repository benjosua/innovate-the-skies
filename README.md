# Innovate the Skies

A Svelte browser extension built with WXT using the Side Panel API.

## Project Structure

This project uses a `src/` directory structure:

- `src/entrypoints/` - Extension entry points (background, sidepanel)
- `src/components/` - Svelte components
- `src/composables/` - Composable functions
- `src/hooks/` - Custom hooks
- `src/utils/` - Utility functions
- `src/assets/` - Assets (images, CSS, etc.)

## Features

- Built with Svelte and WXT
- Uses Chrome Side Panel API for the main UI
- Opens side panel on extension icon click
- Auto-opens on install

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Build extension package
pnpm zip
```

## Development

Run `pnpm dev` to start the development server. WXT will automatically open a browser window with the extension installed. Click the extension icon to open the side panel.
