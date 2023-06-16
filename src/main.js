import { createApp } from 'vue';

import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";

import { init } from "./composables/useOnboard";
import router from "./router";

import App from './App.vue';

const infuraKey = 'b258ddef4c7549ef876537eaa3e36f6c';
const injected = injectedModule();
const walletConnect = walletConnectModule();

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum',
    rpcUrl: `https://mainnet.infura.io/v3/${infuraKey}`
  },
  {
    id: '0x3',
    token: 'tROP',
    label: 'Ropsten',
    rpcUrl: `https://ropsten.infura.io/v3/${infuraKey}`
  },
  {
    id: '0x4',
    token: 'rETH',
    label: 'Rinkeby',
    rpcUrl: `https://rinkeby.infura.io/v3/${infuraKey}`
  },
  {
    id: '0x89',
    token: 'MATIC',
    label: 'Polygon',
    rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
  },
  {
    id: '0xa',
    token: 'OETH',
    label: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io'
  }
];
const onboardOptions = {
  accountCenter: {
    desktop: {
      enabled: true,
    },
  },
  wallets: [walletConnect, injected],
  chains: chains,
  appMetadata: {
    name: "web3-onboard vue demo",
    icon: "<svg><svg/>",
    description: "Demo of the vue3 composable package",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "Frame", url: "https://frame.sh" },
    ],
  },
};

init(onboardOptions);
const app = createApp(App);
app.use(router);

app.mount("#app");
