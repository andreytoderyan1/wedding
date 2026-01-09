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
		
		// Check for "bruh" in any name (case-insensitive) - don't submit if found
		const hasBruh = names.some(name => name.toLowerCase().includes('bruh'));
		if (hasBruh) {
			// Silently return without submitting
			return;
		}
		
		const formData = {
			names: names.filter(name => name.trim() !== '')
		};
		
		// Store submitted names for personalization
		submittedNames = formData.names.map(name => {
			// Extract first name (everything before first space)
			const firstName = name.trim().split(' ')[0];
			return firstName;
		});
		
		// Show thank you message immediately
		submitted = true;
		
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

<div class="min-h-screen" style="background-color: #1F2419;">
	<img src="/text.jpeg" alt="" class="w-full md:w-3/4 mx-auto h-auto object-cover" />
	<div class="py-18">
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Header - Shows "Reserve Below" or "Thank you!" -->
			<div class="mb-6 text-center">
				{#if submitted}
					<h2 
						class="text-5xl italic font-normal text-white transition-opacity duration-1000 ease-in"
						style="font-family: 'Playfair Display', serif; font-weight: 400; letter-spacing: -0.02em;"
					>
						You're all set
					</h2>
				{:else}
					<h2 
						class="text-3xl font-normal text-white"
						style="font-family: 'Playfair Display', serif; font-weight: 300; letter-spacing: 0.15em;"
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
							<p class="text-xl text-white font-light tracking-wide leading-relaxed" style="font-family: 'Inter', sans-serif;">
								{#if submittedNames.length === 1}
									Thank you, {submittedNames[0]}! We can't wait to celebrate with you.
								{:else if submittedNames.length === 2}
									Thank you, {submittedNames[0]} and {submittedNames[1]}! We can't wait to celebrate with you.
								{:else}
									Thank you, {submittedNames.slice(0, -1).join(', ')}, and {submittedNames[submittedNames.length - 1]}! We can't wait to celebrate with you.
								{/if}
							</p>
						{:else}
							<p class="text-xl text-white font-light tracking-wide leading-relaxed" style="font-family: 'Inter', sans-serif;">
								We can't wait to celebrate with you.
							</p>
						{/if}
					</div>
					
					<!-- 2. Event Details - Date/Time -->
					<div class="mb-10">
						<p class="text-lg text-white font-normal tracking-wide" style="font-family: 'Inter', sans-serif;">
							Sunday <span class="mx-2 text-white/60">·</span> July 5 <span class="mx-2 text-white/60">·</span> 3:00 PM
						</p>
					</div>
					
					<!-- 3. Location - Premium Typography -->
					<div class="mb-12">
						<button
							onclick={copyAddress}
							class="text-left w-full cursor-pointer group transition-opacity hover:opacity-70"
						>
							<div class="space-y-3">
								<p class="text-xl text-white font-medium tracking-tight" style="font-family: 'Playfair Display', serif; font-weight: 500;">
									Cape Horn Estate
								</p>
								<div class="space-y-1 text-white/90 font-light tracking-wide leading-relaxed" style="font-family: 'Inter', sans-serif;">
									<p class="text-base">29200 SE Larch Mountain Rd</p>
									<p class="text-base">Corbett, OR 97019</p>
									<p class="text-sm text-white/70 mt-3 font-normal">Columbia Gorge</p>
								</div>
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
							class="w-full px-8 py-2.5 bg-white text-black rounded-2xl hover:bg-white/90 transition-all duration-200 flex items-center justify-center gap-3 text-sm font-medium tracking-wide group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
						>
							<Gift class="h-4 w-4 text-black/90 group-hover:text-black transition-colors" />
							<span>View Registry</span>
						</button>
					</div>
					
					<!-- 5. Actions - Calendar Buttons -->
					<div class="space-y-3">
						<button
							onclick={addToGoogleCalendar}
							class="w-full px-8 py-2.5 bg-white text-black rounded-2xl hover:bg-white/90 transition-all duration-200 flex items-center justify-center gap-3 text-sm font-medium tracking-wide group"
						>
							<Calendar class="h-4 w-4 text-black/90 group-hover:text-black transition-colors" />
							<span>Add to Google Calendar</span>
						</button>
						<button
							onclick={addToAppleCalendar}
							class="w-full px-8 py-2.5 bg-white text-black rounded-2xl hover:bg-white/90 transition-all duration-200 flex items-center justify-center gap-3 text-sm font-medium tracking-wide group"
						>
							<Calendar class="h-4 w-4 text-black/90 group-hover:text-black transition-colors" />
							<span>Add to Apple Calendar</span>
						</button>
					</div>
				</div>
			{:else}
				<!-- Form Content -->
				<div class=" backdrop-blur-sm rounded-2xl p-8">
					<form onsubmit={handleSubmit} class="space-y-6" novalidate>
					{#each names as name, index}
						<div>
							<label for="name-{index}" class="text-base font-semibold text-white mb-3 block">
								 {#if index === 0}<span class="text-white/60"></span>{/if}
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
										class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-base bg-white/10 backdrop-blur-sm transition-all text-white placeholder-white/60 {formErrors[index] ? 'border-white/60' : 'border-white/30'}"
										placeholder="Enter full name"
									/>
									{#if formErrors[index]}
										<p class="text-sm text-white/80 mt-2 font-light" style="font-family: 'Inter', sans-serif;">
											{formErrors[index]}
										</p>
									{/if}
								</div>
								{#if names.length > 1}
									<button
										type="button"
										onclick={() => removePerson(index)}
										class="px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl hover:bg-white/20 transition-all"
									>
										<X class="h-5 w-5" />
									</button>
								{/if}
							</div>
						</div>
					{/each}

					<!-- Add Person Button -->
					<button
						type="button"
						onclick={addPerson}
						class="w-full px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-base font-semibold hover:scale-105"
					>
						<Plus class="h-5 w-5" />
						Add Additional Person
					</button>

					<!-- Submit Button -->
					<div class="pt-6">
						<button
							type="submit"
							class="w-full px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl hover:bg-white/20 transition-all text-lg font-bold hover:scale-105 flex items-center justify-center gap-2"
						>
							Submit RSVP
						</button>
					</div>
				</form>
				</div>
			{/if}
		</div>
	</div>
</div>
