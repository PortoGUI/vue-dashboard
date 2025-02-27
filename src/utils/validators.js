export function ValidateEmptyAndLenght3(value) {
  if (!value) {
    return '* Este campo é obrigatório'
  }

  if (value.length < 3) {
    return '* Este campo precisa de no mínimo 3 caracteres'
  }

  return true
}

export function ValidateEmptyAndEmail(value) {
  if (!value) {
    return '* Este campo é obrigatório'
  }

  const isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value)
  if (!isValid) {
    return '* Este campo precisa ser um e-mail'
  }

  return true
}
