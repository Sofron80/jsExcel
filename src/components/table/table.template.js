const CODES = {
  A: 65,
  Z: 90,
}

function toCell(_, col) {
  return `
  <div class="cell" contenteditable data-col="${col}"></div>
  `
}

function toColumn(col, index) {
  return `
  <div class="column" data-type="resizeable" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(idx, content) {
  const resize = idx ? '<div class="row-resize" data-resize="row" ></div>' : ''
  return `
  <div class="row" data-type="resizeable">
    <div class="row-info">
      ${idx ? idx : ''}
      ${resize}
    </div>
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
