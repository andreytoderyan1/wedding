import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { names } = await request.json();

		if (!names || !Array.isArray(names) || names.length === 0) {
			return json({ error: 'Names are required' }, { status: 400 });
		}

		// Option 2A: Use Google Sheets API (requires googleapis package)
		// Uncomment and configure this if using Option 2:
		/*
		const { GoogleSpreadsheet } = require('google-spreadsheet');
		const creds = require(process.env.GOOGLE_SHEETS_CREDENTIALS);
		const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
		await doc.useServiceAccountAuth(creds);
		await doc.loadInfo();
		const sheet = doc.sheetsByIndex[0];
		await sheet.addRow({
			Timestamp: new Date().toISOString(),
			Names: names.join(', ')
		});
		*/

		// Option 2B: Call Google Apps Script from server (more secure)
		// Replace with your Google Apps Script URL
		const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';
		
		if (GOOGLE_SCRIPT_URL) {
			await fetch(GOOGLE_SCRIPT_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ names })
			});
		} else {
			// For now, just log (replace with actual Google Sheets integration)
			console.log('RSVP Submission:', {
				timestamp: new Date().toISOString(),
				names
			});
		}

		return json({ success: true });
	} catch (error) {
		console.error('Error submitting RSVP:', error);
		return json({ error: 'Failed to submit RSVP' }, { status: 500 });
	}
};

