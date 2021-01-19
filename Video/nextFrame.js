function nextFrame ({ setTimeout = false } = {}) {
  if (setTimeout) return new Promise(resolve => setTimeout(resolve))

  return new Promise(requestAnimationFrame)
}

export default nextFrame
