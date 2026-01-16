#!/bin/bash

# Proxmox CLI Helper Script
# Quick access to Proxmox VE API

PROXMOX_HOST="192.168.10.205:8006"
API_TOKEN="claude@pve!Claude=256d99ca-9bf5-4024-96ba-fa4d19d4c091"
BASE_URL="https://${PROXMOX_HOST}/api2/json"
AUTH_HEADER="Authorization: PVEAPIToken=${API_TOKEN}"

# Helper function to make API calls
api_call() {
    local endpoint="$1"
    local method="${2:-GET}"
    curl -k -s -X "$method" -H "$AUTH_HEADER" "${BASE_URL}${endpoint}"
}

# Format bytes to human readable
format_bytes() {
    local bytes=$1
    if [ $bytes -gt 1073741824 ]; then
        echo "$(awk "BEGIN {printf \"%.1f\", $bytes/1073741824}") GB"
    elif [ $bytes -gt 1048576 ]; then
        echo "$(awk "BEGIN {printf \"%.1f\", $bytes/1048576}") MB"
    else
        echo "$(awk "BEGIN {printf \"%.1f\", $bytes/1024}") KB"
    fi
}

# Show usage
usage() {
    cat << EOF
Proxmox CLI Helper

Usage: $0 <command> [options]

Commands:
    status              Show all VM status
    vm <vmid>          Show detailed info for specific VM
    start <vmid>       Start a VM
    stop <vmid>        Stop a VM (graceful shutdown)
    restart <vmid>     Restart a VM
    node               Show node status
    list               List all VMs with basic info
    running            Show only running VMs
    stopped            Show only stopped VMs

Examples:
    $0 status
    $0 vm 100
    $0 start 103
    $0 stop 104
EOF
}

# Get all VMs status
cmd_status() {
    echo "📊 Fetching Proxmox VM status..."
    api_call "/cluster/resources?type=vm" | python3 -m json.tool
}

# Get specific VM details
cmd_vm() {
    local vmid=$1
    if [ -z "$vmid" ]; then
        echo "Error: VM ID required"
        echo "Usage: $0 vm <vmid>"
        exit 1
    fi
    echo "🔍 Fetching details for VM $vmid..."
    api_call "/nodes/pve/qemu/${vmid}/status/current" | python3 -m json.tool
}

# Start VM
cmd_start() {
    local vmid=$1
    if [ -z "$vmid" ]; then
        echo "Error: VM ID required"
        echo "Usage: $0 start <vmid>"
        exit 1
    fi
    echo "▶️  Starting VM $vmid..."
    api_call "/nodes/pve/qemu/${vmid}/status/start" "POST" | python3 -m json.tool
}

# Stop VM
cmd_stop() {
    local vmid=$1
    if [ -z "$vmid" ]; then
        echo "Error: VM ID required"
        echo "Usage: $0 stop <vmid>"
        exit 1
    fi
    echo "⏹️  Stopping VM $vmid..."
    api_call "/nodes/pve/qemu/${vmid}/status/shutdown" "POST" | python3 -m json.tool
}

# Restart VM
cmd_restart() {
    local vmid=$1
    if [ -z "$vmid" ]; then
        echo "Error: VM ID required"
        echo "Usage: $0 restart <vmid>"
        exit 1
    fi
    echo "🔄 Restarting VM $vmid..."
    api_call "/nodes/pve/qemu/${vmid}/status/reboot" "POST" | python3 -m json.tool
}

# Get node status
cmd_node() {
    echo "🖥️  Fetching node status..."
    api_call "/nodes/pve/status" | python3 -m json.tool
}

# List all VMs (compact)
cmd_list() {
    echo "📋 VM List:"
    echo "VMID | Name              | Status  | CPUs | RAM"
    echo "-----|-------------------|---------|------|------"
    api_call "/nodes/pve/qemu" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for vm in data.get('data', []):
    vmid = vm.get('vmid', 'N/A')
    name = vm.get('name', 'N/A')
    status = vm.get('status', 'N/A')
    cpus = vm.get('cpus', 'N/A')
    maxmem_gb = vm.get('maxmem', 0) / (1024**3)
    print(f\"{vmid:4} | {name:17} | {status:7} | {cpus:4} | {maxmem_gb:.0f} GB\")
"
}

# Show only running VMs
cmd_running() {
    echo "🟢 Running VMs:"
    api_call "/nodes/pve/qemu" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for vm in data.get('data', []):
    if vm.get('status') == 'running':
        print(f\"VM {vm['vmid']}: {vm['name']}\")
"
}

# Show only stopped VMs
cmd_stopped() {
    echo "⚪ Stopped VMs:"
    api_call "/nodes/pve/qemu" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for vm in data.get('data', []):
    if vm.get('status') == 'stopped':
        print(f\"VM {vm['vmid']}: {vm['name']}\")
"
}

# Main command dispatcher
case "$1" in
    status)
        cmd_status
        ;;
    vm)
        cmd_vm "$2"
        ;;
    start)
        cmd_start "$2"
        ;;
    stop)
        cmd_stop "$2"
        ;;
    restart)
        cmd_restart "$2"
        ;;
    node)
        cmd_node
        ;;
    list)
        cmd_list
        ;;
    running)
        cmd_running
        ;;
    stopped)
        cmd_stopped
        ;;
    *)
        usage
        exit 1
        ;;
esac
