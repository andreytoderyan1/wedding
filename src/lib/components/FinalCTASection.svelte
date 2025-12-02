<script lang="ts">
	interface Props {
		scrollToSection: (selector: string, offset?: number) => void;
	}

	let { scrollToSection }: Props = $props();
</script>

<!-- Final CTA Section -->
<section class="bg-linear-to-r from-blue-600 to-blue-700 px-4 py-20 text-white">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
			Ready to Improve Your Home Comfort?
		</h2>
		<p class="mb-8 text-xl text-blue-100">
			Get a free estimate from qualified HVAC contractors in your area today.
		</p>
		<button
			onclick={() => scrollToSection("#getServiceQuoteSection", 100)}
			class="rounded-lg bg-white px-10 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:bg-gray-100 hover:scale-105"
		>
			Get Your Free Estimate Now
		</button>
	</div>
</section>

