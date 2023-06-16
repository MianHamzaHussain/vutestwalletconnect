<script setup>
import { useOnboard } from '../composables/useOnboard'
import { computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-dark.css'

Prism.manual = true;

const { wallets, connectedWallet, connectedChain, connectWallet, disconnectConnectedWallet } = useOnboard();

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
const textHighlighter = (object) => Prism.highlight(JSON.stringify(object, getCircularReplacer()), Prism.languages.javascript, 'javascript')

const walletsString = computed(() => textHighlighter(wallets.value.map((w) => w.label)))
const connectedWalletString = computed(() => textHighlighter({ label: connectedWallet.value?.label, accounts: connectedWallet.value?.accounts, chains: connectedWallet.value?.chains }))
const connectedChainString = computed(() => textHighlighter(connectedChain.value))
</script>

<template>
  <button @click="connectWallet()" v-if="connectedWallet === null">Connect Wallet</button>
  <template v-else>
    <h2>You connected the following wallets</h2>
    <code class="code-javascript" v-html="walletsString"></code>
    <div class="block">
      <h2>You are currently connected with</h2>
      <span class="wallet-icon" v-html="connectedWallet.icon"></span>
    </div>
    <code class="code-javascript" v-html="connectedWalletString"></code>
    <h2>You are currently connected to</h2>
    <code class="code-javascript" v-html="connectedChainString"></code>
    <button @click="disconnectConnectedWallet()">Disconnect Wallet</button>
  </template>
</template>

<style scoped>
.code-javascript {
  display: block;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #adbac7;
}

.wallet-icon {
  width: 2rem;
  height: 2rem;
  display: inline-block;
}

.block {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 1rem;
}
</style>
