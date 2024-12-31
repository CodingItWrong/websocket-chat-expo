let socket: WebSocket | null;

export function useWebSocket({url, onMessageReceived}: {url: string, onMessageReceived: (message: string) => void}) {
  if (!socket) {
    socket = new WebSocket(url);
    console.log('Attempting Connection...');

    socket.onopen = () => {
      console.log('Successfully Connected');
    };

    socket.onclose = event => {
      console.log('Socket Closed Connection: ', event);
      socket = null;
    };

    socket.onerror = error => {
      console.error('Socket Error: ', error);
    };
  }

  socket.onmessage = event => {
    onMessageReceived(event.data);
  };

  function send(data: string) {
    socket?.send(data);
  }

  return send;
}
