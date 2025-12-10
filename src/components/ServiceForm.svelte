<script lang="ts">
	import { goto } from '$app/navigation';
	import { ChevronDown, Search } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let zipCode: string = $state('');
	let selectedService: string = $state('');
	let selectedServiceType: string = $state('');
	let isDropdownOpen: boolean = $state(false);

	const { serviceType, limit } = $props<{ serviceType: any[], limit?: number }>();

	// Limit services if limit is provided
	const displayServices = $derived(limit ? serviceType.slice(0, limit) : serviceType);

	let utmData = $state({
		utm_source: 'cma-powerfoxmedia',
		utm_medium: '',
		utm_campaign: '',
		utm_subid: ''
	});

	const handleZipChange = (e: Event) => {
		zipCode = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 5);
	};

	const selectService = (service: { label: string; serviceType: string }) => {
		selectedService = service.label;
		selectedServiceType = service.serviceType;
		isDropdownOpen = false;
	};

	const toggleDropdown = () => {
		isDropdownOpen = !isDropdownOpen;
	};

	const searchDeals = async () => {
		if (!zipCode.trim()) {
			alert('Please enter a ZIP code');
			return;
		}
		if (zipCode.length !== 5) {
			alert('Please enter a valid 5-digit ZIP code');
			return;
		}
		if (!selectedService) {
			alert('Please select a service type');
			return;
		}

		window.open('https://www.thumbtack.com/k/hvac-contractors/near-me', '_blank');
	};

	// Close dropdown when clicking outside
	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (!target.closest('.dropdown-container')) {
			isDropdownOpen = false;
		}
	};

	onMount(() => {
		document.addEventListener('click', handleClickOutside);

		// Get UTM parameters from URL
		const queryParams = new URLSearchParams(window.location.search);
		const utmSource = queryParams.get('utm_source');
		const utmMedium = queryParams.get('utm_medium');
		const utmCampaign = queryParams.get('utm_campaign');
		const utmSubid = queryParams.get('clickId') || queryParams.get('utm_subid');
		// Process UTM source
		if (utmSource && utmSource.length > 0 && !utmSource.includes("-")) {
			utmData.utm_source = `cma-${utmSource}`;
		} else if (utmSource) {
			utmData.utm_source = utmSource;
		}
		if (utmMedium) {
			utmData.utm_medium = utmMedium;
		}
		if (utmCampaign) {
			utmData.utm_campaign = utmCampaign;
		}
		if (utmSubid) {
			utmData.utm_subid = utmSubid;
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<section>
	<div class="space-y-4 sm:space-y-5">
		<!-- Service Dropdown -->
		<div class="dropdown-container relative">
			<!-- svelte-ignore a11y_label_has_associated_control -->
			<label class="mb-2 block text-left text-sm font-bold text-gray-900 sm:mb-3 sm:text-base">
				Select Service Type:
			</label>
			<button
				type="button"
				onclick={toggleDropdown}
				class="flex w-full items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-left text-base font-medium text-gray-900 shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:px-5 sm:py-4 {isDropdownOpen
					? 'border-primary ring-2 ring-primary/20'
					: ''}"
			>
				<span
					class={selectedService ? 'text-gray-900' : 'text-gray-400'}
				>
					{selectedService || 'Choose a service type...'}
				</span>
				<ChevronDown
					class="h-5 w-5 text-gray-400 transition-transform duration-200 sm:h-6 sm:w-6 {isDropdownOpen
						? 'rotate-180 text-black'
						: ''}"
				/>
			</button>

			{#if isDropdownOpen}
				<div
					class="absolute z-50 mt-2 w-full rounded-xl border-2 border-gray-200 bg-white shadow-2xl"
				>
					<div class="max-h-48 overflow-auto rounded-xl sm:max-h-60">
						{#each displayServices as service}
							<button
								type="button"
								class="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none sm:px-5 sm:py-3.5 sm:text-base first:rounded-t-xl last:rounded-b-xl"
								onclick={() => selectService(service)}
							>
								{service.label}
							</button>
						{/each}
					</div>
				</div>
			{/if}
		</div>
		<!-- ZIP Input with Search Button -->
		<div class="flex flex-col gap-3 sm:flex-row">
			<div class="flex-1">
				<input
					type="text"
					placeholder="Enter your ZIP code"
					class="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-base font-medium text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:px-5 sm:py-4"
					value={zipCode}
					oninput={handleZipChange}
					maxlength="5"
				/>
			</div>
		
			<button
				onclick={searchDeals}
				class="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:px-8 sm:py-4"
			>
				<Search class="h-5 w-5 sm:h-6 sm:w-6" />
				<span class="text-base sm:text-lg">Search</span>
			</button>
		</div>
	</div>
</section>

