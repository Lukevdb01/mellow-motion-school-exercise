<script setup>
import CanvasContainer from '@/components/CanvasContainer.vue'
import TabBox from '@/components/TabBox.vue'

import Renderer from '@/core/Renderer.js'

const renderer = new Renderer();
renderer.init();
</script>

<template>
    <section class="h-screen flex flex-col">
        <CanvasContainer/>
        <div>
            <TabBox/>
        </div>
    </section>
</template>