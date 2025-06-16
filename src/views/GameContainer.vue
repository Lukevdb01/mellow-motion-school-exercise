<script setup lang="ts">

import TabBox from "@/components/TabBox.vue";
import ViewportContainer from "@/components/ViewportContainer.vue";
import { useHead } from '@vueuse/head';
useHead({
  title: 'Mellow Motion - zelfbeeld',
  meta: [
    {
      name: 'description',
      content: 'Een interactieve 3D ervaring over zelfzorg en mentale gezondheid. Ontdek hoe social media je zelfbeeld beïnvloedt en reflecteer in de spiegel van je eigen gedachten.',
    },
    {
      name: 'keywords',
      content: 'zelfzorg, mellow motion, storytelling game, mentale gezondheid, social media, zelfbeeld, jongeren, interactief, MIND MIRROR',
    },
    {
      name: 'author',
      content: 'Mellow Motion',
    },
    {
      property: 'og:title',
      content: 'Mellow Motion – Zelfzorg',
    },
    {
      property: 'og:description',
      content: 'Beleef een introspectieve reis over mentale gezondheid, beïnvloed door social media. Kies, voel en reflecteer.',
    },
    {
      property: 'og:image',
      content: 'https://static.lukevdbroek.nl/public/asset.php?file=thumbnail.png',
    },
    {
      property: 'og:url',
      content: 'https://sint-lucas.github.io/sd3-p12-md-project-2425-mellow-motion/',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://sint-lucas.github.io/sd3-p12-md-project-2425-mellow-motion/',
    },
  ],
});
</script>

<template>
  <section class="h-screen flex flex-col">
    <ViewportContainer />
  </section>
</template>
