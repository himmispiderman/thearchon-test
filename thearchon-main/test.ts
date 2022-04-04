const [proxyHost, _proxyPort] = options.proxy.slice(9).split(':');
const proxyPort = parseInt(_proxyPort);

options.client = createClient({
    username: options.username,
    password: options.password,
    host: options.host,
    port: options.port,
    connect: async client => {
        const info = await SocksClient.createConnection({
            proxy: {
                host: proxyHost,
                port: proxyPort,
                type: parseInt(options.proxy![5]) as 4 | 5,
            },
            command: 'connect',
            destination: {
                host: options.host!,
                port: options.port!,
            },
        });

        client.setSocket(info.socket);
        client.emit('connect');
    },
    agent: new SocksProxyAgent(options.proxy),
});







const openvpnmanager = require('node-openvpn');
 
const opts = {
  host: '127.0.0.1', // normally '127.0.0.1', will default to if undefined
  port: 1337, //port openvpn management console
  timeout: 1500, //timeout for connection - optional, will default to 1500ms if undefined
  logpath: 'log.txt' //optional write openvpn console output to file, can be relative path or absolute
};
const auth = {
  user: 'vpnUserName',
  pass: 'vpnPassword',
};
const openvpn = openvpnmanager.connect(opts)
 
// will be emited on successful interfacing with openvpn instance
openvpn.on('connected', () => {
  openvpnmanager.authorize(auth);
});
 
// emits console output of openvpn instance as a string
openvpn.on('console-output', output => {
  console.log(output)
});
 
// emits console output of openvpn state as a array
openvpn.on('state-change', state => {
  console.log(state)
});
 
// emits console output of openvpn state as a string
openvpn.on('error', error => {
  console.log(error)
});
 
// get all console logs up to this point
openvpnmanager.getLog(console.log)
 
// and finally when/if you want to
openvpnmanager.disconnect();
 
// emits on disconnect
openvpn.on('disconnected', () => {
  // finally destroy the disconnected manager 
  openvpnmanager.destroy()
});