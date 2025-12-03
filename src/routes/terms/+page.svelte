<script lang="ts">
	import { onMount } from "svelte";
	import Navigation from '$lib/components/Navigaton.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	export let link = "";
	export let title = "";

	function removeSubdomain(domain: string) {
		const parts = domain.split('.');
		if (parts.length > 2) {
			return parts.slice(-2).join('.');
		}
		return domain;
	}

	function formatBrandName(domain: string) {
		const brandName = domain.split('.')[0];
		return brandName.charAt(0).toUpperCase() + brandName.slice(1);
	}

	onMount(() => {
		const currentDomain = window.location.hostname || 'example.com';
		console.log('Original hostname:', currentDomain);
		title = formatBrandName(currentDomain)
		link = removeSubdomain(currentDomain)
	})
</script>

<div class="min-h-screen bg-white">
	<Navigation />

	<section class="py-12 sm:py-16 lg:py-20">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="prose prose-lg max-w-none">
				<h1 class="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Terms of Service</h1>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					PLEASE READ! "{link}.com" REQUIRES CONSIDERATION FOR AND AS A CONDITION OF ALLOWING YOU ACCESS.
				</p>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					READING AND ACCEPTING THE TERMS OF USE AND READING AND ACCEPTING THE PROVISIONS OF THE PRIVACY POLICY OF "{link}.com" ARE REQUIRED CONSIDERATIONS FOR "{link}.com" GRANTING YOU THE RIGHT TO VISIT, READ OR INTERACT WITH IT.
				</p>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					ALL PERSONS ARE DENIED ACCESS TO THIS SITE UNLESS THEY READ AND ACCEPT THE TERMS OF USE AND THE PRIVACY POLICY.
				</p>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					BY VIEWING, VISITING, USING, OR INTERACTING WITH "{link}.com" OR WITH ANY BANNER, POP-UP, OR ADVERTISING THAT APPEARS ON IT, YOU ARE AGREEING TO ALL THE PROVISIONS OF THIS TERMS OF USE POLICY AND THE PRIVACY POLICY OF "{link}.com".
				</p>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					ALL PERSONS UNDER THE AGE OF 18 ARE DENIED ACCESS TO "{link}.com". IF YOU ARE UNDER 18 YEARS OF AGE, IT IS UNLAWFUL FOR YOU TO VISIT, READ, OR INTERACT WITH "{link}.com" OR ITS CONTENTS IN ANY MANNER. "{link}.com" SPECIFICALLY DENIES ACCESS TO ANY INDIVIDUAL THAT IS COVERED BY THE CHILD ONLINE PRIVACY ACT (COPA) OF 1998.
				</p>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					"{link}.com" RESERVES THE RIGHT TO DENY ACCESS TO ANY PERSON OR VIEWER FOR ANY REASON. UNDER THE TERMS OF THE PRIVACY POLICY, WHICH YOU ACCEPT AS A CONDITION FOR VIEWING, "{link}.com" IS ALLOWED TO COLLECT AND STORE DATA AND INFORMATION FOR THE PURPOSE OF EXCLUSION AND FOR MANY OTHER USES.
				</p>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					THE TERMS OF USE AGREEMENT MAY CHANGE FROM TIME TO TIME. VISITORS HAVE AN AFFIRMATIVE DUTY, AS PART OF THE CONSIDERATION FOR PERMISSION TO VIEW "{link}.com", TO KEEP THEMSELVES INFORMED OF CHANGES.
				</p>
    
				<h2 class="mt-8 mb-4 text-2xl font-semibold text-gray-900">Parties to the Terms of Use Agreement</h2>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					Visitors, viewers, users, subscribers, members, affiliates, or customers, collectively referred to herein as "Visitors," are parties to this agreement. The website and its owners and/or operators are parties to this agreement, herein referred to as "Website."
				</p>
    
				<h2 class="mt-8 mb-4 text-2xl font-semibold text-gray-900">Use of Information From This Website</h2>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					Unless you have entered into an express written contract with this website to the contrary, visitors, viewers, subscribers, members, affiliates, or customers have no right to use this information in a commercial or public setting; they have no right to broadcast it, copy it, save it, print it, sell it, or publish any portions of the content of this website. By viewing the contents of this website you agree this condition of viewing and you acknowledge that any unauthorized use is unlawful and may subject you to civil or criminal penalties. Again, Visitor has no rights whatsoever to use the content of, or portions thereof, including its databases, invisible pages, linked pages, underlying code, or other intellectual property the site may contain, for any reason for any use whatsoever. Nothing. Visitor agrees to liquidated damages in the amount of U.S.$100,000 in addition to costs and actual damages for breach of this provision. Visitor warrants that he or she understands that accepting this provision is a condition of viewing and that viewing constitutes acceptance.
				</p>
    
				<h2 class="mt-8 mb-4 text-2xl font-semibold text-gray-900">Ownership of Website or Right to Use, Sell, Publish Contents of This Website</h2>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					The website and its contents are owned or licensed by the website. Material contained on the website must be presumed to be proprietary and copyrighted. Visitors have no rights whatsoever in the site content. Use of website content for any reason is unlawful unless it is done with express contract or permission of the website.
				</p>
    
				<h2 class="mt-8 mb-4 text-2xl font-semibold text-gray-900">Hyperlinking to Site, Co-Branding, "Framing" and Referencing Site Prohibited</h2>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					Unless expressly authorized by website, no one may hyperlink this site, or portions thereof, (including, but not limited to, logotypes, trademarks, branding or copyrighted material) to theirs for any reason. Further, you are not allowed to reference the url (website address) of this website in any commercial or non-commercial media without express permission, nor are you allowed to 'frame' the site. You specifically agree to cooperate with the Website to remove or de-activate any such activities and be liable for all damages. You hereby agree to liquidated damages of US $100,000.00 plus costs and actual damages for violating this provision.
				</p>

				<h2 class="mt-8 mb-4 text-2xl font-semibold text-gray-900">Contact Information</h2>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					"{link}.com"
				</p>
				<p class="mb-6 text-base leading-relaxed text-gray-700">
					Email: support@"{link}.com"
				</p>
			</div>
		</div>
	</section>

	<Footer />
</div>
