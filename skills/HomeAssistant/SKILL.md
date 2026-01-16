---
name: HomeAssistant
description: |
  Home Assistant infrastructure connection and management.

  USE WHEN user mentions: "home assistant", "HA", "homeassistant", "smart home", "integrations", "recorder", "mariadb database"
---

# Home Assistant Infrastructure

## Connection Details

**IMPORTANT:** Credentials are stored in `~/.claude/.env.homeassistant`

**SSH Access:**
- Credentials file: `~/.claude/.env.homeassistant`
- Variables: `HA_SSH_HOST`, `HA_SSH_USER`, `HA_SSH_PASSWORD`, `HA_CONFIG_PATH`
- Connect command: `sshpass -p "$(grep HA_SSH_PASSWORD ~/.claude/.env.homeassistant | cut -d= -f2)" ssh -o StrictHostKeyChecking=no $(grep HA_SSH_USER ~/.claude/.env.homeassistant | cut -d= -f2)@$(grep HA_SSH_HOST ~/.claude/.env.homeassistant | cut -d= -f2)`
- Simpler usage: Source the env file first:
  ```bash
  source <(grep -v '^#' ~/.claude/.env.homeassistant | sed 's/^/export /')
  sshpass -p "${HA_SSH_PASSWORD}" ssh -o StrictHostKeyChecking=no ${HA_SSH_USER}@${HA_SSH_HOST}
  ```

**Home Assistant Core:**
- Version: 2025.12.4
- Architecture: amd64 (qemux86-64)
- Port: 8123

**MariaDB Database:**
- Add-on: core_mariadb
- Database: homeassistant
- Username: robt
- Password: See `~/.claude/.env.homeassistant` (same as SSH password)
- Connection URL: `mysql://robt:${HA_SSH_PASSWORD}@core-mariadb/homeassistant?charset=utf8`

## Common Commands

**Note:** Source environment variables first:
```bash
source <(grep -v '^#' ~/.claude/.env.homeassistant | sed 's/^/export /')
```

```bash
# SSH and run HA CLI command
sshpass -p "${HA_SSH_PASSWORD}" ssh -o StrictHostKeyChecking=no ${HA_SSH_USER}@${HA_SSH_HOST} "ha <command>"

# Check core logs
ha core logs

# Check addon logs
ha addon logs <addon_slug>

# Restart core
ha core restart

# Restart addon
ha addon restart <addon_slug>

# Get core info
ha core info

# List addons
ha addons
```

## Installed Add-ons

- Terminal & SSH (core_ssh)
- MariaDB (core_mariadb)
- Duck DNS (core_duckdns)
- Mosquitto broker (core_mosquitto)
- Zigbee2MQTT Edge (45df7312_zigbee2mqtt_edge)
- ESPHome (90403ba6_esphome)
- InfluxDB (109a8d85_influxdb)
- AdGuard Home (109a8d85_adguard)
- Tailscale (109a8d85_tailscale)
- Studio Code Server (109a8d85_vscode)
- Samba share (core_samba)
- Whisper (core_whisper)
- Piper (core_piper)
- openWakeWord (core_openwakeword)
- Matter Server (core_matter_server)
- File editor (core_configurator)
- Glances (109a8d85_glances)
- Simple Scheduler (00185a40_simplescheduler)
- Everything Presence Zone Configurator (234db91b_everything-presence-zone-configurator)

## Network Info

- HA Internal IP: 172.30.32.1
- MariaDB Internal IP: 172.30.33.1
- MariaDB hostname: core-mariadb.local.hass.io

## Troubleshooting

### Database Access Issues
If recorder/history/energy/analytics/logbook fail due to database access:

1. Check MariaDB logs: `ha addon logs core_mariadb`
2. If "Access denied" errors appear, reconfigure permissions via API:
```bash
curl -s -X POST -H "Authorization: Bearer ${SUPERVISOR_TOKEN}" \
  -H "Content-Type: application/json" \
  http://supervisor/addons/core_mariadb/options \
  -d '{"options":{"databases":["homeassistant"],"logins":[{"username":"robt","password":"'${HA_SSH_PASSWORD}'"}],"rights":[{"database":"homeassistant","username":"robt"}]}}'
```
3. Restart MariaDB: `ha addon restart core_mariadb`
4. Restart HA Core: `ha core restart`
