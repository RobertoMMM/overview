const tableSection = document.getElementById('table_section') as HTMLTableSectionElement

let draggedTableRow: HTMLElement | null;

document.addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.addEventListener('dragstart', (e: any) => {
  draggedTableRow = e.target
});

const dropTableRow = (event: any) => {
  if (!draggedTableRow) {
    return
  }
  const targetTableRow = event.target.parentElement
  const stringDraggedChilds = draggedTableRow.innerHTML
  const stringTargetChilds = targetTableRow.innerHTML

  if (tableSection.contains(draggedTableRow) && tableSection.contains(targetTableRow)) {
    draggedTableRow.innerHTML = stringTargetChilds
    targetTableRow.innerHTML = stringDraggedChilds
  }
}

document.addEventListener('drop', (event: any) => {
  dropTableRow(event)
});