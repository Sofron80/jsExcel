const CODES = {
  A: 65,
  Z: 90,
}

function toCell(_) {
  return `
  <div class="cell" contenteditable></div>
  `
}

function toColumn(col) {
  return `
  <div class="column">
  ${col}
  </div>
  `
}

function createRow(idx, content) {
  return `
  <div class="row">
    <div class="row-info">${idx ? idx : ''}</div>
    <div class="row-data">${content}</div>
  </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(row = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < row; i++) {
    const cell = new Array(colsCount).fill('').map(toCell).join('')
    rows.push(createRow(i + 1, cell))
  }

  return rows.join('')
}