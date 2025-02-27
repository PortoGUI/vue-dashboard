<template>
  <div class="flex justify-between" id="modal-login">
    <h1 class="text-4xl font-black text-gray-800"> Entre na sua conta</h1>
    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">&times;</button>
  </div>

  <div class="mt-16">

    <Form @submit="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>

        <Field id="email-field" name="email" :rules="ValidateEmptyAndEmail" v-model="state.email.value" type="email"
          :class="{ 'border-brand-danger': state.email.error }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-50 border-2 border-transparent rounded"
          placeholder="AnneMonteiro@email.com" />
        <ErrorMessage id="email-error" name="email" class="block font-medium text-brand-danger" />
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <Field id="password-field" name="password" :rules="ValidateEmptyAndLenght3" v-model="state.password.value"
          type="password" :class="{ 'border-brand-danger': state.password.error }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-50 border-2 border-transparent rounded" />
        <ErrorMessage id="password-error" name="password" class="block font-medium text-brand-danger" />
      </label>

      <button id="submit-button" :disabled="state.isloading" type="submit" :class="{ 'opacity-50': state.isloading }"
        class="flex justify-center items-center px-8 py-2 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150">

        <span v-if="state.isloading" class="material-icons animate-spin-invert">sync</span>
        <span v-else>Entrar</span>
      </button>
    </Form>

  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { ValidateEmptyAndLenght3, ValidateEmptyAndEmail } from '../../utils/validators'

import services from '../../services'
import useModal from '../../hooks/useModal'

export default {
  name: 'modalLogin',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    const state = reactive({
      hasError: false,
      isloading: false,
      email: { value: '', error: false },
      password: { value: '', error: false }
    })

    async function handleSubmit() {
      try {
        toast.clear()
        state.isloading = true
        const { data, error } = await services.auth.login({ email: state.email.value, password: state.password.value })

        if (!error) {
          window.localStorage.setItem('Token', data.token)
          state.isloading = false
          modal.close()
          router.push({ name: 'Feedback' })
          toast.success('Login realizado')
          return
        }

        state.isloading = false
      } catch (error) {
        state.isloading = false
        state.hasError = !!error

        if (error.status === 400) {
          toast.error('Erro na tentativa do login, tente mais tarde')
        }

        if (error.status === 401) {
          toast.error('Credenciais incorretas')
        }

        if (error.status === 404) {
          toast.error('Credenciais não encontradas')
        }
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
      ValidateEmptyAndLenght3,
      ValidateEmptyAndEmail
    }
  }
}
</script>
