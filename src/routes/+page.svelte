<script lang="ts">
	import { Plus, X, Copy, Check, Calendar, Gift } from '@lucide/svelte';
	import { onMount } from 'svelte';

	interface FamilyMember {
		name: string;
		familyId: string;
		rowIndex: number;
	}

	interface GuestData {
		name: string;
		familyId: string;
		rowIndex: number;
	}

	let nameInput = $state('');
	let submitted = $state(false);
	let addressCopied = $state(false);
	let submittedNames = $state<string[]>([]);
	let formError = $state<string>('');
	let familyMembers = $state<FamilyMember[]>([]);
	let selectedAttendees = $state<Set<number>>(new Set());
	let isLoadingFamily = $state(false);
	let familyFound = $state(false);
	let searchResultsReady = $state(false);
	let pendingFamilyMembers = $state<FamilyMember[]>([]);
	let searchTimeout: ReturnType<typeof setTimeout> | null = null;
	let isCheckingRSVP = $state(false);
	let isLoadingGuestData = $state(true);
	
	// Local storage of all guest data (loaded once on page load)
	let allGuestData = $state<GuestData[]>([]);
	
	// Cache for search results (key: normalized name, value: family members)
	const searchCache = new Map<string, FamilyMember[]>();
	
	// Easter egg: Track RSVP button clicks
	let rsvpClickCount = $state(0);
	let showAllGuests = $state(false);
	let allGuestDataWithStatus = $state<Array<{name: string; familyId: string; attending: boolean; submitted: string | null}>>([]);
	let isLoadingAllGuests = $state(false);
	
	// Event details
	const eventDate = '2025-07-05';
	const eventTime = '15:00';
	const eventTitle = 'Wedding Celebration';
	const eventLocation = '81 Woodard Creek Rd, Stevenson, WA 98648';
	const fullAddress = '81 Woodard Creek Rd\nStevenson, WA\n98648';
	
	// Registry URL
	const registryUrl = 'https://www.myregistry.com/wedding-registry/vita-vakulchik-and-andrey-toderyan-milwaukie-or/5051584';
	
	// Google Apps Script URL for form submissions
	const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxLasckvBTaFN2uI2iKXxQ8tyUe7goF28HamUGf0V5pYWB1GjAbb5515H5t8Wy2hLycHQ/exec';

	// Load all guest data on page mount (with status)
	onMount(async () => {
		try {
			const startTime = performance.now();
			console.log('🔄 Loading guest data with status from Google Sheets...');
			
			// Try getAllGuestData first (has status), fallback to getAllGuests if not available
			let url = `${GOOGLE_SCRIPT_URL}?action=getAllGuestData`;
			console.log('Fetching from:', url);
			
			let response = await fetch(url, {
				method: 'GET',
				mode: 'cors',
				credentials: 'omit',
				headers: {
					'Accept': 'application/json'
				}
			});

			let responseText = await response.text();
			let data: { success?: boolean; guests?: Array<{name: string; familyId: string; rowIndex: number; attending?: boolean; submitted?: string | null}>; error?: string };
			
			try {
				data = JSON.parse(responseText);
			} catch (parseError) {
				console.error('❌ Failed to parse JSON:', parseError);
				console.warn('⚠️ Will use API search as fallback');
				return;
			}
			
			// Check if we got status data
			const hasStatusData = data.success && data.guests && data.guests.length > 0 && 
				(data.guests[0].attending !== undefined || data.guests[0].submitted !== undefined);
			
			// If getAllGuestData failed or doesn't have status, try getAllGuests as fallback
			if (!data.success || data.error || !hasStatusData) {
				if (!hasStatusData && data.success) {
					console.log('⚠️ getAllGuestData returned data but no status fields, trying getAllGuests...');
				} else {
					console.log('⚠️ getAllGuestData not available, trying getAllGuests...');
				}
				
				url = `${GOOGLE_SCRIPT_URL}?action=getAllGuests`;
				response = await fetch(url, {
					method: 'GET',
					mode: 'cors',
					credentials: 'omit',
					headers: {
						'Accept': 'application/json'
					}
				});
				
				responseText = await response.text();
				try {
					data = JSON.parse(responseText);
					console.log('⚠️ Using getAllGuests (no status data available - redeploy script with getAllGuestData for status)');
				} catch (parseError) {
					console.error('❌ Failed to parse JSON:', parseError);
					console.warn('⚠️ Will use API search as fallback');
					return;
				}
			}

			if (response.ok && data.success && data.guests && data.guests.length > 0) {
				// Store both the basic guest data and the full data with status
				allGuestData = data.guests.map(g => ({
					name: g.name,
					familyId: g.familyId,
					rowIndex: g.rowIndex
				}));
				
				// Store the full data with status (check if status fields exist)
				const hasStatus = data.guests[0] && (data.guests[0].attending !== undefined || data.guests[0].submitted !== undefined);
				
				allGuestDataWithStatus = data.guests.map(g => {
					let attending = false;
					if (hasStatus && g.attending !== undefined) {
						const att: any = g.attending;
						attending = att === true || att === 'TRUE' || String(att).toUpperCase() === 'TRUE';
					}
					return {
						name: g.name,
						familyId: g.familyId,
						attending: attending,
						submitted: hasStatus ? (g.submitted || null) : null
					};
				});
				
				const loadTime = performance.now() - startTime;
				console.log(`✅ Loaded ${data.guests.length} guests in ${loadTime.toFixed(0)}ms - searches will be instant!`);
				
				// Log status breakdown if we have status data
				if (hasStatus) {
					const responded = data.guests.filter(g => g.submitted).length;
					const attending = data.guests.filter(g => {
						const att: any = g.attending;
						return att === true || att === 'TRUE' || String(att).toUpperCase() === 'TRUE';
					}).length;
					console.log(`📊 Status: ${attending} attending, ${responded} responded`);
				} else {
					console.warn('⚠️ No status data available - all guests will show as "Pending"');
					console.warn('⚠️ Redeploy Google Apps Script with getAllGuestData function to see attendance status');
				}
			} else if (data.success && data.guests && data.guests.length === 0) {
				console.warn('⚠️ Guest data loaded but empty (0 guests found)');
			} else {
				console.warn('⚠️ Guest data load returned no data:', data.error || 'Unknown error');
			}
		} catch (error) {
			console.error('❌ Error loading guest data:', error);
			if (error instanceof TypeError && error.message.includes('fetch')) {
				console.error('This might be a CORS issue. Make sure:');
				console.error('1. Google Apps Script is deployed as "Anyone" (not "Anyone with Google account")');
				console.error('2. The script URL is correct');
				console.error('3. Your internet connection is working');
			}
			console.warn('⚠️ Will use API search as fallback');
		} finally {
			isLoadingGuestData = false;
		}
	});

	const copyAddress = async () => {
		try {
			await navigator.clipboard.writeText(fullAddress);
			addressCopied = true;
			setTimeout(() => {
				addressCopied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	const addToGoogleCalendar = () => {
		// Google Calendar link
		const startDate = `${eventDate}T${eventTime}:00`;
		const endDate = `${eventDate}T17:00:00`; // 2 hours duration
		const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate.replace(/[-:]/g, '')}/${endDate.replace(/[-:]/g, '')}&details=${encodeURIComponent('We can\'t wait to celebrate with you!')}&location=${encodeURIComponent(eventLocation)}`;
		window.open(googleCalendarUrl, '_blank');
	};

	const addToAppleCalendar = () => {
		const startDate = `${eventDate}T${eventTime}:00`;
		const endDate = `${eventDate}T17:00:00`;
		
		// Format dates for ICS (YYYYMMDDTHHmmss)
		const formatICSDate = (dateStr: string) => {
			return dateStr.replace(/-/g, '').replace(/:/g, '');
		};
		
		const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding RSVP//EN
BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${eventTitle}
DESCRIPTION:We can't wait to celebrate with you!
LOCATION:${eventLocation}
END:VEVENT
END:VCALENDAR`;

		// Use data URL with calendar MIME type - this should open Calendar app directly on Apple devices
		const dataUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
		
		// Create a link and click it - on macOS/iOS this should open Calendar
		const link = document.createElement('a');
		link.href = dataUrl;
		link.style.display = 'none';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const downloadICS = () => {
		const startDate = `${eventDate}T${eventTime}:00`;
		const endDate = `${eventDate}T17:00:00`;
		
		// Format dates for ICS (YYYYMMDDTHHmmss)
		const formatICSDate = (dateStr: string) => {
			// Remove dashes and colons, keep T
			return dateStr.replace(/-/g, '').replace(/:/g, '');
		};
		
		const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding RSVP//EN
BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${eventTitle}
DESCRIPTION:We can't wait to celebrate with you!
LOCATION:${eventLocation}
END:VEVENT
END:VCALENDAR`;

		const blob = new Blob([icsContent], { type: 'text/calendar' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'wedding-invitation.ics';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const searchFamily = async (name: string, showResults: boolean = true) => {
		// Remove all leading and trailing whitespace
		const trimmedName = name.trim();
		
		// Require first name and at least part of last name
		const nameParts = trimmedName.split(/\s+/).filter(part => part.length > 0);
		if (!trimmedName || nameParts.length < 2) {
			if (showResults) {
				familyMembers = [];
				familyFound = false;
				selectedAttendees.clear();
				isCheckingRSVP = false;
				if (trimmedName && nameParts.length === 1) {
					formError = 'Please enter your first name and at least part of your last name';
				} else {
					formError = '';
				}
			} else {
				searchResultsReady = false;
				pendingFamilyMembers = [];
			}
			return;
		}

		// Normalize name for cache key (lowercase, single spaces)
		const cacheKey = trimmedName.toLowerCase().replace(/\s+/g, ' ').trim();
		
		// Check cache first (instant)
		const cachedResult = searchCache.get(cacheKey);
		if (cachedResult) {
			// Use cached result immediately
			if (showResults) {
				familyMembers = cachedResult;
				familyFound = true;
				selectedAttendees = new Set(familyMembers.map(m => m.rowIndex));
				formError = '';
				isCheckingRSVP = false; // Clear loading immediately
			} else {
				pendingFamilyMembers = cachedResult;
				searchResultsReady = true;
			}
			return;
		}

		// If guest data is loaded, search locally (instant, synchronous!)
		if (allGuestData.length > 0) {
			const searchStart = performance.now();
			const result = searchLocal(trimmedName);
			const searchTime = performance.now() - searchStart;
			console.log(`Local search took ${searchTime.toFixed(2)}ms`);
			
			if (result) {
				// Cache the result
				searchCache.set(cacheKey, result);
				
				if (showResults) {
					familyMembers = result;
					familyFound = true;
					selectedAttendees = new Set(familyMembers.map(m => m.rowIndex));
					formError = '';
					isCheckingRSVP = false; // Clear loading immediately
				} else {
					pendingFamilyMembers = result;
					searchResultsReady = true;
				}
				return;
			} else {
				// Not found locally
				if (showResults) {
					familyMembers = [];
					familyFound = false;
					selectedAttendees.clear();
					formError = 'Name not found. Please check your spelling or contact us.';
					isCheckingRSVP = false; // Clear loading immediately
				} else {
					searchResultsReady = false;
					pendingFamilyMembers = [];
				}
				return;
			}
		}

		// Fallback to API search if local data not loaded yet
		isLoadingFamily = true;
		if (showResults) {
			formError = '';
		}
		
		try {
			// Call Google Apps Script to search for family (using GET)
			const url = `${GOOGLE_SCRIPT_URL}?action=search&name=${encodeURIComponent(trimmedName)}`;
			
			const response = await fetch(url, {
				method: 'GET',
				cache: 'no-cache'
			});

			if (!response.ok) {
				const errorText = await response.text().catch(() => 'Unknown error');
				console.error('Response error:', response.status, errorText);
				throw new Error(`Failed to search: ${response.status}`);
			}

			const responseText = await response.text();
			
			let data: { success?: boolean; family?: FamilyMember[]; error?: string };
			try {
				data = JSON.parse(responseText);
			} catch (parseError) {
				console.error('JSON parse error:', parseError, 'Response:', responseText);
				throw new Error('Invalid response from server');
			}
			
			if (data.success && data.family && data.family.length > 0) {
				searchCache.set(cacheKey, data.family);
				
				if (showResults) {
					familyMembers = data.family;
					familyFound = true;
					selectedAttendees = new Set(familyMembers.map(m => m.rowIndex));
					formError = '';
				} else {
					pendingFamilyMembers = data.family;
					searchResultsReady = true;
				}
			} else {
				if (showResults) {
					familyMembers = [];
					familyFound = false;
					selectedAttendees.clear();
					formError = data.error || 'Name not found. Please check your spelling or contact us.';
				} else {
					searchResultsReady = false;
					pendingFamilyMembers = [];
				}
			}
		} catch (error) {
			console.error('Error searching for family:', error);
			if (showResults) {
				if (error instanceof TypeError) {
					if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
						formError = `Connection error. Please check:\n1. Your internet connection\n2. The Google Apps Script URL is correct\n3. The script is deployed with "Anyone" access\n\nError: ${error.message}`;
					} else {
						formError = `Error: ${error.message}. Please check the browser console for details.`;
					}
				} else if (error instanceof Error) {
					formError = `Error: ${error.message}`;
				} else {
					formError = 'Unable to search for your family. Please check the browser console (F12) for details.';
				}
				familyMembers = [];
				familyFound = false;
				selectedAttendees.clear();
			} else {
				searchResultsReady = false;
				pendingFamilyMembers = [];
			}
		} finally {
			isLoadingFamily = false;
		}
	};

	const handleNameInput = () => {
		// Trim whitespace from input value (remove leading and trailing spaces)
		nameInput = nameInput.trimStart();
		
		// Clear previous timeout
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
		
		// Clear error and loading state when user starts typing
		if (formError) {
			formError = '';
		}
		isCheckingRSVP = false;

		// If input is cleared, reset state
		const trimmedInput = nameInput.trim();
		if (!trimmedInput) {
			familyMembers = [];
			familyFound = false;
			searchResultsReady = false;
			pendingFamilyMembers = [];
			selectedAttendees.clear();
			return;
		}

		// Reset family found state when user types (hide previous results)
		if (familyFound) {
			familyMembers = [];
			familyFound = false;
			searchResultsReady = false;
			pendingFamilyMembers = [];
			selectedAttendees.clear();
		}

		// Check if both first and last name are provided
		const nameParts = trimmedInput.split(/\s+/).filter(part => part.length > 0);
		if (nameParts.length < 2) {
			// Don't search yet if only first name
			searchResultsReady = false;
			pendingFamilyMembers = [];
			return;
		}

		// Search automatically in background (debounced) - but don't show results yet
		searchTimeout = setTimeout(() => {
			searchFamily(trimmedInput, false); // false = don't show results yet
		}, 50); // Minimal debounce for fastest response
	};

	// Local search function (instant, no API call)
	const searchLocal = (name: string): FamilyMember[] | null => {
		const trimmedName = name.trim();
		const nameParts = trimmedName.split(/\s+/).filter(part => part.length > 0);
		if (nameParts.length < 2) return null;

		const searchFirstName = nameParts[0].toLowerCase();
		const searchLastName = nameParts.slice(1).join(' ').toLowerCase();

		// Find matching person - exact first name, partial last name (starts with)
		let foundFamilyId: string | null = null;
		
		for (const guest of allGuestData) {
			const guestName = guest.name.toLowerCase();
			const spaceIndex = guestName.indexOf(' ');
			
			if (spaceIndex === -1) continue;
			
			const guestFirstName = guestName.substring(0, spaceIndex);
			const guestLastName = guestName.substring(spaceIndex + 1).trim();
			
			// First name must match exactly, last name can be partial (starts with)
			if (guestFirstName === searchFirstName && guestLastName.startsWith(searchLastName)) {
				foundFamilyId = guest.familyId;
				break;
			}
		}

		if (!foundFamilyId) return null;

		// Find all family members
		const family: FamilyMember[] = [];
		for (const guest of allGuestData) {
			if (guest.familyId === foundFamilyId) {
				family.push({
					name: guest.name,
					familyId: guest.familyId,
					rowIndex: guest.rowIndex
				});
		}
		}

		return family.length > 0 ? family : null;
	};

	const toggleAttendee = (rowIndex: number) => {
		if (selectedAttendees.has(rowIndex)) {
			selectedAttendees.delete(rowIndex);
		} else {
			selectedAttendees.add(rowIndex);
		}
		// Trigger reactivity
		selectedAttendees = new Set(selectedAttendees);
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		
		const trimmedName = nameInput.trim();
		
		if (!trimmedName) {
			formError = 'Please enter your first name and at least part of your last name';
			return;
		}

		// Check if both first name and at least part of last name are provided
		const nameParts = trimmedName.split(/\s+/).filter(part => part.length > 0);
		if (nameParts.length < 2) {
			formError = 'Please enter your first name and at least part of your last name';
			return;
		}

		// If family already shown, check if attendees are selected for submission
		if (familyFound && familyMembers.length > 0) {
			if (selectedAttendees.size === 0) {
				formError = 'Please select at least one attendee';
				return;
			}
			// Proceed to submission (continue with rest of function)
			isCheckingRSVP = false; // Not checking, submitting
		} else {
			// This is "Check RSVP"
			
			// If results are ready from background search, show them now (instant)
			if (searchResultsReady && pendingFamilyMembers.length > 0) {
				familyMembers = pendingFamilyMembers;
				familyFound = true;
				selectedAttendees = new Set(familyMembers.map(m => m.rowIndex));
				searchResultsReady = false;
				pendingFamilyMembers = [];
				formError = '';
				return; // Show results, wait for them to select and submit again
			}

			// No results ready, trigger search now
			// Only show loading if we need to make an API call
			if (allGuestData.length === 0) {
				isCheckingRSVP = true; // Only show loading for API calls
			}
			
			await searchFamily(trimmedName, true);
			isCheckingRSVP = false;
			
			// After search, check again if family was found
			if (!familyFound || familyMembers.length === 0) {
				return; // Error already shown by searchFamily
			}
			// Family found, wait for them to select attendees
			return;
		}
		
		// Get names of selected attendees
		const attendingNames = familyMembers
			.filter(member => selectedAttendees.has(member.rowIndex))
			.map(member => member.name);
		
		// Store submitted names for personalization
		submittedNames = attendingNames.map(name => {
			// Extract first name (everything before first space)
			const firstName = name.trim().split(' ')[0];
			return firstName;
		});
		
		// Show thank you message immediately
		submitted = true;
		formError = '';
		
		// Check for "bruh" in any name (case-insensitive) - don't submit to Google Sheets if found
		const hasBruh = attendingNames.some(name => name.toLowerCase().includes('bruh'));
		if (hasBruh) {
			// Skip submission to Google Sheets, but still show thank you message
			return;
		}
		
		// Prepare data for submission
		const formData = {
			action: 'updateAttendance',
			attendees: Array.from(selectedAttendees).map(rowIndex => {
				const member = familyMembers.find(m => m.rowIndex === rowIndex);
				return {
					rowIndex: rowIndex,
					name: member?.name || '',
					attending: true
				};
			})
		};
		
		// Submit in the background (fire and forget)
		if (GOOGLE_SCRIPT_URL) {
			fetch(GOOGLE_SCRIPT_URL, {
				method: 'POST',
				mode: 'no-cors', // Required for Google Apps Script
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData)
			}).catch(error => {
				// Silently log errors in background
				console.error('Background submission error:', error);
			});
		} else {
			fetch('/api/submit-rsvp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData)
			}).catch(error => {
				// Silently log errors in background
				console.error('Background submission error:', error);
			});
		}
	};
	
	// Function to show all guest data (using already loaded data - instant!)
	const loadAllGuestData = () => {
		console.log('🚀 loadAllGuestData called');
		console.log(`Using existing guest data: ${allGuestData.length} guests`);
		
		// Show modal immediately with cached data (already has status from initial load!)
		// If status data isn't loaded yet, show pending
		if (allGuestDataWithStatus.length === 0 && allGuestData.length > 0) {
			allGuestDataWithStatus = allGuestData.map(guest => ({
				name: guest.name,
				familyId: guest.familyId,
				attending: false,
				submitted: null
			}));
		}
		
		showAllGuests = true;
		// Prevent body scroll when modal is open
		document.body.style.overflow = 'hidden';
	};
</script>

<div class="min-h-screen" style="background-color: #FFFFFF;">
	<div class="relative w-full mx-auto">
		<img src="/Full.JPG" alt="" class="w-full h-auto object-cover" />
		<!-- Save the Date Overlay -->
		<div class="absolute inset-0 flex flex-col items-center justify-start text-white px-4" style="padding-top: 40%; padding-bottom: 10%;">
			<!-- Main "SAVE the DATE" text -->
			<div class="text-center mt-4 md:mt-6 mb-4 md:mb-5">
				<div class="flex items-center justify-center gap-2 md:gap-2.5">
					<span 
						class="font-light"
						style="font-family: 'Cinzel', serif; font-weight: 300; font-size: clamp(48px, 8vw, 72px); letter-spacing: 0.2em;"
					>
						SAVE
					</span>
					<span 
						class="font-light relative italic"
						style="font-family: 'Allura', cursive; font-weight: 400; font-size: clamp(48px, 8vw, 72px); letter-spacing: 0.05em; font-style: italic; transform: scaleX(0.9);"
					>
						the
					</span>
					<span 
						class="font-light"
						style="font-family: 'Cinzel', serif; font-weight: 300; font-size: clamp(48px, 8vw, 72px); letter-spacing: 0.2em;"
					>
						DATE
					</span>
				</div>
			</div>
			<!-- Details below -->
			<div 
				class="text-center font-light whitespace-nowrap -mt-4 md:-mt-6"
				style="font-family: 'Cormorant Garamond', serif; font-weight: 300;"
			>
				<span 
					role="button"
					tabindex="0"
					style="font-size: clamp(14px, 2vw, 18px); letter-spacing: 0.18em; cursor: pointer; user-select: none;"
					onclick={() => {
						// Easter egg: Increment click counter on "VITA & ANDREY" click
						rsvpClickCount++;
						console.log(`VITA & ANDREY clicks: ${rsvpClickCount}`);
						
						// Check for Easter egg trigger
						if (rsvpClickCount >= 5 && !showAllGuests) {
							console.log('🎉 Easter egg triggered! Loading all guest data...');
							loadAllGuestData();
						}
					}}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							rsvpClickCount++;
							console.log(`VITA & ANDREY clicks: ${rsvpClickCount}`);
							
							if (rsvpClickCount >= 5 && !showAllGuests) {
								console.log('🎉 Easter egg triggered! Loading all guest data...');
								loadAllGuestData();
							}
						}
					}}
				>VITA & ANDREY</span>
				<span class="mx-1.5 md:mx-2">·</span>
				<span style="font-size: clamp(14px, 2vw, 18px); letter-spacing: 0.18em;">07.05.2026</span>
				<span class="mx-1.5 md:mx-2">·</span>
				<span style="font-size: clamp(14px, 2vw, 18px); letter-spacing: 0.1em;">STEVENSON, WA</span>
			</div>
		</div>
	</div>
	<div class="py-18">
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Header - Shows "Reserve Below" or "Thank you!" -->
			<div class="mb-6 text-center">
				{#if submitted}
					<h2 
						class="text-5xl italic font-normal transition-opacity duration-1000 ease-in"
						style="font-family: 'Playfair Display', serif; font-weight: 400; letter-spacing: -0.02em; color: #4A5230;"
					>
						You're all set
					</h2>
				{:else}
					<h2 
						class="text-3xl font-normal italic"
						style="font-family: 'Playfair Display', serif; font-weight: 100; letter-spacing: 0.2em; font-style: italic; transform: scaleX(0.85); color: #4A5230;"
					>
						RSVP
					</h2>
				{/if}
			</div>

			{#if submitted}
				<!-- Thank You Message - Premium Design -->
				<div class="max-w-lg mx-auto px-4">
					<!-- 1. Confirmation Message -->
					<div class="mb-5 text-center">
						{#if submittedNames.length > 0}
							<p class="text-xl font-light tracking-wide leading-relaxed" style="font-family: 'Inter', sans-serif; color: #4A5230;">
								{#if submittedNames.length === 1}
									Thank you, {submittedNames[0]}! We can't wait to celebrate with you.
								{:else if submittedNames.length === 2}
									Thank you, {submittedNames[0]} and {submittedNames[1]}! We can't wait to celebrate with you.
								{:else}
									Thank you, {submittedNames.slice(0, -1).join(', ')}, and {submittedNames[submittedNames.length - 1]}! We can't wait to celebrate with you.
								{/if}
							</p>
						{:else}
							<p class="text-xl font-light tracking-wide leading-relaxed" style="font-family: 'Inter', sans-serif; color: #4A5230;">
								We can't wait to celebrate with you.
							</p>
						{/if}
					</div>
					
					<!-- Invitation Note -->
					<div class="mb-8 text-center">
						<p class="text-base font-light tracking-wide leading-relaxed" style="font-family: 'Inter', sans-serif; color: #4A5230; opacity: 0.8;">
							Formal invitations will be sent out<br />closer to the date.
						</p>
					</div>
					
					<!-- 2. Event Details - Date/Time -->
					<div class="mb-8 text-center">
						<p class="text-xl font-medium tracking-wide mb-1" style="font-family: 'Playfair Display', serif; font-weight: 500; color: #4A5230;">
							Sunday, July 5
						</p>
						<p class="text-base font-light tracking-wide" style="font-family: 'Inter', sans-serif; color: #4A5230; opacity: 0.75;">
							3:00 PM
						</p>
					</div>
					
					<!-- 3. Location - Premium Typography -->
					<div class="mb-12 text-center">
						<button
							onclick={copyAddress}
							class="w-full cursor-pointer group transition-opacity hover:opacity-70"
						>
							<p class="text-xl font-medium tracking-tight mb-2" style="font-family: 'Playfair Display', serif; font-weight: 500; color: #4A5230;">
								Cape Horn Estate
							</p>
							<div class="space-y-1 font-light tracking-wide leading-relaxed" style="font-family: 'Inter', sans-serif; color: #4A5230; opacity: 0.75;">
								<p class="text-base">81 Woodard Creek Rd</p>
								<p class="text-base">Stevenson, WA 98648</p>
							</div>
						</button>
					</div>
					
					<!-- 4. Registry Button -->
					<div class="mb-3">
						<button
							disabled={!registryUrl}
							onclick={() => {
								if (registryUrl) {
									window.open(registryUrl, '_blank', 'noopener,noreferrer');
								}
							}}
							class="w-full px-8 py-2.5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 text-sm font-medium tracking-wide group disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
							style="background-color: #4A5230; color: #FFFFFF;"
						>
							<Gift class="h-4 w-4 transition-colors" style="color: #FFFFFF;" />
							<span>View Registry</span>
						</button>
					</div>
					
					<!-- 5. Actions - Calendar Buttons -->
					<div class="space-y-3">
						<button
							onclick={addToAppleCalendar}
							class="w-full px-8 py-2.5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 text-sm font-medium tracking-wide group hover:opacity-90"
							style="background-color: #4A5230; color: #FFFFFF;"
						>
							<Calendar class="h-4 w-4 transition-colors" style="color: #FFFFFF;" />
							<span>Add to Apple Calendar</span>
						</button>
						<button
							onclick={addToGoogleCalendar}
							class="w-full px-8 py-2.5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 text-sm font-medium tracking-wide group hover:opacity-90"
							style="background-color: #4A5230; color: #FFFFFF;"
						>
							<Calendar class="h-4 w-4 transition-colors" style="color: #FFFFFF;" />
							<span>Add to Google Calendar</span>
						</button>
					</div>
				</div>
			{:else}
				<!-- Form Content -->
				<div class=" backdrop-blur-sm rounded-2xl p-8">
					<form onsubmit={handleSubmit} class="space-y-6" novalidate>
						<!-- Name Input -->
						<div>
							<label for="name-input" class="text-base font-semibold mb-3 block" style="color: #4A5230;">
								Enter your first name and last name to find your family
							</label>
							<div class="flex gap-3">
								<div class="flex-1">
									<input
										id="name-input"
										type="text"
										bind:value={nameInput}
										oninput={handleNameInput}
										class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all text-base focus:ring-2"
										style="border-color: {formError ? '#d32f2f' : 'rgba(74, 82, 48, 0.3)'}; background-color: rgba(74, 82, 48, 0.05); color: #4A5230; --tw-ring-color: rgba(74, 82, 48, 0.2);"
										placeholder="Enter first name and last name (e.g., John Sm or John Smith)"
									/>
									{#if isCheckingRSVP}
										<div class="flex items-center gap-2 mt-2">
											<div class="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin" style="border-color: #4A5230;"></div>
											<p class="text-sm font-light" style="font-family: 'Inter', sans-serif; color: #4A5230; opacity: 0.8;">
												Searching for your family...
											</p>
										</div>
									{/if}
									{#if formError}
										<p class="text-sm mt-2 font-light" style="font-family: 'Inter', sans-serif; color: #d32f2f;">
											{formError}
										</p>
									{/if}
								</div>
							</div>
						</div>

						<!-- Family Members Checkboxes -->
						{#if familyFound && familyMembers.length > 0}
							<div class="space-y-4 pt-4">
								<p class="text-base font-semibold mb-4" style="color: #4A5230;">
									Select who will be attending:
								</p>
								<div class="space-y-3">
									{#each familyMembers as member}
										<label 
											class="flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all hover:opacity-80"
											style="background-color: rgba(74, 82, 48, 0.05); border: 2px solid {selectedAttendees.has(member.rowIndex) ? '#4A5230' : 'rgba(74, 82, 48, 0.2)'};"
											onclick={() => toggleAttendee(member.rowIndex)}
											onkeydown={(e) => {
												if (e.key === 'Enter' || e.key === ' ') {
													e.preventDefault();
													toggleAttendee(member.rowIndex);
												}
											}}
										>
											<!-- Custom styled checkbox -->
											<div 
												class="relative flex items-center justify-center w-5 h-5 rounded border-2 transition-all"
												style="border-color: {selectedAttendees.has(member.rowIndex) ? '#4A5230' : 'rgba(74, 82, 48, 0.4)'}; background-color: {selectedAttendees.has(member.rowIndex) ? '#4A5230' : 'transparent'};"
												role="checkbox"
												aria-checked={selectedAttendees.has(member.rowIndex)}
												tabindex="0"
												onkeydown={(e) => {
													if (e.key === 'Enter' || e.key === ' ') {
														e.preventDefault();
														toggleAttendee(member.rowIndex);
													}
												}}
											>
												{#if selectedAttendees.has(member.rowIndex)}
													<Check class="h-3.5 w-3.5" style="color: #FFFFFF; stroke-width: 3;" />
												{/if}
											</div>
											<input
												type="checkbox"
												checked={selectedAttendees.has(member.rowIndex)}
												onchange={() => toggleAttendee(member.rowIndex)}
												class="sr-only"
												tabindex="-1"
												aria-hidden="true"
											/>
											<span class="text-base font-medium flex-1" style="color: #4A5230;">
												{member.name}
											</span>
										</label>
									{/each}
								</div>
							</div>
						{/if}

					<!-- Submit Button -->
					<div class="pt-6">
						<button
							type="submit"
							class="w-full px-8 py-4 rounded-2xl transition-all duration-200 text-lg font-bold hover:opacity-90 flex items-center justify-center gap-2"
							style="background-color: #4A5230; color: #FFFFFF;"
						>
								{familyFound ? 'Submit RSVP' : 'Check RSVP'}
						</button>
					</div>
				</form>
				
				<!-- Registry Button -->
				<div class="pt-6">
					<button
						disabled={!registryUrl}
						onclick={() => {
							if (registryUrl) {
								window.open(registryUrl, '_blank', 'noopener,noreferrer');
							}
						}}
						class="w-full px-8 py-4 rounded-2xl transition-all duration-200 text-lg font-bold hover:opacity-90 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
						style="background-color: #4A5230; color: #FFFFFF; opacity: {!registryUrl ? 0.6 : 1};"
					>
						<Gift class="h-5 w-5 transition-colors" style="color: #FFFFFF;" />
						<span>View Registry</span>
					</button>
				</div>
				</div>
			{/if}
			
			<!-- Guest List Modal Overlay -->
			{#if showAllGuests}
				<div 
					class="fixed inset-0 z-50 flex items-center justify-center p-4"
					style="background-color: rgba(0, 0, 0, 0.75); backdrop-filter: blur(4px);"
					role="dialog"
					aria-modal="true"
					aria-labelledby="guest-list-title"
					tabindex="-1"
					onclick={(e) => {
						// Close if clicking the backdrop
						if (e.target === e.currentTarget) {
							showAllGuests = false;
							rsvpClickCount = 0;
							document.body.style.overflow = '';
						}
					}}
					onkeydown={(e) => {
						if (e.key === 'Escape') {
							showAllGuests = false;
							rsvpClickCount = 0;
							document.body.style.overflow = '';
						}
					}}
				>
					<div 
						class="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8"
						style="background: linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,250,248,0.98) 100%); border: 2px solid rgba(74, 82, 48, 0.3);"
					>
						<!-- Close Button -->
						<button
							onclick={() => { 
								showAllGuests = false; 
								rsvpClickCount = 0;
								document.body.style.overflow = '';
							}}
							class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
							style="color: #4A5230;"
							aria-label="Close guest list"
						>
							<X class="h-6 w-6" />
						</button>
						
						<div class="text-center mb-8">
							<h2 id="guest-list-title" class="text-4xl font-bold mb-4" style="color: #4A5230; font-family: 'Cinzel', serif;">
								Guest List
							</h2>
						</div>
						
						{#if isLoadingAllGuests}
							<div class="text-center py-8">
								<p style="color: #4A5230;">Loading guest data...</p>
							</div>
						{:else if allGuestDataWithStatus.length > 0}
							{@const groupedByFamily = allGuestDataWithStatus.reduce((acc, guest) => {
								if (!acc[guest.familyId]) {
									acc[guest.familyId] = [];
								}
								acc[guest.familyId].push(guest);
								return acc;
							}, {} as Record<string, typeof allGuestDataWithStatus>)}
							
							{@const attendingCount = allGuestDataWithStatus.filter(g => g.attending).length}
							{@const totalCount = allGuestDataWithStatus.length}
							
							<div class="mb-6 text-center">
								<p class="text-lg" style="color: #4A5230;">
									<span class="font-bold">{attendingCount}</span> attending out of <span class="font-bold">{totalCount}</span> guests
								</p>
							</div>
							
							<div class="space-y-8">
								{#each Object.entries(groupedByFamily) as [familyId, guests]}
									<div class="pb-6 border-b-2" style="border-color: rgba(74, 82, 48, 0.2);">
										<div class="space-y-2">
											{#each guests as guest}
												<div class="flex items-center justify-between py-2">
													<span class="text-lg font-medium" style="color: #4A5230;">{guest.name}</span>
													<div class="flex items-center gap-2">
														{#if guest.attending}
															<span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: #4CAF50; color: white;">
																✓ Attending
															</span>
														{:else if guest.submitted}
															<span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: #F44336; color: white;">
																✗ Not Attending
															</span>
														{:else}
															<span class="px-3 py-1 rounded-full text-sm font-semibold" style="background-color: #9E9E9E; color: white;">
																Pending
															</span>
														{/if}
													</div>
												</div>
											{/each}
										</div>
									</div>
								{/each}
							</div>
							
							<div class="mt-8 text-center">
								<button
									onclick={() => { 
										showAllGuests = false; 
										rsvpClickCount = 0;
										document.body.style.overflow = '';
									}}
									class="px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-80"
									style="background-color: #4A5230; color: white;"
								>
									Close Guest List
								</button>
							</div>
						{/if}
				</div>
				</div>
			{/if}
		</div>
	</div>
</div>
