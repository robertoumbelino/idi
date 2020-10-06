/**
 * Divergences.
 */
const divergences = {
  temNoFWENaoNoERP: [],
  temNoERPENaoNoFW: []
}

/**
 * Save text in clipboard.
 */
const saveInClipboard = text => {
  const input = document.createElement('input')
  input.value = text

  document.body.appendChild(input)

  input.select()
  document.execCommand('copy')
  input.remove()
}

/**
 * Add quotes from item list.
 */
const addQuotes = list => list.map(item => `'${item}'`)

/**
 * Clipboard.
 */
const withQuotes = content => saveInClipboard(addQuotes(content))
const withoutQuotes = content => saveInClipboard(content)

/**
 * ERP clipboard.
 */
const copyERPWithQuotes = () => withQuotes(divergences.temNoFWENaoNoERP)
const copyERPWithoutQuotes = () => withoutQuotes(divergences.temNoFWENaoNoERP)

/**
 * FW clipboard.
 */
const copyFWWithQuotes = () => withQuotes(divergences.temNoERPENaoNoFW)
const copyFWWithoutQuotes = () => withoutQuotes(divergences.temNoERPENaoNoFW)

/**
 * Elements.
 */
const FWIsElement = document.getElementById('fw-ids')
const ERPIdsElement = document.getElementById('erp-ids')
const FWToolsElement = document.getElementById('fw-tools')
const ERPToolsElement = document.getElementById('erp-tools')
const FWDivergenceElement = document.getElementById('fw-divergence')
const ERPDivergenceElement = document.getElementById('erp-divergence')

/**
 * Divergence identifier.
 */
const getDivergence = () => {
  const unformattedFWIds = FWIsElement.value
  const unformattedERPIds = ERPIdsElement.value

  const FWIds = unformattedFWIds ? unformattedFWIds.trim().split('\n') : []
  const ERPIds = unformattedERPIds ? unformattedERPIds.trim().split('\n') : []

  const temNoFWENaoNoERP = FWIds.filter(id => !ERPIds.includes(id))
  const temNoERPENaoNoFW = ERPIds.filter(id => !FWIds.includes(id))

  FWDivergenceElement.value = temNoERPENaoNoFW.join(', ')
  ERPDivergenceElement.value = temNoFWENaoNoERP.join(', ')

  const hasFWDivergence = !!temNoERPENaoNoFW.length
  const hasERPDivergence = !!temNoFWENaoNoERP.length

  /**
   * Display tools.
   */
  const FWDisplayTools = hasFWDivergence ? 'block' : 'none'
  const ERPDisplayTools = hasERPDivergence ? 'block' : 'none'

  FWToolsElement.style.display = FWDisplayTools
  ERPToolsElement.style.display = ERPDisplayTools

  /**
   * Update global var.
   */
  divergences.temNoFWENaoNoERP = temNoFWENaoNoERP
  divergences.temNoERPENaoNoFW = temNoERPENaoNoFW
}

/**
 * Events.
 */
FWIsElement.addEventListener('keyup', getDivergence)
ERPIdsElement.addEventListener('keyup', getDivergence)
