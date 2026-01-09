<script lang="ts">
	import { Plus, X, Copy, Check, Calendar } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let names = $state(['']);
	let submitted = $state(false);
	let showReserveBelow = $state(false);
	let addressCopied = $state(false);
	let submittedNames = $state<string[]>([]);
	
	// Event details
	const eventDate = '2025-07-05';
	const eventTime = '15:00';
	const eventTitle = 'Wedding Celebration';
	const eventLocation = '29200 SE Larch Mountain Road, Corbett, Oregon 97019';
	const fullAddress = '29200 SE Larch Mountain Road\nCorbett, Oregon 97019\nColumbia Gorge';
	
	// Google Apps Script URL for form submissions
	const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw-B5eHWQ-hT0ev2l69i_B1dBmr_j7CQl72qaBB5g3UwhVgdhlnF-W-epSf2WkZqcPNJA/exec';

	onMount(() => {
		// Trigger fade-in animation after component mounts
		setTimeout(() => {
			showReserveBelow = true;
		}, 100);
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

<div class="min-h-screen bg-linear-to-br from-rose-50 via-pink-50 to-rose-100">
	<img src="/text.jpeg" alt="" class="w-full md:w-3/4 mx-auto h-auto object-cover" />
	<div class="py-12">
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Header - Shows "Reserve Below" or "Thank you!" -->
			<div class="mb-8 text-center">
				{#if submitted}
					<h2 
						class="text-5xl italic font-normal text-white transition-opacity duration-1000 ease-in"
						style="font-family: 'Dancing Script', 'Brush Script MT', 'Lucida Handwriting', cursive; font-weight: 400; text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);"
					>
						You're all set ✨
					</h2>
				{:else}
					<h2 
						class="text-5xl italic font-normal text-white transition-opacity duration-1000 ease-in"
						style="font-family: 'Dancing Script', 'Brush Script MT', 'Lucida Handwriting', cursive; font-weight: 400; opacity: {showReserveBelow ? 1 : 0}; text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);"
					>
						Reserve Below
					</h2>
				{/if}
			</div>

			{#if submitted}
				<!-- Thank You Message - Premium Design -->
				<div class="max-w-lg mx-auto px-4">
					<!-- 1. Confirmation Message -->
					<div class="mb-20 text-center">
						{#if submittedNames.length > 0}
							<p class="text-xl text-gray-800 font-light tracking-wide leading-relaxed">
								{#if submittedNames.length === 1}
									Thank you, {submittedNames[0]}! We can't wait to celebrate with you.
								{:else if submittedNames.length === 2}
									Thank you, {submittedNames[0]} and {submittedNames[1]}! We can't wait to celebrate with you.
								{:else}
									Thank you, {submittedNames.slice(0, -1).join(', ')}, and {submittedNames[submittedNames.length - 1]}! We can't wait to celebrate with you.
								{/if}
							</p>
						{:else}
							<p class="text-xl text-gray-800 font-light tracking-wide leading-relaxed">
								We can't wait to celebrate with you.
							</p>
						{/if}
					</div>
					
					<!-- 2. Event Details - Date/Time -->
					<div class="mb-16 text-center">
						<p class="text-lg text-gray-800 font-normal tracking-wide">
							Saturday, July 5 <span class="mx-2 text-gray-300">·</span> 3:00 PM
						</p>
					</div>
					
					<!-- 3. Location - Premium Typography -->
					<div class="mb-20">
						<button
							onclick={copyAddress}
							class="text-left w-full cursor-pointer group transition-opacity hover:opacity-70"
						>
							<div class="space-y-3">
								<p class="text-xl text-gray-900 font-medium tracking-tight">
									Cape Horn Estate
								</p>
								<div class="space-y-1 text-gray-700 font-light tracking-wide leading-relaxed">
									<p class="text-base">29200 SE Larch Mountain Rd</p>
									<p class="text-base">Corbett, OR 97019</p>
									<p class="text-sm text-gray-500 mt-3 font-normal">Columbia Gorge</p>
								</div>
							</div>
						</button>
						
						{#if addressCopied}
							<p class="text-xs text-gray-500 font-normal mt-5 tracking-wide">Address copied to clipboard</p>
						{/if}
					</div>
					
					<!-- 4. Actions - Premium Buttons -->
					<div class="space-y-3">
						<button
							onclick={addToGoogleCalendar}
							class="w-full px-8 py-3.5 bg-white border border-gray-200/50 text-gray-900 rounded-full hover:bg-gray-50/80 hover:border-gray-300/50 transition-all duration-200 flex items-center justify-center gap-3 text-sm font-normal tracking-wide group"
						>
							<Calendar class="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
							<span>Add to Google Calendar</span>
						</button>
						<button
							onclick={addToAppleCalendar}
							class="w-full px-8 py-3.5 bg-white border border-gray-200/50 text-gray-900 rounded-full hover:bg-gray-50/80 hover:border-gray-300/50 transition-all duration-200 flex items-center justify-center gap-3 text-sm font-normal tracking-wide group"
						>
							<Calendar class="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
							<span>Add to Apple Calendar</span>
						</button>
					</div>
				</div>
			{:else}
				<!-- Form Content -->
				<div class=" backdrop-blur-sm rounded-2xl p-8">
					<form onsubmit={handleSubmit} class="space-y-6">
					{#each names as name, index}
						<div>
							<label for="name-{index}" class="text-base font-semibold text-gray-800 mb-3 block">
								 {#if index === 0}<span class="text-gray-600"></span>{/if}
							</label>
							<div class="flex gap-3">
								<input
									id="name-{index}"
									type="text"
									bind:value={names[index]}
									required={index === 0}
									class="flex-1 px-4 py-3 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-base bg-white/90 backdrop-blur-sm transition-all text-gray-800"
									placeholder="Enter full name"
								/>
								{#if names.length > 1}
									<button
										type="button"
										onclick={() => removePerson(index)}
										class="px-4 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/30 text-gray-800 rounded-xl hover:bg-white transition-all"
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
						class="w-full px-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-white/30 text-gray-800 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 text-base font-semibold hover:scale-105"
					>
						<Plus class="h-5 w-5" />
						Add Additional Person
					</button>

					<!-- Submit Button -->
					<div class="pt-6">
						<button
							type="submit"
							class="w-full px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-white/30 text-gray-800 rounded-xl hover:bg-white transition-all text-lg font-bold hover:scale-105 flex items-center justify-center gap-2"
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
