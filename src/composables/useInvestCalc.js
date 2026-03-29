import { computed } from 'vue'
import { useInvestStore } from '../stores/invest'

export function useInvestCalc() {
  const store = useInvestStore()
  const shares = computed(() => store.shares)
  const fees = computed(() => store.fees)
  const total = computed(() => store.total)
  const isHighAmount = computed(() => store.isHighAmount)
  function formatEur(val) { return val.toFixed(2).replace('.', ',') + ' €' }
  return { shares, fees, total, isHighAmount, formatEur }
}