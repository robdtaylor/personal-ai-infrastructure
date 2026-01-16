---
name: proxmox
description: |
  Proxmox Virtual Environment management and monitoring.

  USE WHEN user mentions: VM status, Proxmox, virtual machines, start/stop VMs, server monitoring, resource usage

  Provides quick access to Proxmox server management including:
  - VM status monitoring
  - Resource usage reporting
  - VM control (start/stop/restart)
  - Storage and network statistics
---

# Proxmox Management Skill

Quick access to Proxmox Virtual Environment server management.

## Server Configuration

**Proxmox Server:** `192.168.10.205:8006`
**Node:** `pve`
**API Token:** `claude@pve!Claude`
**Token Secret:** `256d99ca-9bf5-4024-96ba-fa4d19d4c091`

## Common Operations

### 1. Get VM Status
```bash
curl -k -s -H "Authorization: PVEAPIToken=claude@pve!Claude=256d99ca-9bf5-4024-96ba-fa4d19d4c091" \
  "https://192.168.10.205:8006/api2/json/cluster/resources?type=vm"
```

### 2. Get Detailed VM Info
```bash
# For VM 100 (haos15.2)
curl -k -s -H "Authorization: PVEAPIToken=claude@pve!Claude=256d99ca-9bf5-4024-96ba-fa4d19d4c091" \
  "https://192.168.10.205:8006/api2/json/nodes/pve/qemu/100/status/current"
```

### 3. Start a VM
```bash
# Start VM 103 (ubuntu-2404)
curl -k -s -X POST -H "Authorization: PVEAPIToken=claude@pve!Claude=256d99ca-9bf5-4024-96ba-fa4d19d4c091" \
  "https://192.168.10.205:8006/api2/json/nodes/pve/qemu/103/status/start"
```

### 4. Stop a VM
```bash
# Stop VM gracefully
curl -k -s -X POST -H "Authorization: PVEAPIToken=claude@pve!Claude=256d99ca-9bf5-4024-96ba-fa4d19d4c091" \
  "https://192.168.10.205:8006/api2/json/nodes/pve/qemu/103/status/shutdown"
```

### 5. Restart a VM
```bash
curl -k -s -X POST -H "Authorization: PVEAPIToken=claude@pve!Claude=256d99ca-9bf5-4024-96ba-fa4d19d4c091" \
  "https://192.168.10.205:8006/api2/json/nodes/pve/qemu/100/status/reboot"
```

### 6. Get Node Status
```bash
curl -k -s -H "Authorization: PVEAPIToken=claude@pve!Claude=256d99ca-9bf5-4024-96ba-fa4d19d4c091" \
  "https://192.168.10.205:8006/api2/json/nodes/pve/status"
```

### 7. Get Storage Info
```bash
curl -k -s -H "Authorization: PVEAPIToken=claude@pve!Claude=256d99ca-9bf5-4024-96ba-fa4d19d4c091" \
  "https://192.168.10.205:8006/api2/json/nodes/pve/storage"
```

## Current VMs

| VMID | Name | Status | vCPUs | RAM | Purpose |
|------|------|--------|-------|-----|---------|
| 100 | haos15.2 | Running | 2 | 4 GB | Home Assistant OS |
| 101 | DebCloneSep21 | Running | 8 | 16 GB | Debian workstation |
| 102 | media-server-1 | Running | 4 | 8 GB | Media server |
| 103 | ubuntu-2404 | Stopped | 2 | 4 GB | Template |
| 104 | FakeNas | Running | 2 | 4 GB | NAS |
| 9000 | debian-12-cloud | Stopped | 2 | 2 GB | Template |

## Helper Script

Use `~/.claude/skills/Proxmox/proxmox-cli.sh` for quick queries:

```bash
# Get status
~/.claude/skills/Proxmox/proxmox-cli.sh status

# Get specific VM
~/.claude/skills/Proxmox/proxmox-cli.sh vm 100

# Start VM
~/.claude/skills/Proxmox/proxmox-cli.sh start 103

# Stop VM
~/.claude/skills/Proxmox/proxmox-cli.sh stop 103
```

## Response Format

When reporting Proxmox status, use this format:

```
## 📊 PROXMOX STATUS - pve

### 🟢 Running VMs (X)
[List running VMs with key stats]

### ⚪ Stopped VMs (X)
[List stopped VMs]

### 📈 Resource Summary
- Total vCPUs allocated: XX
- Total RAM used: XX GB / XX GB
- Uptime: XX days
```

## API Reference

**Base URL:** `https://192.168.10.205:8006/api2/json`
**Auth Header:** `Authorization: PVEAPIToken=claude@pve!Claude=256d99ca-9bf5-4024-96ba-fa4d19d4c091`

Key endpoints:
- `/cluster/resources?type=vm` - All VMs
- `/nodes/pve/qemu` - QEMU VMs
- `/nodes/pve/qemu/{vmid}/status/current` - VM details
- `/nodes/pve/qemu/{vmid}/status/start` - Start VM (POST)
- `/nodes/pve/qemu/{vmid}/status/shutdown` - Stop VM (POST)
- `/nodes/pve/qemu/{vmid}/status/reboot` - Restart VM (POST)
- `/nodes/pve/status` - Node status
