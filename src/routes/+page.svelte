<script lang="ts">
	import { Plus, X, Heart, Sparkles } from '@lucide/svelte';

	let names = $state(['']);
	let submitted = $state(false);
	let submitting = $state(false);
	
	// Replace this with your Google Apps Script URL after setup
	const GOOGLE_SCRIPT_URL = ''; // e.g., 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'

	const addPerson = () => {
		names = [...names, ''];
	};

	const removePerson = (index: number) => {
		if (names.length > 1) {
			names = names.filter((_, i) => i !== index);
		}
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		submitting = true;
		
		const formData = {
			names: names.filter(name => name.trim() !== '')
		};
		
		try {
			if (GOOGLE_SCRIPT_URL) {
				// Option 1: Submit to Google Apps Script
				const response = await fetch(GOOGLE_SCRIPT_URL, {
					method: 'POST',
					mode: 'no-cors', // Required for Google Apps Script
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData)
				});
			} else {
				// Option 2: Submit to SvelteKit API route
				const response = await fetch('/api/submit-rsvp', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData)
				});
				
				if (!response.ok) {
					throw new Error('Failed to submit RSVP');
				}
			}
			
			submitted = true;
		} catch (error) {
			console.error('Error submitting RSVP:', error);
			alert('There was an error submitting your RSVP. Please try again.');
		} finally {
			submitting = false;
		}
	};
</script>

<div class="min-h-screen bg-linear-to-br from-rose-50 via-pink-50 to-rose-100">
	<img src="/text.jpeg" alt="" class="w-full md:w-3/4 mx-auto h-auto object-cover" />
	<div class="py-12">
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Form Header -->
			<div class="mb-8 text-center">
				<h2 class="text-5xl italic font-normal text-white" style="font-family: 'Dancing Script', 'Brush Script MT', 'Lucida Handwriting', cursive; font-weight: 400;">
					Reserve Below
				</h2>
			</div>

			{#if submitted}
				<!-- Thank You Message -->
				<div class="backdrop-blur-sm rounded-2xl p-12 text-center space-y-8">
					<!-- Decorative Hearts -->
					<div class="flex items-center justify-center gap-4 mb-4">
						<Heart class="h-8 w-8 text-white fill-white opacity-80" />
						<Sparkles class="h-6 w-6 text-white opacity-60" />
						<Heart class="h-8 w-8 text-white fill-white opacity-80" />
					</div>
					
					<!-- Thank You Title -->
					<h3 class="text-6xl italic font-normal text-white mb-8" style="font-family: 'Dancing Script', 'Brush Script MT', 'Lucida Handwriting', cursive; font-weight: 400;">
						Thank you!
					</h3>
					
					<!-- Event Details -->
					<div class="space-y-4">
						<p class="text-2xl text-gray-800 font-semibold leading-relaxed">
							We can't wait to celebrate with you!
						</p>
						<div class="pt-6 border-t-2 border-white/20">
							<p class="text-xl text-gray-700 font-medium leading-relaxed mb-2">
								<span class="font-bold">July 5th</span> at <span class="font-bold">3pm</span>
							</p>
							<p class="text-lg text-gray-600 leading-relaxed">
								Cape Horn Estate<br />
								Columbia Gorge
							</p>
						</div>
					</div>
					
					<!-- Bottom Decorative Hearts -->
					<div class="flex items-center justify-center gap-4 mt-8">
						<Heart class="h-6 w-6 text-white fill-white opacity-60" />
						<Sparkles class="h-5 w-5 text-white opacity-50" />
						<Heart class="h-6 w-6 text-white fill-white opacity-60" />
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
							disabled={submitting}
							class="w-full px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-white/30 text-gray-800 rounded-xl hover:bg-white transition-all text-lg font-bold hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{submitting ? 'Submitting...' : 'Submit RSVP'}
						</button>
					</div>
				</form>
				</div>
			{/if}
		</div>
	</div>
</div>
