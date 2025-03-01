<template id="modal-create-account">
  <div class="flex justify-between" id="modal-login">
    <h1 class="text-4xl font-black text-gray-800"> Crie sua conta</h1>
    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">&times;</button>
  </div>

  <div class="mt-16">

    <Form @submit="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">Nome Completo</span>
        <Field id="full-name-field" name="full-name" :rules="ValidateEmptyAndLenght3" v-model="state.name.value"
          type="text" :class="{ 'border-danger': state.name.error }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-50 border-2 border-transparent rounded"
          placeholder="Anne Monteiro" />
        <ErrorMessage id="full-name-error" name="full-name" class="block font-medium text-brand-danger" />
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <Field id="email-field" name="email" :rules="ValidateEmptyAndEmail" v-model="state.email.value" type="email"
          :class="{ 'border-danger': state.email.error }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-50 border-2 border-transparent rounded"
          placeholder="AnneMonteiro@email.com" />
        <ErrorMessage id="email-error" name="email" class="block font-medium text-brand-danger" />
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <Field id="password-field" name="password" :rules="ValidateEmptyAndLenght3" v-model="state.password.value"
          type="password" :class="{ 'border-danger': state.password.error }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-50 border-2 border-transparent rounded" />
        <ErrorMessage id="password-error" name="password" class="block font-medium text-brand-danger" />
      </label>

      <button id="submit-button" :disabled="state.isloading" type="submit" :class="{ 'opacity-50': state.isloading }"
        class="flex justify-center items-center px-8 py-2 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150">

        <span v-if="state.isloading" class="material-icons animate-spin-invert">sync</span>
        <span v-else>Criar</span>
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
  name: 'modalRegister',
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
      name: { value: '', error: false },
      email: { value: '', error: false },
      password: { value: '', error: false }
    })

    async function registrationWasSuccessful({ email, password }) {
      const { data, error } = await services.auth.login({ email, password })

      if (!error) {
        window.localStorage.setItem('Token', data.token)
        modal.close()
        router.push({ name: 'Feedback' })
        toast.clear()
        toast.success('Seja Bem-vindo!')
      }

      state.isloading = false
    }

    async function handleSubmit() {
      try {
        toast.clear()
        state.isloading = true
        const { error } = await services.auth.register({ name: state.name.value, email: state.email.value, password: state.password.value })

        if (!error) {
          await registrationWasSuccessful({ email: state.email.value, password: state.password.value })
          state.isloading = false
        }
      } catch (error) {
        state.isloading = false
        state.hasError = !!error

        if (error.status === 400) {
          toast.error('Erro na criação da conta, tente mais tarde')
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
