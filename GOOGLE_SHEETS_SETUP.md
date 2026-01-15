# Google Sheets Integration Setup - Family RSVP System

## Overview
This system allows guests to search for their family by name, see all family members, and select which ones will be attending. The attendance status is stored in a separate column in Google Sheets.

## Google Sheets Structure

### Required Columns:
1. **Column A: Name** - Full name of the person (e.g., "John Smith", "Jane Smith")
2. **Column B: Family ID** - Unique identifier for each family (e.g., "FAMILY001", "SMITH", or a number)
   - All members of the same family must have the same Family ID
   - This is how the system groups family members together
3. **Column C: Attending** - TRUE/FALSE or checkbox indicating if they're attending
   - This column will be automatically updated when someone submits their RSVP
4. **Column D: Submitted** - Timestamp of when the RSVP was submitted
   - Automatically filled when someone submits their RSVP
   - Shows date and time (e.g., "2025-01-15 14:30:00")

### Example Sheet Structure:
```
| Name          | Family ID | Attending | Submitted           |
|---------------|-----------|-----------|---------------------|
| John Smith    | SMITH     | FALSE     |                     |
| Jane Smith    | SMITH     | FALSE     |                     |
| Alice Smith   | SMITH     | FALSE     |                     |
| Bob Johnson   | JOHNSON   | FALSE     |                     |
| Carol Johnson | JOHNSON   | FALSE     |                     |
```

### Important Notes:
- **Family ID is case-sensitive** - "SMITH" and "smith" are treated as different families
- **Name matching is case-insensitive** - "John Smith" matches "john smith" or "JOHN SMITH"
- **Partial name matching** - The system searches for names containing the entered text
- **Multiple matches** - If multiple people have the same name in different families, the system will return the first match found

## Google Apps Script Setup

### Step 1: Create a Google Sheet
1. Create a new Google Sheet
2. Add headers in row 1: `Name`, `Family ID`, `Attending`, `Submitted`
3. Fill in your guest list with names and family IDs
4. Leave the `Attending` and `Submitted` columns empty - they will be updated automatically

### Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete the default code and paste this:

```javascript
function doGet(e) {
  // Handle GET requests for searching families
  const action = e.parameter.action;
  const name = e.parameter.name;
  
  if (action === 'search' && name) {
    const result = searchFamily(name);
    // Add CORS headers for GET requests
    return result.setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: false, error: 'Invalid request' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  // Handle POST requests for updating attendance
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'updateAttendance' && data.attendees) {
      return updateAttendance(data.attendees);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Invalid request' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function searchFamily(searchName) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Skip header row
    const headers = data[0];
    const nameColIndex = headers.indexOf('Name');
    const familyIdColIndex = headers.indexOf('Family ID');
    
    if (nameColIndex === -1 || familyIdColIndex === -1) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          error: 'Sheet must have "Name" and "Family ID" columns' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Normalize search name (case-insensitive, trim)
    const normalizedSearch = searchName.trim().toLowerCase();
    
    // Find matching person
    let foundRowIndex = -1;
    let foundFamilyId = null;
    
    for (let i = 1; i < data.length; i++) {
      const rowName = String(data[i][nameColIndex] || '').trim().toLowerCase();
      
      // Check for exact match first, then partial match
      if (rowName === normalizedSearch || rowName.includes(normalizedSearch)) {
        foundRowIndex = i;
        foundFamilyId = String(data[i][familyIdColIndex] || '').trim();
        break; // Use first match found
      }
    }
    
    if (foundRowIndex === -1 || !foundFamilyId) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          error: 'Name not found. Please check your spelling.' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Find all family members with the same Family ID
    const familyMembers = [];
    for (let i = 1; i < data.length; i++) {
      const rowFamilyId = String(data[i][familyIdColIndex] || '').trim();
      if (rowFamilyId === foundFamilyId) {
        familyMembers.push({
          name: String(data[i][nameColIndex] || '').trim(),
          familyId: foundFamilyId,
          rowIndex: i + 1 // 1-based row index for Google Sheets
        });
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        family: familyMembers 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function updateAttendance(attendees) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const nameColIndex = headers.indexOf('Name');
    const attendingColIndex = headers.indexOf('Attending');
    let submittedColIndex = headers.indexOf('Submitted');
    
    // Create Submitted column if it doesn't exist
    if (submittedColIndex === -1) {
      const lastCol = sheet.getLastColumn();
      sheet.getRange(1, lastCol + 1).setValue('Submitted');
      submittedColIndex = lastCol;
      headers.push('Submitted');
    }
    
    if (nameColIndex === -1 || attendingColIndex === -1) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          error: 'Sheet must have "Name" and "Attending" columns' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get current timestamp
    const timestamp = new Date();
    
    // Get family ID to update all family members' submitted timestamp
    let familyId = null;
    if (attendees.length > 0) {
      const firstAttendeeRow = attendees[0].rowIndex;
      const familyIdColIndex = headers.indexOf('Family ID');
      
      if (familyIdColIndex !== -1 && firstAttendeeRow > 0 && firstAttendeeRow <= data.length) {
        familyId = String(data[firstAttendeeRow - 1][familyIdColIndex] || '').trim();
      }
    }
    
    // Update attendance and submitted timestamp for each attendee
    // Note: rowIndex from frontend is 1-based (Google Sheets row number)
    for (const attendee of attendees) {
      const rowIndex = attendee.rowIndex;
      if (rowIndex > 0 && rowIndex <= data.length) {
        // Set attending status (TRUE for attending, FALSE for not attending)
        sheet.getRange(rowIndex, attendingColIndex + 1).setValue(attendee.attending ? true : false);
        // Set submitted timestamp
        sheet.getRange(rowIndex, submittedColIndex + 1).setValue(timestamp);
      }
    }
    
    // Also set FALSE for family members not in the attendees list and update their submitted timestamp
    if (familyId) {
      const familyIdColIndex = headers.indexOf('Family ID');
      const attendingRowIndices = new Set(attendees.map(a => a.rowIndex));
      
      // Find all family members and set non-attendees to FALSE and update submitted timestamp
      for (let i = 1; i < data.length; i++) {
        const rowFamilyId = String(data[i][familyIdColIndex] || '').trim();
        if (rowFamilyId === familyId && !attendingRowIndices.has(i + 1)) {
          sheet.getRange(i + 1, attendingColIndex + 1).setValue(false);
          sheet.getRange(i + 1, submittedColIndex + 1).setValue(timestamp);
        }
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **If this is your first deployment:**
   - Click **Deploy** → **New deployment**
   - Select type: **Web app**
   - Set:
     - Description: "RSVP Family Search and Update"
     - Execute as: **Me**
     - Who has access: **Anyone** ⚠️ **CRITICAL: Must be "Anyone" for CORS to work**
   - Click **Deploy**
   - **Copy the Web App URL** - you'll need this!

4. **If updating an existing deployment:**
   - Click **Deploy** → **Manage deployments**
   - Click the **edit icon** (pencil) next to your deployment
   - **VERIFY**: "Who has access" is set to **"Anyone"** (change it if not!)
   - Click **Deploy** (this creates a new version)
   - **Copy the Web App URL** if it changed

### Step 3: Update Your Form
1. Open `src/routes/+page.svelte`
2. Find the line with `GOOGLE_SCRIPT_URL`
3. Replace it with your Google Apps Script URL:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
4. Save the file - that's it!

## Edge Cases Handled

### 1. **Name Not Found**
- Shows error message: "Name not found. Please check your spelling or contact us."
- User can try again with different spelling

### 2. **Case Sensitivity**
- Name search is case-insensitive ("john smith" matches "John Smith")
- Family ID matching is case-sensitive (must match exactly)

### 3. **Partial Name Matching**
- If user types "John", it will match "John Smith", "Johnny Smith", etc.
- First match found is used

### 4. **Multiple People with Same Name**
- If multiple people have the same name in different families, the first match is used
- **Recommendation**: Use full names or add middle initials to avoid conflicts

### 5. **Empty Family**
- If only one person is in a family, they'll see just themselves
- They can still check/uncheck themselves

### 6. **No Attendees Selected**
- Form validation prevents submission if no one is selected
- Shows error: "Please select at least one attendee"

### 7. **Family ID Variations**
- Supports any format: numbers ("001"), text ("SMITH"), or mixed ("FAMILY001")
- Must be exact match (case-sensitive)

### 8. **Re-submission**
- If someone submits again, it will update the attendance status
- Previous selections are overwritten

## Testing Your Setup

1. **Test Search**:
   - Enter a name from your sheet
   - Verify all family members appear
   - Check that checkboxes work

2. **Test Submission**:
   - Select some family members
   - Submit the form
   - Check your Google Sheet - the "Attending" column should update

3. **Test Edge Cases**:
   - Try a name that doesn't exist
   - Try partial name matches
   - Try submitting with no one selected

## Troubleshooting

### "Name not found" even though name exists
- Check that the name in the sheet matches (case-insensitive)
- Verify the "Name" column header is exactly "Name" (no extra spaces)
- Check that Family ID column exists and has data

### Family members not showing
- Verify all family members have the same Family ID (exact match, case-sensitive)
- Check that Family ID column header is exactly "Family ID"

### Attendance not updating
- Verify "Attending" column exists
- Check that the script has permission to edit the sheet
- Look at the browser console for errors
- The "Submitted" column will be created automatically if it doesn't exist

### CORS errors
- Make sure the Google Apps Script is deployed as a Web App with "Anyone" access
- Verify the URL is correct in your code
