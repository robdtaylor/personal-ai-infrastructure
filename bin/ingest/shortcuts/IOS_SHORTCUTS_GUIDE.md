# iOS Shortcuts for Telegram Capture

This guide shows how to create iOS Shortcuts that send content to your Telegram capture bot.

## Prerequisites

1. Telegram app installed on iOS
2. Your capture bot configured (`ingest setup` completed)
3. Bot token and chat ID from your setup

## Quick Capture Shortcut

This shortcut lets you quickly send text to your capture bot.

### Setup Steps

1. Open **Shortcuts** app on iOS
2. Tap **+** to create new shortcut
3. Add these actions:

```
Action 1: Ask for Input
  - Input Type: Text
  - Prompt: "What do you want to capture?"
  - Default Answer: (leave empty)

Action 2: Text
  - Content: https://api.telegram.org/bot[YOUR_BOT_TOKEN]/sendMessage?chat_id=[YOUR_CHAT_ID]&text=[URL Encoded Input]

Action 3: Get Contents of URL
  - URL: (use the Text from Action 2)
  - Method: GET

Action 4: Show Notification
  - Title: "Captured!"
  - Body: "Your note has been sent to Telegram"
```

4. Name it "Quick Capture"
5. Add to Home Screen or widgets

### URL Template

Replace placeholders with your values:
```
https://api.telegram.org/bot<BOT_TOKEN>/sendMessage?chat_id=<CHAT_ID>&text=<MESSAGE>
```

## Share Sheet Shortcut

This shortcut appears in the iOS Share menu.

### Setup Steps

1. Create new shortcut
2. Enable "Show in Share Sheet"
3. Accept: Text, URLs, Images
4. Add actions:

```
Action 1: If (Shortcut Input has any value)
  - Use Shortcut Input as the content

Action 2: Get Text from Input
  - Input: Shortcut Input

Action 3: URL Encode
  - Text: (from Action 2)

Action 4: Get Contents of URL
  - URL: https://api.telegram.org/bot[TOKEN]/sendMessage?chat_id=[CHAT_ID]&text=[Encoded Text]

Action 5: Show Notification
  - "Sent to Capture Bot"
```

### For Images

To send images, you need to use the sendPhoto endpoint:

```
Action 1: If (Shortcut Input is Image)

Action 2: Base64 Encode (Image)

Action 3: Get Contents of URL
  - URL: https://api.telegram.org/bot[TOKEN]/sendPhoto
  - Method: POST
  - Request Body: Form
    - chat_id: [CHAT_ID]
    - photo: (Base64 data)
```

**Note:** Sending images via Shortcuts is complex. It's easier to:
1. Share the image directly to Telegram app
2. Send to your bot/channel

## Capture with Tags Shortcut

Add hashtags to categorize your captures.

### Setup Steps

```
Action 1: Ask for Input
  - Prompt: "What to capture?"

Action 2: Choose from Menu
  - Prompt: "Add tag?"
  - Options: #inbox, #read-later, #project/work, #idea, Custom

Action 3: If (Custom selected)
  - Ask for Input: "Enter tag:"

Action 4: Text
  - Combine: [Input] [Selected Tag]

Action 5: URL Encode

Action 6: Get Contents of URL
  - Send to Telegram API
```

## Voice Memo Capture

Since you use Whispr Flow as a virtual keyboard, voice is already transcribed to text.

For voice memos from Voice Memos app:
1. Create a shortcut that accepts Audio files
2. Note: Direct transcription requires additional setup
3. Recommended: Use Whispr Flow to transcribe, then paste into Quick Capture

## Siri Integration

1. Name your shortcuts clearly:
   - "Quick Capture"
   - "Capture This"
   - "Send to Notes"

2. Then say:
   - "Hey Siri, Quick Capture"
   - "Hey Siri, Capture This"

## Widget Setup

1. Go to iOS Home Screen
2. Long press → Edit Home Screen
3. Tap + → Search "Shortcuts"
4. Add Medium widget
5. Edit widget to show your capture shortcuts

## Automation Ideas

### Daily Review Reminder
```
Automation: Time of Day (9:00 AM)
Action: Show notification "Check your incoming captures!"
```

### Location-Based Capture
```
Automation: When I arrive at [Office]
Action: Run "Work Capture" shortcut with preset #project/work tag
```

## Troubleshooting

### "Could not connect"
- Check your internet connection
- Verify bot token is correct
- Ensure chat ID is correct (include minus sign for groups)

### "Unauthorized"
- Bot token may have changed
- Run `ingest test` on your Mac to verify credentials

### Messages not appearing
- Check you're sending to the correct chat
- Run `ingest poll` on Mac to fetch messages
- Check `ingest status` for any issues

## Example Shortcut Export

You can import pre-made shortcuts using iCloud links. Create your shortcuts and share the links here for easy setup on other devices.

## Security Notes

- Bot tokens are sensitive - don't share shortcuts publicly without removing tokens
- Use a private channel/chat for captures
- Consider using Shortcut parameters instead of hardcoded tokens
