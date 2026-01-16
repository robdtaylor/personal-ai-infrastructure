#!/bin/bash
# PAI Status Line - Shows token usage, cost, MCP servers, and tools count

input=$(cat)

# Extract values from JSON input
MODEL=$(echo "$input" | jq -r '.model.display_name // "Claude"')
COST=$(echo "$input" | jq -r '.cost.total_cost_usd // 0')
INPUT_TOKENS=$(echo "$input" | jq -r '.context_window.total_input_tokens // 0')
OUTPUT_TOKENS=$(echo "$input" | jq -r '.context_window.total_output_tokens // 0')
CONTEXT_SIZE=$(echo "$input" | jq -r '.context_window.context_window_size // 200000')

# Calculate context usage percentage
if [ "$CONTEXT_SIZE" -gt 0 ] 2>/dev/null; then
  TOTAL_TOKENS=$((INPUT_TOKENS + OUTPUT_TOKENS))
  CONTEXT_PCT=$((TOTAL_TOKENS * 100 / CONTEXT_SIZE))
else
  CONTEXT_PCT=0
fi

# Format cost (show 4 decimal places for small amounts)
if (( $(echo "$COST < 0.01" | bc -l 2>/dev/null || echo 0) )); then
  COST_FMT=$(printf "%.4f" "$COST")
else
  COST_FMT=$(printf "%.2f" "$COST")
fi

# Format token counts (K for thousands)
format_tokens() {
  local n=$1
  if [ "$n" -ge 1000 ] 2>/dev/null; then
    printf "%.1fK" "$(echo "scale=1; $n/1000" | bc)"
  else
    echo "$n"
  fi
}

IN_FMT=$(format_tokens "$INPUT_TOKENS")
OUT_FMT=$(format_tokens "$OUTPUT_TOKENS")

# Count MCP servers from settings
MCP_COUNT=0
if [ -f "$HOME/.claude/settings.local.json" ]; then
  MCP_COUNT=$(jq -r '.enabledMcpjsonServers | length // 0' "$HOME/.claude/settings.local.json" 2>/dev/null || echo 0)
fi

# Count allowed commands from permissions
CMD_COUNT=0
if [ -f "$HOME/.claude/settings.local.json" ]; then
  CMD_COUNT=$(jq -r '.permissions.allow | length // 0' "$HOME/.claude/settings.local.json" 2>/dev/null || echo 0)
fi

# ANSI colors
CYAN='\033[36m'
GREEN='\033[32m'
YELLOW='\033[33m'
MAGENTA='\033[35m'
DIM='\033[2m'
RESET='\033[0m'

# Build status line
echo -e "${CYAN}${MODEL}${RESET} ${DIM}|${RESET} ${GREEN}\$${COST_FMT}${RESET} ${DIM}|${RESET} ${YELLOW}${IN_FMT}/${OUT_FMT}${RESET} ${DIM}(${CONTEXT_PCT}%)${RESET} ${DIM}|${RESET} ${MAGENTA}MCP:${MCP_COUNT}${RESET} ${DIM}|${RESET} ${DIM}Cmds:${CMD_COUNT}${RESET}"
