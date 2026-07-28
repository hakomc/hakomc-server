# hakomc-server

A development template for Minecraft Bedrock Edition add-ons built on [hakomc](https://github.com/hakomc/hakomc), with a Docker-based Bedrock Dedicated Server (BDS) environment for local testing.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Docker](https://www.docker.com/) and Docker Compose

## Using this template

Before building your own add-on on top of this template, update the placeholders left for a new project:

- `package.json` — set `name` (currently `yourpluginname`) and `description` to your add-on's own values.
- `vite.config.app.js` — in `hakomcPlugin({ name, uuid })`, set `name` to your add-on's name, and replace `uuid` with a freshly generated one (e.g. `node -e "console.log(crypto.randomUUID())"`). This UUID identifies the behavior pack in its manifest, so it must be unique to your add-on, not shared with this template or other projects.
- `worlds/DevWorld/world_behavior_packs.json` — update `pack_id` to the same UUID you just set above, so the dev world keeps loading the behavior pack.

Then write your add-on's code starting from `src/index.ts`.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your local environment file:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   | --- | --- |
   | `OPS` | XUIDs to grant operator permissions to on the dev server |
   | `SERVER_PORT` | UDP port the Bedrock server listens on (default `19132`) |
   | `UID` / `GID` | Host user/group ID used by the `dev` container, so build output isn't owned by root |

3. Start the dev environment:

   ```bash
   docker compose up
   ```

4. Connect to the server at `localhost:<SERVER_PORT>` (default `19132`) from a Bedrock client on the same machine/network.

## Build

| Command | Description |
| --- | --- |
| `npm run build:app` | Type-checks and bundles the add-on into a behavior pack under `dist/behavior_pack/`, for use with the dev server. |
| `npm run build:lib` | Type-checks and bundles the project as a distributable library (`dist/lib/`), for consumption by other packages. |
| `npm run build` | Runs both of the above. |

## Script debugging

The dev server has script debugging enabled by default. To debug the running add-on from VS Code:

1. Install the [Minecraft Debugger](https://marketplace.visualstudio.com/items?itemName=mojang-studios.minecraft-debugger) extension (already listed in `.vscode/extensions.json`).
2. With `docker compose up` running, press `F5` to start debugging (already configured in `.vscode/launch.json` as **Debug with Minecraft**).
3. Set breakpoints in your `src/` files as usual — they'll be hit as the add-on runs on the dev server.

## Maintenance scripts

### `scripts/enable-beta-apis.mjs`

Enables the "Beta APIs" experiment on a world's `level.dat` in place. Useful when a world wasn't created with Beta APIs enabled. Safe to run repeatedly.

```bash
node scripts/enable-beta-apis.mjs worlds/DevWorld/level.dat
```
