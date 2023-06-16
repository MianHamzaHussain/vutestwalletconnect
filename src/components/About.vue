<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { useEthers } from '../composables/useEthers'

const { ens, address, balance, fetchSignerData, loading } = useEthers()

fetchSignerData()
</script>

<template>
  <h2>Some data...</h2>
  <span v-if="loading">Loading...</span>
  <template v-else>
    <ul>
      <li v-if="ens">Your ens is {{ ens }}</li>
      <li>Your address is {{ address }}</li>
      <li>Your balance is {{ balance }}</li>
    </ul>
    <button @click="fetchSignerData">Refresh data</button>
  </template>
</template>
