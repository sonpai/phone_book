'use strict'

let editingRow = null;
let editingIndex = null;
let isListVisible = false;

function toggleList() {
  const clientList = document.getElementById('clientList');
  if (isListVisible) {
    clientList.style.display = 'none';
  } else {
    clientList.style.display = 'block';
    usersList();
  }
  isListVisible = !isListVisible;
}

function usersList(){
  const users = [
    {
      "FIRST NAME":"Genji",
      "SECOND NAME":"Shimada",
      "EMAIL ADDRESS":"sparrow123@gmail.com",
      "HOME ADDRESS":"Hanamura, Japan",
      "PHONE NUMBER":"0524123611"
    },
    {
      "FIRST NAME":" Hanzo",
      "SECOND NAME":"Shimada",
      "EMAIL ADDRESS":"shimada@gmail.com",
      "HOME ADDRESS":"Hanamura, Japan",
      "PHONE NUMBER":"0544124311"
    },
    {
      "FIRST NAME":"Angela",
      "SECOND NAME":"Ziegler",
      "EMAIL ADDRESS":"medic@gmail.com",
      "HOME ADDRESS":"Zurich, Switzerland",
      "PHONE NUMBER":"0522000412"
    },
    {
      "FIRST NAME":"Fareeha",
      "SECOND NAME":"Amari",
      "EMAIL ADDRESS":"chief123@gmail.com",
      "HOME ADDRESS":"Cairo, Egypt",
      "PHONE NUMBER":"0523210472"
    },
    {
      "FIRST NAME":"Gabriel",
      "SECOND NAME":"Reyes",
      "EMAIL ADDRESS":"blackwatch@gmail.com",
      "HOME ADDRESS":"Los Angeles, United States",
      "PHONE NUMBER":"0543932172"
    }
  ];

const clientList = document.getElementById('clientRows');

while (clientList.childNodes.length > 1) {
  clientList.removeChild(clientList.lastChild);
}


users.forEach((user, index) => {
  const row = document.createElement('div');
  row.className = 'client-row';
  row.dataset.index = index;
  row.innerHTML = `
    <div class="column">${user["FIRST NAME"]}</div>
    <div class="column">${user["SECOND NAME"]}</div>
    <div class="column">${user["EMAIL ADDRESS"]}</div>
    <div class="column">${user["HOME ADDRESS"]}</div>
    <div class="column">${user["PHONE NUMBER"]}</div>
    <div class="btns">
    <button class="btn" onclick="editContact(this)">Edit</button>
    <button class="btn" onclick="deleteContact(this)">Delete</button>
    </div>
  `;
  clientList.appendChild(row);
  
  row.addEventListener('mouseover', function() {
    this.style.backgroundColor = '#4788F5'; 
    
  });
  row.addEventListener('mouseout', function() {
    this.style.backgroundColor = '';
  });
  clientList.appendChild(row);
});
}

function filterContact() {
const input = document.getElementById('nameInput').value.toLowerCase();
const clients = document.querySelectorAll('.client-row');

clients.forEach(client => {
  const firstName = client.querySelector('.column').textContent.toLowerCase();
  if (firstName.includes(input)) {
    client.style.display = '';
  } else {
    client.style.display = 'none';
  }
});
}

function resetForm() {
document.getElementById('nameInput').value = '';
filterContact();
}

function openForm() {
document.getElementById("myForm").style.display = "block";
}

function closeForm() {
document.getElementById('myForm').style.display = 'none';
}

function openModal() {
  document.getElementById('myModal').style.display = 'flex';
}

function closeModal(event) {
  if (event.target === document.getElementById('myModal') || event.target === document.getElementById('closeModalBtn')) {
      document.getElementById('myModal').style.display = 'none';
  }
}

function addContact() {
  let firstName = document.getElementById('firstName').value.trim();
  let secondName = document.getElementById('secondName').value.trim();
  let emailAddress = document.getElementById('emailAddress').value.trim();
  let homeAddress = document.getElementById('homeAddress').value.trim();
  let phoneNumber = document.getElementById('phoneNumber').value.trim();

  if (!firstName || !secondName || !emailAddress || !homeAddress || !phoneNumber) {
    alert('Please fill out all fields.');
    return;
  }

  const existingClients = document.querySelectorAll('.client-row');
  for (let client of existingClients) {
    const columns = client.querySelectorAll('.column');
    const existingFirstName = columns[0].textContent.trim();
    if (existingFirstName === firstName) {
      alert('A client with this name already exists.');
      return;
    }
  }
  

  const clientList = document.getElementById('clientList');
  const row = document.createElement('div');
  row.className = 'client-row';
  row.innerHTML = `
    <div class="column">${firstName}</div>
    <div class="column">${secondName}</div>
    <div class="column">${emailAddress}</div>
    <div class="column">${homeAddress}</div>
    <div class="column">${phoneNumber}</div>
    <div class="btns">
      <button class="btn" onclick="editContact()">Edit</button>
      <button class="btn" onclick="deleteContact()">Delete</button>
    </div>
  `;
  clientList.appendChild(row);
  closeModal();
}

function editContact(button) {
  const row = button.parentElement.parentElement;
  const columns = row.querySelectorAll('.column');

  document.getElementById('editFirstName').value = columns[0].textContent;
  document.getElementById('editSecondName').value = columns[1].textContent;
  document.getElementById('editEmailAddress').value = columns[2].textContent;
  document.getElementById('editHomeAddress').value = columns[3].textContent;
  document.getElementById('editPhoneNumber').value = columns[4].textContent;

  editingRow = row;
  document.getElementById('editModal').style.display = 'flex';
}

function closeEditModal(event) {
  if (event.target === document.getElementById('editModal') || event.target === document.getElementById('closeEditModalBtn')) {
    document.getElementById('editModal').style.display = 'none';
    editingRow = null;
  }
}

function saveContact() {
  if (editingRow) {
    editingRow.querySelector('.column:nth-child(1)').textContent = document.getElementById('editFirstName').value;
    editingRow.querySelector('.column:nth-child(2)').textContent = document.getElementById('editSecondName').value;
    editingRow.querySelector('.column:nth-child(3)').textContent = document.getElementById('editEmailAddress').value;
    editingRow.querySelector('.column:nth-child(4)').textContent = document.getElementById('editHomeAddress').value;
    editingRow.querySelector('.column:nth-child(5)').textContent = document.getElementById('editPhoneNumber').value;

    closeEditModal();
  }
}

function deleteContact(button) {
  const row = button.parentElement.parentElement;
  row.parentElement.removeChild(row);
}


