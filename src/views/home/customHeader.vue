<template>
  <header class="header bg-brand-main w-full flex justify-center">
    <div class="header-group flex flex-col w-4/5 max-w-6x">
      <div class="flex justify-between items-center py-10">
        <div class="w-28 lg:w-36">
          <img src="../../assets/images/logo_white.png" alt="logo" />
        </div>
        <div class="flex">
          <button class="px-6 py-2 font-bold rounded-full focus:outline-none text-white"
            @click="() => emit('createAccount')">Registre-se</button>
          <button class="px-6 py-2 font-bold bg-white rounded-full focus:outline-none"
            @click="() => emit('login')">Entrar</button>
        </div>
      </div>

      <div class="flex flex-col mt-28">
        <h1 class="text-4xl font-black text-white">
          Tenha um feedback de qualidade <br>
          e aprimore seus produtos <br class="hidden lg:inline-block">
        </h1>
        <p class="text-lg font-medium text-white">
          Receba ideias, reclamações e feedbacks de seus clientes com um <br class="hidden lg:inline-block">
          simples widget em sua pagina.
        </p>
        <div>
          <button id="cta-create-account-button"
            class="px-6 py-2 mt-10 font-bold bg-white rounded-full focus:outline-none"
            @click="() => emit('create-account')">Crie uma conta
          </button>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
export default {
  name: 'customHeader',
  setup(_, { emit }) {
    return {
      emit
    }
  }
}
</script>

<style scoped>
.header {
  height: 700px;
}

.header-group {
  background-repeat: no-repeat;
}

@media (min-width: 790px) {
  .header-group {
    background-image: url('../../assets/images/partying.svg');
    background-size: 628px;
    background-position: 90% 100%;

  }
}
</style>
