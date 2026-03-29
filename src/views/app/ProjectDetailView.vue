<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProject, getPercentFunded } from '../../constants/projects'
import BaseBadge from '../../components/ui/BaseBadge.vue'
import InvestPanel from '../../components/invest/InvestPanel.vue'

const route = useRoute()
const router = useRouter()
const project = computed(() => getProject(route.params.id) || getProject('medcare-ai'))
const activeTab = ref('Présentation')
const tabs = ['Présentation', 'Business Plan', 'Équipe', 'Financier', 'Documents']
const badgeLabels = { halal: '☪ Halal', nouveau: 'Nouveau', 'fin-proche': 'Fin proche', finance: 'Financé' }
</script>

<template>
  <div class="px-10 py-7 flex-1 flex gap-7 items-start" v-if="project">
    <div class="flex-[6] min-w-0">
      <div class="bg-white border border-card-border rounded-2xl overflow-hidden">
        <div class="relative">
          <img :src="project.imageLarge || project.image" :alt="project.name" class="w-full h-60 object-cover block" />
          <div class="absolute top-3.5 left-3.5 flex gap-2">
            <BaseBadge v-for="b in project.badges" :key="b" :type="b">{{ badgeLabels[b] }}</BaseBadge>
          </div>
        </div>
        <div class="px-7 py-6">
          <div class="text-xl font-bold text-primary mb-1">{{ project.name }}</div>
          <div class="text-sm text-secondary mb-5">{{ project.sectorLabel }} • {{ project.location }} • {{ project.founded }}</div>
          <div class="flex gap-2 mb-6 flex-wrap">
            <span v-for="tab in tabs" :key="tab" :class="['px-4.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all', activeTab === tab ? 'bg-accent text-sidebar' : 'bg-gray-200 text-secondary']" @click="activeTab = tab">{{ tab }}</span>
          </div>
          <div v-if="project.kpis" class="grid grid-cols-3 gap-4 mb-7">
            <div v-for="kpi in project.kpis" :key="kpi.label" class="text-center p-3.5 bg-page-bg rounded-lg">
              <div class="text-xl font-extrabold text-primary">{{ kpi.value }}</div>
              <div class="text-xs text-secondary mt-1">{{ kpi.label }}</div>
            </div>
          </div>
          <div v-if="project.scoring" class="mb-7">
            <div class="flex items-center gap-2 text-lg font-bold text-primary mb-3.5">📊 Analyse Lina Capital</div>
            <div class="bg-filter-bg rounded-xl p-5">
              <div v-for="s in project.scoring" :key="s.label" class="flex justify-between items-center py-2 border-b border-card-border last:border-0">
                <span class="text-xs text-secondary">{{ s.label }}</span>
                <div class="flex gap-1"><span v-for="i in 5" :key="i" :class="['w-3 h-3 rounded-full', i <= s.score ? 'bg-accent' : 'bg-card-border']" /></div>
              </div>
            </div>
          </div>
          <div v-if="project.fullDescription" class="mb-7">
            <div class="flex items-center gap-2 text-lg font-bold text-primary mb-3.5">🎯 Projet</div>
            <p class="text-sm text-secondary leading-relaxed">{{ project.fullDescription }}</p>
          </div>
          <div v-if="project.risks" class="bg-red-50 border border-red-200 rounded-xl p-5 mb-7">
            <h4 class="text-sm font-bold text-danger-alt mb-3">⚠️ Risques spécifiques</h4>
            <div v-for="r in project.risks" :key="r" class="text-xs text-primary leading-relaxed py-1.5 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-danger-alt">{{ r }}</div>
          </div>
          <div v-if="project.funds" class="mb-7">
            <div class="flex items-center gap-2 text-lg font-bold text-primary mb-3.5">🎯 Fonds</div>
            <div class="flex flex-col gap-3">
              <div v-for="f in project.funds" :key="f.label">
                <div class="flex justify-between mb-1.5"><span class="text-sm font-semibold text-primary">{{ f.label }}</span><span class="text-sm font-bold text-accent">{{ f.pct }}%</span></div>
                <div class="h-2 bg-card-border rounded-full overflow-hidden"><div class="h-full bg-gradient-to-r from-accent to-accent-hover rounded-full" :style="{ width: f.pct + '%' }" /></div>
                <div v-if="f.desc" class="text-xs text-tertiary mt-1">{{ f.desc }}</div>
              </div>
            </div>
          </div>
          <div v-if="project.team" class="mb-7">
            <div class="flex items-center gap-2 text-lg font-bold text-primary mb-3.5">🎯 Équipe</div>
            <div class="grid grid-cols-3 gap-3.5">
              <div v-for="m in project.team" :key="m.name" class="bg-card-border rounded-lg p-4 text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-accent-secondary to-accent-hover rounded-full mx-auto mb-2.5 flex items-center justify-center text-white font-bold text-base">{{ m.initials }}</div>
                <div class="text-sm font-bold text-primary">{{ m.name }}</div>
                <div class="text-xs text-secondary mt-0.5">{{ m.role }}</div>
              </div>
            </div>
          </div>
          <div v-if="project.documents" class="mb-7">
            <div class="flex items-center gap-2 text-lg font-bold text-primary mb-3.5">🎯 Documents</div>
            <div class="flex flex-col gap-2.5">
              <div v-for="d in project.documents" :key="d.name" class="flex items-center justify-between bg-input-bg rounded-lg px-4.5 py-3.5">
                <div class="flex items-center gap-3">
                  <div :class="['w-9 h-9 rounded-lg flex items-center justify-center text-base', d.isFICI ? 'bg-emerald-100' : 'bg-card-border']">{{ d.isFICI ? '📋' : '📄' }}</div>
                  <div><div class="text-sm font-semibold text-primary">{{ d.name }}</div><div class="text-xs text-tertiary">{{ d.size }}</div></div>
                </div>
                <a href="#" class="text-xs font-semibold text-success no-underline">Télécharger →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-[4] sticky top-5"><InvestPanel /></div>
  </div>
</template>