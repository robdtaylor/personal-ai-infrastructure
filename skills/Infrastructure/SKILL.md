---
name: Infrastructure
description: Network infrastructure, servers, and service endpoints. USE WHEN accessing Gitea, SSH, or local network services.
---

# Infrastructure

Local network services and access details.

## Gitea (Self-hosted Git)

| Property | Value |
|----------|-------|
| Host | 192.168.10.218 |
| SSH Port | 2222 |
| HTTP Port | 3000 (may be down) |
| SSH Alias | `gitea` (configured in ~/.ssh/config) |
| User | git (for SSH), rob (account) |

**SSH Config:**
```
Host gitea
  HostName 192.168.10.218
  User git
  Port 2222
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
```

**Clone via SSH:**
```bash
git clone git@gitea:rob/REPO.git
```

**Set remote to SSH:**
```bash
git remote set-url origin git@gitea:rob/REPO.git
```

## Servers

| SSH Alias | IP | Port | OS | Role | User |
|-----------|-----|------|-----|------|------|
| ubuntuI5 | 192.168.10.218 | 22 | Ubuntu | Gitea host, general server | rob |
| debian-docker | 192.168.10.85 | 22 | Debian | Docker VM | rob |
| caddy | 192.168.10.211 | 22 | Debian | Reverse proxy | rob |
| proxmox | 192.168.10.205 | 22 | Proxmox VE | Hypervisor | root |
| synology | 192.168.10.60 | 8222 | DSM 7 | NAS (DS920+) | robdtaylor |

## Quick SSH Access

```bash
ssh ubuntuI5       # Ubuntu server (Gitea host)
ssh debian-docker  # Docker VM
ssh caddy          # Reverse proxy
ssh proxmox        # Hypervisor
ssh synology       # Synology NAS (port 8222)
```

## SSH Keys

- `~/.ssh/id_ed25519` - Primary key (deployed to all servers)
- SSH config: `~/.ssh/config`
