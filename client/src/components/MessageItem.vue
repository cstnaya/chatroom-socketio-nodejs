<script setup>
const props = defineProps(['message', 'name'])
</script>

<template>
    <div class="message" :class="{ 'my-message': message.user === name }">
        <div class='message__content'>{{ message.message }}</div>
        <div class="message__author">{{ message.user }}</div>
    </div>
</template>

<style scoped>
.message {
    display: flex;
    gap: 0 .5em;
    align-items: center;
}

.message+.message {
    margin-top: 1em;
}

.message__content {
    padding: .5em 1.5em;
    border-radius: 12px;
    background: #e1e1e1;
}

.message__author {
    color: #666;
}

.message.my-message {
    flex-direction: row-reverse;
}

.message.my-message .message__content {
    background: #365;
    color: #fff;
}

.message.my-message .message__author {
    display: none;
}
</style>