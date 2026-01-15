# Google Sheets Conditional Formatting Setup

This guide shows you how to set up automatic color coding in your Google Sheet using conditional formatting. This way, colors are managed entirely in Google Sheets - no code changes needed!

## Color Rules

- **Green** - Row is highlighted light green when `Attending = TRUE` and `Submitted` has a value
- **Red** - Row is highlighted light red when `Attending = FALSE` and `Submitted` has a value  
- **Clear/White** - No highlight when `Submitted` is empty (no response yet)

## Setup Steps

1. **Open your Google Sheet** with the guest list

2. **Select all data rows** (excluding header):
   - Click on row number `2` (first data row)
   - Hold `Shift` and click on the last row number (or press `Ctrl+Shift+Down Arrow` / `Cmd+Shift+Down Arrow` on Mac)
   - This selects all data rows

3. **Open Conditional Formatting**:
   - Go to **Format → Conditional formatting** (or right-click → Conditional formatting)

4. **Add Rule 1: Green for Attending**
   - In the "Format cells if..." dropdown, select **Custom formula is**
   - Enter this formula:
     ```
     =AND($C2=TRUE, $D2<>"")
     ```
     (Replace `C` with your "Attending" column letter, and `D` with your "Submitted" column letter)
   - Click the fill color button and choose **Light Green** (`#E8F5E9` or similar)
   - Click **Done**

5. **Add Rule 2: Red for Not Attending**
   - Click **Add another rule**
   - Select **Custom formula is**
   - Enter this formula:
     ```
     =AND($C2=FALSE, $D2<>"")
     ```
     (Again, adjust column letters as needed)
   - Click the fill color button and choose **Light Red** (`#FFEBEE` or similar)
   - Click **Done**

6. **Apply to all rows**:
   - Make sure the range includes all your data rows (e.g., `A2:Z1000` or whatever your last column/row is)
   - The formulas will automatically adjust for each row

## Column Reference

If your columns are in a different order, adjust the formulas:

- **Column A** = `$A2`
- **Column B** = `$B2`
- **Column C** = `$C2` (usually "Attending")
- **Column D** = `$D2` (usually "Submitted")
- etc.

## Example Formulas

If "Attending" is in column C and "Submitted" is in column D:

**Green (Attending):**
```
=AND($C2=TRUE, $D2<>"")
```

**Red (Not Attending):**
```
=AND($C2=FALSE, $D2<>"")
```

## Testing

1. Submit an RSVP through your form
2. The row should automatically turn green (if attending) or red (if not attending)
3. Rows without a "Submitted" value will remain white/clear

## Notes

- Conditional formatting updates automatically - no need to run any scripts
- The colors will persist even if you manually edit the sheet
- You can adjust the colors by editing the conditional formatting rules
- The `$` before the column letter makes it absolute (so the column doesn't change as the formula moves across rows)
- The row number (`2`) is relative, so it adjusts for each row automatically

