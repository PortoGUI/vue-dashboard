import {
  ValidateEmptyAndEmail,
  ValidateEmptyAndLenght3
} from './validators'

describe('Validator Utils', () => {
  it('Return an error when empty parameter', () => {
    expect(ValidateEmptyAndLenght3()).toBe('* Este campo é obrigatório')
  })

  it('return an error with less then 3 character payload', () => {
    expect(ValidateEmptyAndLenght3('12')).toBe('* Este campo precisa de no mínimo 3 caracteres')
  })

  it('return true when pass a correct param', () => {
    expect(ValidateEmptyAndLenght3('1234')).toBe(true)
  })

  it('Return an error with empty payload', () => {
    expect(ValidateEmptyAndEmail()).toBe('* Este campo é obrigatório')
  })

  it('Return an error with a invalid param', () => {
    expect(ValidateEmptyAndEmail('myemail@')).toBe('* Este campo precisa ser um e-mail')
  })

  it('Return true when pass a correct param', () => {
    expect(ValidateEmptyAndEmail('igor@igor.me')).toBe(true)
  })
})
