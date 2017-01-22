const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8100 });

wss.broadcast = (msg) => {
  const str = JSON.stringify(msg);

  wss.clients.forEach(client => {
    if (client.readyState !== client.OPEN) {
      console.log(client.id, 'state is', client.readyState);
      return;
    }

    client.send(str);
  });
};

wss.on('connection', ws => {
  console.log('user connected with IP', ws.handshake.address);

  ws.on('message', msg => {
    const actions = {
      reset() {
        console.log(ws.handshake.address,'requested reset');
        ws.broadcast({action: 'reset'});
      },
      autoFill() {
        console.log(ws.handshake.address,'requested auto-fill');
        ws.broadcast({action: 'autoFill'});
      },
      nextColor($index) {
        ws.broadcast.emit({action: 'nextColor', $index});
      },
    };

    actions[msg.action]();
  });
});
