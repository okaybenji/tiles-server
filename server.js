const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8100 });

wss.on('connection', ws => {
  const ip = ws._socket.remoteAddress;
  console.log('user connected with IP', ip);

  const broadcast = msg => {
    wss.clients.forEach(client => {
      if (client.readyState !== client.OPEN) {
        console.log(client.id, 'state is', client.readyState);
        return;
      }

      // clients shouldn't broadcast to themselves
      if (client === ws) {
        return;
      }

      client.send(msg);
    });
  };

  ws.on('message', msg => {
    const data = JSON.parse(msg);
    const actions = ['reset', 'autoFill', 'nextColor'];
    const actionIsValid = actions.findIndex(action => action === data.action) > -1;

    if (actionIsValid) {
      broadcast(msg);
    } else {
      console.warn(ip, 'requested unknown action:', data.action);
    }
  });
});
