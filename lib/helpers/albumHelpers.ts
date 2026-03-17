export function hasOrderChanged(
  currentState: { id: string }[],
  initial: { id: string }[],
) {
  return currentState.some((item, index) => item.id !== initial[index]?.id)
}
