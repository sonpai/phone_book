'use strict'

function filterClients(){
    const input = document.getElementById('nameInput');
    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll('.client');


rows.forEach(row => {
    const clientName = row.getAttribute('id').toLowerCase();
    if (clientName.includes(filter)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
}

function resetForm() {
    document.getElementById('nameInput').value = '';
    filterClients();
  }

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById('myForm').style.display = 'none';
  }

// const name = document.getElementById('name').value = originalName;
// updateTable(updatedValues);