<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const name = ref('')
const room = ref('')

const gotoChat = () => {
    if (!name.value || !room.value) { }
    else {
        router.push({ path: `/chat`, query: { name: name.value, room: room.value } })
    }
}

</script>

<template>
    <section class="content-box">
        <h2 class="title">Join a Chatroom</h2>
        <input type="text" v-model="name" placeholder="Your name..." />
        <input type="text" v-model="room" placeholder="Your room..." />
        <button class="link" @click.prevent="gotoChat">join</button>
    </section>
</template>


<style scoped>
.title {
    color: #365;
    margin: auto 0;
}

.link {
    border: 1px solid #365;
    color: #365;
    margin: auto 0;
    padding: 1em 0;
    background: #fff;
}

.link:hover {
    background: #365;
    color: #fff;
}
</style>