export function wait(milisecounds) {
  return new Promise(resolve => {
    setTimeout(resolve, milisecounds)
  })
}
