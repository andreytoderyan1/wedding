<script lang="ts">
	import { Plus, X, Copy, Check, Calendar, Gift } from '@lucide/svelte';

	let names = $state(['']);
	let submitted = $state(false);
	let addressCopied = $state(false);
	let submittedNames = $state<string[]>([]);
	let formErrors = $state<Record<number, string>>({});
	
	// Event details
	const eventDate = '2025-07-05';
	const eventTime = '15:00';
	const eventTitle = 'Wedding Celebration';
	const eventLocation = '29200 SE Larch Mountain Road, Corbett, Oregon 97019';
	const fullAddress = '29200 SE Larch Mountain Road\nCorbett, Oregon 97019\nColumbia Gorge';
	
	// Registry URL
	const registryUrl = 'https://www.myregistry.com/wedding-registry/vita-vakulchik-and-andrey-toderyan-milwaukie-or/5051584';
	
	// Google Apps Script URL for form submissions
	const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw-B5eHWQ-hT0ev2l69i_B1dBmr_j7CQl72qaBB5g3UwhVgdhlnF-W-epSf2WkZqcPNJA/exec';

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

	const addPerson = () => {
		names = [...names, ''];
	};

	const removePerson = (index: number) => {
		if (names.length > 1) {
			names = names.filter((_, i) => i !== index);
		}
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		
		// Filter out empty strings and trim whitespace
		const validNames = names.filter(name => name.trim() !== '');
		
		// Don't submit if no valid names
		if (validNames.length === 0) {
			return;
		}
		
		const formData = {
			names: validNames
		};
		
		// Store submitted names for personalization
		submittedNames = formData.names.map(name => {
			// Extract first name (everything before first space)
			const firstName = name.trim().split(' ')[0];
			return firstName;
		});
		
		// Show thank you message immediately
		submitted = true;
		
		// Check for "bruh" in any name (case-insensitive) - don't submit to Google Sheets if found
		const hasBruh = validNames.some(name => name.toLowerCase().includes('bruh'));
		if (hasBruh) {
			// Skip submission to Google Sheets, but still show thank you message
			return;
		}
		
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
				<span style="font-size: clamp(14px, 2vw, 18px); letter-spacing: 0.18em;">VITA & ANDREY</span>
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
								<p class="text-base">29200 SE Larch Mountain Rd</p>
								<p class="text-base">Corbett, OR 97019</p>
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
					{#each names as name, index}
						<div>
							<label for="name-{index}" class="text-base font-semibold mb-3 block" style="color: #4A5230;">
								 {#if index === 0}<span style="color: #4A5230; opacity: 0.6;"></span>{/if}
							</label>
							<div class="flex gap-3">
								<div class="flex-1">
									<input
										id="name-{index}"
										type="text"
										bind:value={names[index]}
										onblur={() => {
											if (index === 0 && !names[index].trim()) {
												formErrors[index] = 'Please enter your name';
											} else {
												delete formErrors[index];
											}
										}}
										oninput={() => {
											if (formErrors[index]) {
												delete formErrors[index];
											}
										}}
										class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all text-base focus:ring-2"
										style="border-color: {formErrors[index] ? '#4A5230' : 'rgba(74, 82, 48, 0.3)'}; background-color: rgba(74, 82, 48, 0.05); color: #4A5230; --tw-ring-color: rgba(74, 82, 48, 0.2);"
										placeholder="Enter full name"
									/>
									{#if formErrors[index]}
										<p class="text-sm mt-2 font-light" style="font-family: 'Inter', sans-serif; color: #4A5230; opacity: 0.8;">
											{formErrors[index]}
										</p>
									{/if}
								</div>
								{#if names.length > 1}
									<button
										type="button"
										onclick={() => removePerson(index)}
										class="px-4 py-3 border-2 rounded-xl transition-all hover:opacity-80"
										style="background-color: rgba(74, 82, 48, 0.1); border-color: rgba(74, 82, 48, 0.3); color: #4A5230;"
									>
										<X class="h-5 w-5" style="color: #4A5230;" />
									</button>
								{/if}
							</div>
						</div>
					{/each}

					<!-- Add Person Button -->
					<button
						type="button"
						onclick={addPerson}
						class="w-full px-6 py-3 border-2 rounded-xl transition-all flex items-center justify-center gap-2 text-base font-semibold hover:opacity-80"
						style="background-color: rgba(74, 82, 48, 0.1); border-color: rgba(74, 82, 48, 0.3); color: #4A5230;"
					>
						<Plus class="h-5 w-5" style="color: #4A5230;" />
						Add Additional Person
					</button>

					<!-- Submit Button -->
					<div class="pt-6">
						<button
							type="submit"
							class="w-full px-8 py-4 rounded-2xl transition-all duration-200 text-lg font-bold hover:opacity-90 flex items-center justify-center gap-2"
							style="background-color: #4A5230; color: #FFFFFF;"
						>
							Submit RSVP
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
						class="w-full px-8 py-4 rounded-2xl transition-all duration-200 text-lg font-bold hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						style="background-color: #4A5230; color: #FFFFFF;"
					>
						<Gift class="h-5 w-5 transition-colors" style="color: #FFFFFF;" />
						<span>View Registry</span>
					</button>
				</div>
				</div>
			{/if}
		</div>
	</div>
</div>
