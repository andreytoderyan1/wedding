<script lang="ts">
	import { goto } from '$app/navigation';
	import { Shield, Clock, Star, CheckCircle, Thermometer, Users, Award, Zap } from '@lucide/svelte';
	import Navigation from './components/Navigaton.svelte';
	import HeroSection from './components/HeroSection.svelte';
	import GetEstimateSection from './components/GetEstimateSection.svelte';
	import ServicesSection from './components/ServicesSection.svelte';
	import StatsSection from './components/StatsSection.svelte';
	import BenefitsSection from './components/BenefitsSection.svelte';
	import ProcessSection from './components/ProcessSection.svelte';
	import TestimonialsSection from './components/TestimonialsSection.svelte';
	import FAQSection from './components/FAQSection.svelte';
	import FinalCTASection from './components/FinalCTASection.svelte';
	import { onMount } from 'svelte';

	let zipCode: string = $state('');
	let utmData = $state({
		utm_source: 'cma-powerfoxmedia',
		utm_medium: '',
		utm_campaign: '',
		utm_subid: ''
	});

	const scrollToSection = (selector: string, offset: number = 80) => {
		const el = document.querySelector(selector);
		if (!el) return;
		const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
		window.scrollTo({ top, behavior: 'smooth' });
	};

	const handleZipChange = (e: Event) => {
		zipCode = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 5);
	};

	const getFreeEstimate = () => {
		if (!zipCode.trim()) {
			alert('Please enter a ZIP code');
			return;
		}

		if (zipCode.length !== 5) {
			alert('Please enter a valid 5-digit ZIP code');
			return;
		}

		const params = new URLSearchParams();
		params.set('zipCode', zipCode.trim());
		params.set('utm_source', utmData.utm_source);
		params.set('utm_medium', utmData.utm_medium);
		params.set('utm_campaign', utmData.utm_campaign);
		params.set('utm_subid', utmData.utm_subid);
		goto(`/services?${params.toString()}`);
	};

	onMount(() => {
		// Get UTM parameters from URL
		const queryParams = new URLSearchParams(window.location.search);
		const utmSource = queryParams.get('utm_source');
		const utmMedium = queryParams.get('utm_medium');
		const utmCampaign = queryParams.get('utm_campaign');
		const utmSubid = queryParams.get('clickId') || queryParams.get('utm_subid');
		if (utmSource) {
			utmData.utm_source = utmSource;
		}
		if (utmMedium) {
			utmData.utm_medium = utmMedium;
		}
		if (utmCampaign) {
			utmData.utm_campaign = utmCampaign;
		}
	});

	const hvacServices = [
		{
			title: 'AC Installation & Repair',
			description: 'Professional air conditioning installation, repair, and maintenance',
			features: ['New AC Units', 'Emergency Repairs', 'System Upgrades', 'Maintenance Plans'],
			icon: Thermometer,
			image: '/hvac-ac-unit.jpg'
		},
		{
			title: 'Heating Systems',
			description: 'Furnace repair, heat pump service, and heating system installation',
			features: ['Furnace Repair', 'Heat Pump Service', 'Boiler Maintenance', 'Thermostat Install'],
			icon: Shield,
			image: '/hvac-heating.jpg'
		},
		{
			title: 'Indoor Air Quality',
			description: "Improve your home's air quality with professional ventilation solutions",
			features: ['Air Purifiers', 'Humidity Control', 'Duct Cleaning', 'Filter Replacement'],
			icon: Zap,
			image: '/hvac-air-quality.jpg'
		},
		{
			title: 'Preventive Maintenance',
			description: 'Regular maintenance to keep your HVAC system running efficiently',
			features: ['Seasonal Tune-ups', 'Filter Changes', 'System Inspection', 'Performance Testing'],
			icon: Clock,
			image: '/hvac-maintenance.jpg'
		}
	];

	const benefits = [
		{
			title: '24/7 Emergency Service',
			description: 'Round-the-clock availability for urgent HVAC issues',
			icon: Clock
		},
		{
			title: 'Licensed & Certified',
			description: 'All technicians are fully licensed and certified professionals',
			icon: Award
		},
		{
			title: 'Energy Efficient Solutions',
			description: 'Save money with energy-efficient HVAC systems',
			icon: Zap
		},
		{
			title: 'Comprehensive Warranties',
			description: 'Peace of mind with extensive warranty coverage',
			icon: Shield
		},
		{
			title: 'Free Estimates',
			description: 'No-obligation quotes for all services',
			icon: CheckCircle
		},
		{
			title: 'Same-Day Service',
			description: 'Fast response times for your convenience',
			icon: Clock
		}
	];

	const testimonials = [
		{
			name: 'Sarah Johnson',
			location: 'Downtown',
			rating: 5,
			text: 'Amazing service! They fixed our AC on a Sunday when it was 95 degrees. Professional, fast, and reasonably priced.',
			service: 'AC Repair',
			image: '/testimonial-1.jpg'
		},
		{
			name: 'Mike Chen',
			location: 'Westside',
			rating: 5,
			text: 'Installed a new HVAC system for our home. The team was knowledgeable and the installation was flawless.',
			service: 'HVAC Installation',
			image: '/testimonial-2.jpg'
		},
		{
			name: 'Lisa Rodriguez',
			location: 'Northside',
			rating: 5,
			text: 'Great maintenance service. They caught a potential issue before it became a major problem. Highly recommend!',
			service: 'Maintenance',
			image: '/testimonial-3.jpg'
		}
	];

	const faqs = [
		{
			question: 'How often should I have my HVAC system serviced?',
			answer: 'We recommend annual maintenance for both heating and cooling systems to ensure optimal performance and prevent costly repairs.'
		},
		{
			question: 'Do you offer emergency services?',
			answer: 'Yes! We provide 24/7 emergency HVAC services. Call us anytime for urgent heating or cooling issues.'
		},
		{
			question: 'What brands do you work with?',
			answer: 'We work with all major HVAC brands including Carrier, Trane, Lennox, Rheem, and more. We can service any brand.'
		},
		{
			question: 'How long does a typical installation take?',
			answer: 'Most HVAC installations take 4-8 hours depending on the system size and complexity. We\'ll give you a precise timeline during consultation.'
		},
		{
			question: 'Do you offer financing options?',
			answer: 'Yes, we offer flexible financing options to make HVAC upgrades affordable. Contact us to learn about our payment plans.'
		},
		{
			question: 'What is included in a maintenance visit?',
			answer: 'Our maintenance visits include system inspection, filter replacement, cleaning, performance testing, and recommendations for improvements.'
		}
	];

	const stats = [
		{ value: '15+', label: 'Years Experience', icon: Award },
		{ value: '10,000+', label: 'Happy Customers', icon: Users },
		{ value: '24/7', label: 'Emergency Service', icon: Clock },
		{ value: '4.9★', label: 'Average Rating', icon: Star }
	];
</script>

<div class="min-h-screen bg-white">
	<!-- Header -->
	<Navigation />

	<!-- Hero Section -->
	<HeroSection {stats} {scrollToSection} />

	<!-- Get Estimate Section -->
	<GetEstimateSection {zipCode} onZipChange={handleZipChange} onGetEstimate={getFreeEstimate} />

	<!-- Services Section -->
	<ServicesSection services={hvacServices} />

	<!-- Stats Section -->
	<StatsSection {stats} />

	<!-- Benefits Section -->
	<BenefitsSection {benefits} />

	<!-- Process Section -->
	<ProcessSection />

	<!-- Testimonials Section -->
	<TestimonialsSection {testimonials} />

	<!-- FAQ Section -->
	<FAQSection {faqs} />

	<!-- Final CTA Section -->
	<FinalCTASection {scrollToSection} />
</div>
