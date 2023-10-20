<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      {{ message.text }}
    </div>
    <input v-model="newMessage" @keyup.enter="send" placeholder="Type your message..." />
  </div>
</template>

<script>
import { ref } from "vue"

import useChat from '@/plugins/useChat';

export default {
  setup() {
    const { messages, sendMessage } = useChat();
    const newMessage = ref('');

    const send = () => {
      if (newMessage.value.trim() === '') return;
      sendMessage(newMessage.value);
      newMessage.value = '';
    };

    return {
      messages,
      newMessage,
      send,
    };
  },
};
</script>
