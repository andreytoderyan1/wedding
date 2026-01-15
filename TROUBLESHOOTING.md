# Troubleshooting Connection Errors

## "Unable to connect" Error

If you're seeing "Unable to connect" when searching for names, follow these steps:

### Step 1: Test the Google Apps Script URL Directly

Open this URL in your browser (replace with your actual script URL):
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=search&name=John
```

**What to expect:**
- ✅ **Success**: You should see JSON like: `{"success":true,"family":[...]}`
- ❌ **Error**: You'll see an error message that helps identify the problem

### Step 2: Check Google Apps Script Deployment

1. **Open your Google Sheet**
2. **Go to Extensions → Apps Script**
3. **Click Deploy → Manage deployments**
4. **Check these settings:**
   - ✅ **Execute as**: "Me"
   - ✅ **Who has access**: "Anyone" (NOT "Only myself")
   - ✅ **Version**: Should be "New version" or latest version

### Step 3: Redeploy if Needed

If "Who has access" is not "Anyone":
1. Click the **edit icon** (pencil) on your deployment
2. Change **Who has access** to **"Anyone"**
3. Click **Deploy**
4. **Important**: Copy the NEW URL if it changed
5. Update the URL in `src/routes/+page.svelte`

### Step 4: Check Browser Console

1. Open your website
2. Press **F12** (or right-click → Inspect)
3. Go to **Console** tab
4. Try searching for a name
5. Look for error messages

**Common errors:**
- `CORS policy`: Script not deployed with "Anyone" access
- `404 Not Found`: Wrong URL or script not deployed
- `Failed to fetch`: Network issue or script URL incorrect

### Step 5: Verify Your Sheet Structure

Make sure your Google Sheet has:
- ✅ Column A: **Name** (exact spelling, case-sensitive header)
- ✅ Column B: **Family ID** (exact spelling, case-sensitive header)
- ✅ Column C: **Attending** (exact spelling, case-sensitive header)
- ✅ Column D: **Submitted** (will be created automatically if missing)

### Step 6: Test with a Simple Name

Try searching for a name that:
- ✅ Exists in your sheet
- ✅ Has a Family ID assigned
- ✅ Is spelled exactly as in the sheet (case doesn't matter for search, but name must match)

### Step 7: Check Script Permissions

1. In Apps Script editor, click **Run** → **Run function** → **doGet**
2. If it asks for permissions, **grant them**
3. Try running the function again

## Quick Fix Checklist

- [ ] Script is deployed as "Web app"
- [ ] "Who has access" is set to "Anyone"
- [ ] Script URL is correct in `+page.svelte`
- [ ] Sheet has "Name" and "Family ID" columns
- [ ] Test name exists in the sheet
- [ ] Browser console shows no CORS errors
- [ ] Direct URL test works in browser

## Still Not Working?

1. **Check the browser console** (F12) for specific error messages
2. **Test the URL directly** in browser - does it return JSON?
3. **Verify the script code** matches `google_apps_script_complete.js`
4. **Try redeploying** the script as a new version

