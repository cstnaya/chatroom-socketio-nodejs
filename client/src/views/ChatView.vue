<script setup>
import MessagesList from '../components/MessagesList.vue';
import queryString from 'query-string'
import { onMounted, onUnmounted, ref } from 'vue';
import { socket } from '../socket'

const name = ref('')
const room = ref('')
const message = ref('')
const messages = ref([])

onMounted(() => {
    const data = queryString.parse(location.search)
    name.value = data.name
    room.value = data.room

    socket.emit('join', { name: name.value, room: room.value }, ({ error, message }) => {
        if (error) { alert(error) }

        else {
            alert(message)
        }
    })

    socket.on('message', (message) => {
        messages.value = [...messages.value, message]
    })
})

onUnmounted(() => {
    socket.disconnect()
    socket.off()
})

const sendMessage = () => {
    if (message.value) {
        socket.emit('sendMessage', message.value, () => {
            message.value = ''
        })
    }
}
</script>

<template>
    <section class="content-box">
        <h2 class="title">Chatroom: {{ room }}</h2>
        <MessagesList :messages="messages" :name="name" />
        <input type="text" v-model="message" @keyup.enter.prevent="sendMessage" />
    </section>
</template>

<style scoped>
.title {
    color: #365;
    margin: auto 0;
}

.content-box {
    grid-template-rows: 1fr 3fr 50px;
}
</style>