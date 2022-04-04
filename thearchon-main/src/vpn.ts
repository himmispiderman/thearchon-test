
import options from './config';
const openvpnmanager = require('node-openvpn');
const opts = {
  host: options.accounts, // normally '127.0.0.1', will default to if undefined
  port: options.accounts, //port openvpn management console
  timeout: options.accounts, //timeout for connection - optional, will default to 1500ms if undefined
};
const auth = {
  vpnuser: options.accounts,
  vpnpass: options.accounts,
};