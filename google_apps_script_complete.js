function doGet(e) {
  // Handle GET requests for searching families
  // Check if e and e.parameter exist to avoid errors when testing
  if (!e || !e.parameter) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Invalid request - no parameters provided' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  const action = e.parameter.action;
  const name = e.parameter.name;
  
  if (action === 'search' && name) {
    return searchFamily(name);
  }
  
  if (action === 'getAllGuests') {
    return getAllGuests();
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: false, error: 'Invalid request - action and name required' }))
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
    
    // Normalize search name (case-insensitive, trim leading/trailing whitespace, remove extra spaces)
    const normalizedSearch = searchName.trim().toLowerCase().replace(/\s+/g, ' ');
    
    // Split into first name and last name - require both
    const searchParts = normalizedSearch.split(/\s+/).filter(part => part.length > 0);
    const searchFirstName = searchParts[0] || '';
    const searchLastName = searchParts.length > 1 ? searchParts.slice(1).join(' ') : '';
    
    // Require both first and last name
    if (!searchFirstName || !searchLastName) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          error: 'Please enter both first and last name' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Find matching person - strict first name and last name matching
    // Optimized for speed: minimize string operations
    let foundRowIndex = -1;
    let foundFamilyId = null;
    
    // Pre-normalize search terms once
    const searchFirstNameLower = searchFirstName.toLowerCase();
    const searchLastNameLower = searchLastName.toLowerCase();
    const searchLen = searchFirstNameLower.length + searchLastNameLower.length;
    
    for (let i = 1; i < data.length; i++) {
      // Fast path: check if name column exists
      const rawName = data[i][nameColIndex];
      if (!rawName) continue;
      
      // Quick length check before expensive operations
      const nameStr = String(rawName);
      if (nameStr.length < searchLen) continue;
      
      // Normalize efficiently
      const rowName = nameStr.trim().toLowerCase();
      const spaceIndex = rowName.indexOf(' ');
      
      // Must have at least one space (first and last name)
      if (spaceIndex === -1 || spaceIndex === 0) continue;
      
      const rowFirstName = rowName.substring(0, spaceIndex);
      
      // Early exit if first name doesn't match
      if (rowFirstName !== searchFirstNameLower) continue;
      
      // Get last name (everything after first space)
      const rowLastName = rowName.substring(spaceIndex + 1).trim();
      
      // Final check: last name must match
      if (rowLastName === searchLastNameLower) {
        foundRowIndex = i;
        foundFamilyId = String(data[i][familyIdColIndex] || '').trim();
        break; // Found match, exit immediately
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
    
    // Get current timestamp (with date and time)
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
        
        // Set submitted timestamp (date and time)
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
          const rowIndex = i + 1;
          sheet.getRange(rowIndex, attendingColIndex + 1).setValue(false);
          sheet.getRange(rowIndex, submittedColIndex + 1).setValue(timestamp);
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

function getAllGuests() {
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
    
    // Get all guests (skip header row)
    const guests = [];
    for (let i = 1; i < data.length; i++) {
      const name = String(data[i][nameColIndex] || '').trim();
      const familyId = String(data[i][familyIdColIndex] || '').trim();
      
      // Only include rows with both name and family ID
      if (name && familyId) {
        guests.push({
          name: name,
          familyId: familyId,
          rowIndex: i + 1 // 1-based row index for Google Sheets
        });
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        guests: guests 
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
