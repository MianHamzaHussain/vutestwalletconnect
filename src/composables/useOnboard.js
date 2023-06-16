import { computed, readonly, ref, shallowRef } from "vue";

import { useStorage } from "@vueuse/core";
import { useSubscription } from "@vueuse/rxjs";
import Web3Onboard from "@web3-onboard/core";

// Import types from "@web3-onboard/core" and "./types"

let web3Onboard = null; // Onboard will be kept here to be reused every time that we access the composable

const alreadyConnectedWallets = useStorage("alreadyConnectedWallets", []);
const lastConnectionTimestamp = useStorage("lastWalletConnectionTimestamp", 0);

const updateAlreadyConnectedWallets = () => {
  alreadyConnectedWallets.value = onboardState.value.wallets.map(
    (w) => w.label
  );
};

const onboardState = shallowRef({}); // Initialize with an empty object

const init = (options) => {
  web3Onboard = Web3Onboard(options);
  onboardState.value = web3Onboard.state.get();

  useSubscription(
    web3Onboard.state.select().subscribe((update) => {
      onboardState.value = update;
      updateAlreadyConnectedWallets();
    })
  );

  return web3Onboard;
};

const useOnboard = () => {
  // Raise an error if init() wasn't called
  if (!web3Onboard) {
    throw new Error("web3Onboard is not initialized");
  }

  const connectingWallet = ref(false);
  const wallets = computed(() => onboardState.value.wallets);

  const connectedWallet = computed(() => {
    return wallets.value.length > 0 ? wallets.value[0] : null;
  });

  const connectWallet = async (options) => {
    connectingWallet.value = true;
    await web3Onboard.connectWallet(options);
    connectingWallet.value = false;
    lastConnectionTimestamp.value = Date.now();
  };

  const disconnectWallet = async (wallet) => {
    connectingWallet.value = true;
    await web3Onboard.disconnectWallet(wallet);
    updateAlreadyConnectedWallets();
    connectingWallet.value = false;
  };

  const disconnectConnectedWallet = async () => {
    if (connectedWallet.value) {
      await disconnectWallet({ label: connectedWallet.value.label });
    }
  };

  const settingChain = ref(false);

  const connectedChain = computed(() => connectedWallet.value?.chains[0] ?? null);

  const getChain = (walletLabel) => {
    const wallet = onboardState.value.wallets.find(
      (w) => w.label === walletLabel
    );
    return wallet?.chains[0] ?? null;
  };

  const setChain = async (options) => {
    settingChain.value = true;
    await web3Onboard.setChain(options);
    settingChain.value = false;
  };

  return {
    connectWallet,
    connectedChain,
    connectedWallet,
    connectingWallet: readonly(connectingWallet),
    disconnectWallet,
    disconnectConnectedWallet,
    getChain,
    setChain,
    settingChain: readonly(settingChain),
    alreadyConnectedWallets,
    lastConnectionTimestamp,
    wallets,
  };
};

export { init, useOnboard };
