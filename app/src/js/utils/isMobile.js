const isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const isMobile = isDevice && window.matchMedia('(max-width: 768px)').matches

export const isTablet = isDevice

export default isMobile
