<script setup>
import { ref } from 'vue'
import RiskPopup from './components/regulatory/RiskPopup.vue'
import HighAmountModal from './components/invest/HighAmountModal.vue'
import RegulatoryModal from './components/regulatory/RegulatoryModal.vue'
import { useInvestStore } from './stores/invest'

const invest = useInvestStore()
const riskAccepted = ref(false)
</script>

<template>
  <RiskPopup v-if="!riskAccepted" @accept="riskAccepted = true" />
  <HighAmountModal
    v-if="invest.showHighAmountAlert"
    @close="invest.showHighAmountAlert = false"
    @confirm="invest.showHighAmountAlert = false"
  />
  <RegulatoryModal
    v-if="invest.activeRegModal"
    :type="invest.activeRegModal"
    @close="invest.activeRegModal = null"
  />
  <router-view />
</template>