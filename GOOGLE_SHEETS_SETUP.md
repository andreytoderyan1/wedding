# Google Sheets Integration Setup

## Option 1: Google Apps Script (Easiest - Recommended)

### Step 1: Create a Google Sheet
1. Create a new Google Sheet
2. Add headers in row 1: `Timestamp`, `Name 1`, `Name 2`, `Name 3`, etc. (or just `Timestamp`, `Names`)

### Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete the default code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const names = data.names || [];
    const timestamp = new Date();
    
    // Add a new row with timestamp and all names
    const row = [timestamp, ...names];
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Deploy** → **New deployment**
4. Select type: **Web app**
5. Set:
   - Description: "RSVP Form Handler"
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**
7. **Copy the Web App URL** - you'll need this!

### Step 3: Update Your Form
1. Open `src/routes/+page.svelte`
2. Find the line: `const GOOGLE_SCRIPT_URL = '';`
3. Replace the empty string with your Google Apps Script URL:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
4. Save the file - that's it! The form will now submit to your Google Sheet.

---

## Option 2: SvelteKit API Route + Google Sheets API

### Step 1: Set up Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **Google Sheets API**
4. Create credentials (Service Account)
5. Download the JSON key file
6. Share your Google Sheet with the service account email

### Step 2: Install Dependencies
```bash
npm install googleapis
```

### Step 3: Create API Route
Create `src/routes/api/submit-rsvp/+server.ts` (see code below)

### Step 4: Add Environment Variables
Create `.env` file:
```
GOOGLE_SHEETS_CREDENTIALS=path/to/your/credentials.json
GOOGLE_SHEET_ID=your-sheet-id
```

---

## Which Option Should You Use?

- **Option 1 (Google Apps Script)**: Easier, no backend code, free, perfect for simple forms
- **Option 2 (SvelteKit API)**: More control, better for production apps, requires Google Cloud setup

