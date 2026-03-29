<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="flex min-h-screen font-[var(--font-body)]">
    <div class="w-[45%] min-h-screen bg-login-bg flex flex-col items-center justify-center px-20 py-15">
      <div class="w-full max-w-[420px]">
        <div class="flex items-center gap-3 mb-12">
          <div class="w-11 h-11 bg-login-cyan rounded-xl flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 5 5-9"/></svg>
          </div>
          <div>
            <div class="font-[var(--font-heading)] font-extrabold text-[28px] text-login-navy tracking-tight">Lina Capital</div>
            <div class="font-[var(--font-heading)] font-bold text-[10px] text-login-navy tracking-[2.5px] uppercase opacity-50 mt-0.5">Private Equity</div>
          </div>
        </div>
        <h1 class="font-[var(--font-heading)] text-[28px] font-extrabold text-login-navy mb-2">Se connecter</h1>
        <p class="text-[15px] text-gray-500 mb-9">Pas de compte ? <a class="text-login-cyan font-semibold cursor-pointer no-underline hover:underline" @click="router.push('/onboarding/1')">S'inscrire ›</a></p>
        <div class="flex flex-col gap-3 mb-7">
          <button class="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg text-[15px] font-semibold cursor-pointer border-none bg-login-cyan text-white font-[var(--font-body)]" @click="router.push('/2fa')">
            <svg viewBox="0 0 24 24" fill="#fff" class="w-5 h-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/></svg>
            Continuer avec Google
          </button>
          <button class="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg text-[15px] font-semibold cursor-pointer bg-white text-login-navy border border-gray-300 font-[var(--font-body)]" @click="router.push('/2fa')">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            Continuer avec Apple
          </button>
        </div>
        <div class="flex items-center gap-4 mb-7"><div class="flex-1 h-px bg-gray-300" /><span class="text-xs text-gray-400 uppercase tracking-wide whitespace-nowrap">ou par email</span><div class="flex-1 h-px bg-gray-300" /></div>
        <form @submit.prevent="router.push('/2fa')">
          <div class="mb-5"><input type="email" value="lea.dupont@email.com" class="w-full py-4 text-[15px] font-[var(--font-body)] text-login-navy bg-transparent border-0 border-b border-gray-300 outline-none focus:border-login-cyan" /></div>
          <div class="mb-5"><input type="password" value="••••••••••" class="w-full py-4 text-[15px] font-[var(--font-body)] text-login-navy bg-transparent border-0 border-b border-gray-300 outline-none focus:border-login-cyan" /></div>
          <button type="submit" class="w-full py-4 border-none rounded-lg text-base font-semibold font-[var(--font-body)] cursor-pointer bg-gradient-to-r from-login-cyan to-login-cyan-dark text-white hover:shadow-lg hover:-translate-y-px transition-all">Se connecter</button>
        </form>
        <div class="text-center mt-5"><a href="#" class="text-sm text-login-cyan no-underline font-medium">Mot de passe oublié ?</a></div>
      </div>
    </div>
    <div class="w-[55%] min-h-screen bg-login-navy flex flex-col items-center justify-center p-15 relative overflow-hidden">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-login-cyan/8 rounded-full" />
      <div class="absolute -bottom-20 -left-20 w-72 h-72 bg-login-cyan/5 rounded-full" />
      <div class="relative z-10 text-center max-w-[550px]">
        <h2 class="font-[var(--font-heading)] text-4xl font-extrabold text-white mb-4 leading-tight">Investissez dans l'économie réelle</h2>
        <p class="text-base text-white/65 leading-relaxed mb-10">Gérez vos investissements conformes à vos valeurs.</p>
        <div class="flex justify-center gap-10 flex-wrap">
          <div class="text-center"><svg class="w-9 h-9 mx-auto mb-2 text-login-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span class="block text-xs text-white/55 leading-snug">Données<br>sécurisées</span></div>
          <div class="text-center bg-red-500/20 border-2 border-red-500/50 rounded-lg p-1.5"><svg class="w-9 h-9 mx-auto mb-2 text-login-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><span class="block text-xs text-white/55 leading-snug">Agrément AMF<br>en cours</span></div>
          <div class="text-center"><svg class="w-9 h-9 mx-auto mb-2 text-login-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><span class="block text-xs text-white/55 leading-snug">TPE & PME<br>françaises</span></div>
        </div>
      </div>
    </div>
  </div>
</template>