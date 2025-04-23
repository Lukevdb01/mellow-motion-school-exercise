<script setup>
import viewportContainer from '@/components/ViewportContainer.vue'
import TabBox from '@/components/TabBox.vue'
</script>

<template>
    <section class="h-screen flex flex-col">
        <viewportContainer />
        <div>
            <TabBox />
        </div>
    </section>
</template>