<script lang="ts">
	interface FAQ {
		question: string;
		answer: string;
	}

	interface Props {
		faqs: FAQ[];
	}

	let { faqs }: Props = $props();
</script>

<!-- FAQ Section -->
<section class="bg-white px-4 py-20">
	<div class="mx-auto max-w-4xl">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-slate-800 sm:text-4xl lg:text-5xl">
				Frequently Asked Questions
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-slate-600">
				Get answers to common questions about our HVAC services.
			</p>
		</div>

		<div class="space-y-4">
			{#each faqs as faq}
				<div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
					<h3 class="mb-3 text-lg font-semibold text-slate-800">{faq.question}</h3>
					<p class="text-slate-600 leading-relaxed">{faq.answer}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

