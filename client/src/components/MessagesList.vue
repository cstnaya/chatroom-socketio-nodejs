<script setup>
import { ref, watch, nextTick } from 'vue';
import MessageItem from './MessageItem.vue';
import { useScroll } from '@vueuse/core';

const props = defineProps(['messages', 'name']);
const box = ref(null)

let { y } = useScroll(box)

watch(() => props.messages, async () => {
    nextTick(() => y.value = box.value.scrollHeight)
})
</script>

<template>
    <section ref="box" class="messages__list">
        <ul class="messages__list__content">
            <MessageItem v-for="(message, idx) in messages" :key="`${message.message}-${idx}`" :message="message"
                :name="name" />
        </ul>
    </section>
</template>

<style scoped>
.messages__list {
    border: 1px solid #d1d1d1;
    border-radius: 5px;
    overflow-y: scroll;
}

.messages__list__content {
    margin: 0;
    padding: .5em;
}
</style>