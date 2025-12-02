<script lang="ts">
	import { CheckCircle } from '@lucide/svelte';

	interface Props {
		zipCode: string;
		onZipChange: (e: Event) => void;
		onGetEstimate: () => void;
	}

	let { zipCode, onZipChange, onGetEstimate }: Props = $props();
</script>

<!-- Get Estimate Section -->
<section class="bg-linear-to-br from-blue-600/10 to-blue-700/10 px-4 py-16" id="getServiceQuoteSection">
	<div class="mx-auto max-w-5xl">
		<div class="rounded-2xl bg-white p-8 shadow-2xl sm:p-12">
			<div class="text-center">
				<h2 class="mb-4 text-3xl font-bold text-slate-800 sm:text-4xl">
					Get Your Free HVAC Estimate Today
				</h2>
				<p class="mb-8 text-lg text-slate-600">
					Enter your ZIP code to get matched with qualified, licensed HVAC contractors in your area
				</p>
				
				<!-- ZIP Code Input Form -->
				<div class="mx-auto max-w-md">
					<div class="flex gap-3">
						<input
							type="text"
							placeholder="Enter ZIP code"
							class="flex-1 rounded border border-slate-300 px-4 py-3 text-slate-800 focus:border-blue-500 focus:outline-none"
							value={zipCode}
							oninput={onZipChange}
							maxlength="5"
						/>
						<button
							onclick={onGetEstimate}
							class="rounded bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
						>
							Get Estimate
						</button>
					</div>
				</div>
				
				<div class="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
					<div class="flex items-center gap-2">
						<CheckCircle class="h-4 w-4 text-green-500" />
						<span>No obligation</span>
					</div>
					<div class="flex items-center gap-2">
						<CheckCircle class="h-4 w-4 text-green-500" />
						<span>Free quotes</span>
					</div>
					<div class="flex items-center gap-2">
						<CheckCircle class="h-4 w-4 text-green-500" />
						<span>Local contractors</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

