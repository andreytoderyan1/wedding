# Family RSVP System - Implementation Guide

## Overview
The RSVP system has been updated to support family-based RSVPs. When a guest enters their name, the system finds their family members and displays them as checkboxes. Guests can then select which family members will be attending.

## How It Works

### User Flow:
1. **Guest enters their name** in the search field
2. **System searches** Google Sheets for matching name (case-insensitive, supports partial matches)
3. **System finds family** by matching the Family ID of the found person
4. **System displays** all family members as checkboxes (all checked by default)
5. **Guest selects** which family members will attend
6. **Guest submits** the RSVP
7. **System updates** Google Sheets with attendance status and submission timestamp

### Google Sheets Structure:
- **Column A: Name** - Full name of each person
- **Column B: Family ID** - Unique identifier grouping family members together
- **Column C: Attending** - TRUE/FALSE status (automatically updated)
- **Column D: Submitted** - Timestamp of when RSVP was submitted (automatically updated)

## Family Identification Strategy

### Recommended Approach: **Family ID Column**
- Each family gets a unique identifier (e.g., "SMITH", "JOHNSON", "FAMILY001")
- All family members share the same Family ID
- Case-sensitive matching (must match exactly)

### Alternative Approaches (Not Implemented):
1. **Last Name Matching** - Simple but fails with:
   - Different last names (step-families, hyphenated names)
   - Same last name, different families
   - Name variations

2. **Explicit Family Groups** - More complex but most flexible
   - Requires additional relationship columns
   - Better for complex family structures

## Edge Cases Handled

### ✅ 1. Name Not Found
- **Scenario**: Guest enters a name that doesn't exist in the sheet
- **Handling**: Shows error message "Name not found. Please check your spelling or contact us."
- **User Action**: Can try again with different spelling

### ✅ 2. Case Sensitivity
- **Name Search**: Case-insensitive ("john smith" matches "John Smith")
- **Family ID**: Case-sensitive (must match exactly)
- **Reason**: Allows flexible name entry while maintaining precise family grouping

### ✅ 3. Partial Name Matching
- **Scenario**: Guest types "John" instead of "John Smith"
- **Handling**: Matches any name containing "John" (e.g., "John Smith", "Johnny Smith")
- **Note**: First match found is used
- **Recommendation**: Encourage guests to use full names for accuracy

### ✅ 4. Multiple People with Same Name
- **Scenario**: Two different people named "John Smith" in different families
- **Handling**: Returns the first match found
- **Limitation**: May return wrong family if names are duplicated
- **Recommendation**: 
  - Use full names with middle initials
  - Or use unique identifiers in the name field (e.g., "John Smith (ID: 123)")

### ✅ 5. Empty/Single-Person Family
- **Scenario**: Only one person in a family
- **Handling**: Shows just that person as a checkbox
- **Behavior**: Works normally, they can check/uncheck themselves

### ✅ 6. No Attendees Selected
- **Scenario**: Guest unchecks everyone before submitting
- **Handling**: Form validation prevents submission
- **Error Message**: "Please select at least one attendee"

### ✅ 7. Family ID Variations
- **Supported Formats**: 
  - Numbers: "001", "123"
  - Text: "SMITH", "JOHNSON"
  - Mixed: "FAMILY001", "GROUP-A"
- **Requirement**: Must match exactly (case-sensitive)

### ✅ 8. Re-submission
- **Scenario**: Guest submits RSVP, then changes their mind and submits again
- **Handling**: Updates attendance status (overwrites previous submission)
- **Behavior**: 
  - Selected attendees → TRUE
  - Unselected family members → FALSE

### ✅ 9. Special Characters in Names
- **Handling**: Properly encoded in URL and JSON
- **Supported**: Most special characters, accents, etc.

### ✅ 10. Network Errors
- **Scenario**: Internet connection fails during search or submission
- **Handling**: Shows error message, allows retry
- **Error Message**: "Unable to search for your family. Please try again or contact us."

## Potential Edge Cases (Not Currently Handled)

### ⚠️ 1. Multiple Families with Same Name
- **Issue**: If "John Smith" exists in Family A and Family B, only first match is returned
- **Current Behavior**: Returns first match
- **Recommendation**: Use full names with middle initials or unique identifiers

### ⚠️ 2. Step-Families with Different Last Names
- **Issue**: If parents have different last names, they need same Family ID
- **Current Behavior**: Works if Family ID is set correctly
- **Recommendation**: Manually set Family ID for step-families

### ⚠️ 3. Guests in Multiple Families
- **Issue**: Someone might be in two families (e.g., divorced parents)
- **Current Behavior**: Only returns one family (first match)
- **Recommendation**: Create separate entries for each family context

### ⚠️ 4. Very Large Families
- **Issue**: Families with 20+ members might be hard to display
- **Current Behavior**: All members shown as checkboxes
- **Recommendation**: Consider pagination or grouping if needed

### ⚠️ 5. Name Changes After Initial Entry
- **Issue**: If someone's name changes in the sheet after they've already RSVP'd
- **Current Behavior**: They'll need to search with new name
- **Recommendation**: Keep names consistent, or allow searching by old name too

## Testing Checklist

- [ ] Search with exact full name
- [ ] Search with partial name
- [ ] Search with different case
- [ ] Search with name that doesn't exist
- [ ] Submit with all family members selected
- [ ] Submit with some family members selected
- [ ] Submit with no one selected (should fail)
- [ ] Re-submit with different selections
- [ ] Test with single-person family
- [ ] Test with large family (5+ members)
- [ ] Verify Google Sheets updates correctly
- [ ] Test network error handling

## Recommendations for Best Results

1. **Use Consistent Naming**:
   - Use full names (first + last)
   - Include middle initials if needed for uniqueness
   - Keep names consistent across the sheet

2. **Family ID Best Practices**:
   - Use a consistent format (all uppercase, all lowercase, or mixed)
   - Make IDs unique and memorable
   - Consider using last name as Family ID for simplicity

3. **Sheet Organization**:
   - Keep families grouped together visually
   - Use consistent formatting
   - Regularly verify Family IDs are correct

4. **Guest Communication**:
   - Encourage guests to use their full name as it appears on the invitation
   - Provide contact info for guests who can't find their name
   - Consider sending a test link to a few guests before going live

## Technical Details

### API Endpoints:
- **GET**: `/script-url?action=search&name=John+Smith` - Search for family
- **POST**: `/script-url` with JSON body - Update attendance

### Data Flow:
1. Frontend → Google Apps Script (GET) → Search family
2. Google Apps Script → Google Sheets → Read family data
3. Google Apps Script → Frontend → Return family members
4. Frontend → Google Apps Script (POST) → Update attendance
5. Google Apps Script → Google Sheets → Update "Attending" column

### Security Considerations:
- Google Apps Script is deployed with "Anyone" access (required for public form)
- No authentication required (by design for public RSVP)
- Consider rate limiting if needed
- Validate all inputs server-side (Google Apps Script)

