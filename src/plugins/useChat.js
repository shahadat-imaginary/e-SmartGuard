import { ref } from 'vue';
import Pusher from 'pusher-js';

export default function useChat() {
  const messages = ref([]);
  const pusher = new Pusher('f6980a548c69f46199ba', {
    cluster: 'ap1',
  });
  const channel = pusher.subscribe('chat-channel');

  channel.bind('new-message', (data) => {
    messages.value.push(data);
    console.log(data)
  });

  const sendMessage = (data) => {
    const newData = {
      data: data,
    };
    messages.value.push(newData);
  };

  return {
    messages,
    sendMessage,
  };
}
