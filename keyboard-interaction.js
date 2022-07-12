document.addEventListener('DOMContentLoaded', function () {
  function collapseAll() {
    document.querySelectorAll('.collapse-trigger').forEach(c => c.checked = false)
  }

  // Allow closing all dialogs using the escape key
  document.addEventListener('keyup', e => {
    let open
    if (e.code === 'Escape') document.querySelectorAll('.modal-trigger').forEach(t => {
      if (t.checked) open = t
      t.checked = false
      collapseAll()
    })
    if (open) open.focus()
  })
  // Allow toggling modals and collapses using the enter key
  document.querySelectorAll('.modal-trigger, .collapse-trigger').forEach(t => t.addEventListener('keyup', e => {
    if (e.code === 'Enter') {
      t.checked = !t.checked
      if (!t.checked && t.classList.contains('modal-trigger')) collapseAll()
    }
  }))
  // Allow toggling collapses using arrow keys
  document.querySelectorAll('.collapse-trigger').forEach(t => t.addEventListener('keyup', e => {
    if (e.code === 'ArrowDown' || e.code === 'ArrowRight') t.checked = true
    if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') t.checked = false
  }))
  // Close all collapses when closing a modal
  document.querySelectorAll('.modal-trigger').forEach(t => t.addEventListener('change', e => {
    if (!e.target.checked) collapseAll()
  }))
})
