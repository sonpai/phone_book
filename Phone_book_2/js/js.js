'use strict'

let editingRow = null;
let isListVisible = false;

// Toggles the visibility of the client list 
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

//The client list with users data
function usersList(){
  const users = [
    {
      "FIRST NAME":"Gabriel",
      "SECOND NAME":"Reyes",
      "EMAIL ADDRESS":"blackwatch@gmail.com",
      "HOME ADDRESS":"Los Angeles, United States",
      "PHONE NUMBER":"0543932172"
    },
    {
      "FIRST NAME":"Angela",
      "SECOND NAME":"Ziegler",
      "EMAIL ADDRESS":"medic@gmail.com",
      "HOME ADDRESS":"Zurich, Switzerland",
      "PHONE NUMBER":"0522000412"
    },  
    {
      "FIRST NAME":"Genji",
      "SECOND NAME":"Shimada",
      "EMAIL ADDRESS":"sparrow123@gmail.com",
      "HOME ADDRESS":"Hanamura, Japan",
      "PHONE NUMBER":"0524123611"
    },
    {
      "FIRST NAME":"Fareeha",
      "SECOND NAME":"Amari",
      "EMAIL ADDRESS":"chief123@gmail.com",
      "HOME ADDRESS":"Cairo, Egypt",
      "PHONE NUMBER":"0523210472"
    },  
    {
      "FIRST NAME":"Maugaloa",
      "SECOND NAME":"Malosi",
      "EMAIL ADDRESS":"scene@gmail.com",
      "HOME ADDRESS":"Apia, Samoa",
      "PHONE NUMBER":"0522123412"
    }
  ];


const clientList = document.getElementById('clientRows');

  // Sort users by first name
users.sort((a, b) => a["FIRST NAME"].localeCompare(b["FIRST NAME"]));


while (clientList.childNodes.length > 1) {
  clientList.removeChild(clientList.lastChild);
}

  // Create and append rows for each user
users.forEach((user, index) => {
  const row = document.createElement('div');
  row.className = 'client-row';
  row.dataset.index = index;
  row.innerHTML = `
    <div class="column">${user["FIRST NAME"]}</div>
    <div class="column">${user["SECOND NAME"]}</div>
    <div id="email_" class="column">${user["EMAIL ADDRESS"]}</div>
    <div id="homeAddress_" class="column">${user["HOME ADDRESS"]}</div>
    <div class="column">${user["PHONE NUMBER"]}</div>
    <div class="btns">
    <button class="btn" onclick="editContact(this)">Edit</button>
    <button class="btn" onclick="deleteContact(this)">Delete</button>
    </div>
  `;

  // Adds click event to display details when row is clicked
  const columns = row.querySelectorAll('.column');
  columns.forEach(column => {
    column.addEventListener("click", function() {
      showDetails(row);
    });
  });


  // Hides email and home address columns initially
  const hiddenColumn1 = row.querySelectorAll('#email_');
  hiddenColumn1.forEach(col => col.style.display = 'none');
  const hiddenColumn2 = row.querySelectorAll('#homeAddress_');
  hiddenColumn2.forEach(col => col.style.display = 'none');

  // Add mouseover and mouseout effects
  row.addEventListener('mouseover', function() {
    this.style.backgroundColor = '#7FA1C3'; 
    
  });
  row.addEventListener('mouseout', function() {
    this.style.backgroundColor = '';
  });
  clientList.appendChild(row);
});
}
  // Displays details of the selected contact in a modal
  function showDetails(row) {
    const columns = row.querySelectorAll('.column');

    document.getElementById('detailsFirstName').textContent = columns[0].textContent;
    document.getElementById('detailsSecondName').textContent = columns[1].textContent;
    document.getElementById('detailsEmailAddress').textContent = columns[2].textContent;
    document.getElementById('detailsHomeAddress').textContent = columns[3].textContent;
    document.getElementById('detailsPhoneNumber').textContent = columns[4].textContent;
    document.getElementById('detailsModal').style.display = 'flex';
  }  

let isOriginalColor = true;


// Toggles the color of buttons and search form
function toggleColor() {
  const button = document.getElementById('toggleEffectBtn');
  const search = document.getElementById('myForm');
  
  // Check the current color and toggle to the other color
  if (isOriginalColor)  {
  button.style.backgroundColor = '#3498db';
  search.style.backgroundColor = '#AA7EF7';
}
  else {
  button.style.backgroundColor = '#AA7EF7';
  search.style.backgroundColor = '#cccccc';

  }
  isOriginalColor = !isOriginalColor;
}

  // Filters the contact list based on the input value
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

  // Resets the search input and shows all contacts
  function resetForm() {
  document.getElementById('nameInput').value = '';
  filterContact();
  }
  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  // Closes the search form modal
  function closeForm() {
    document.getElementById('myForm').style.display = 'none';
  }

  // Opens the contact form modal
  function openModal() {
    document.getElementById('myModal').style.display = 'flex';
  }

  // Closes the contact details modal
  function closeModal(event) {
    if (event.target === document.getElementById('myModal') || event.target === document.getElementById('closeModalBtn')) {
        document.getElementById('myModal').style.display = 'none';
    }
  }

  // Adds a new contact to the list
  function addContact() {
    let firstName = document.getElementById('firstName').value.trim();
    let secondName = document.getElementById('secondName').value.trim();
    let emailAddress = document.getElementById('emailAddress').value.trim();
    let homeAddress = document.getElementById('homeAddress').value.trim();
    let phoneNumber = document.getElementById('phoneNumber').value.trim();

    if (!firstName || !secondName || !phoneNumber) {
      alert('Please fill out all fields.');
      return;
    }

    // Checks if a contact with the same name already exists
    const existingClients = document.querySelectorAll('.client-row');
    for (let client of existingClients) {
      const columns = client.querySelectorAll('.column');
      const existingFirstName = columns[0].textContent.trim();
      if (existingFirstName === firstName) {
        alert('A client with this name already exists.');
        return;
      }
    }
    
    // Creates and appends a new row for the contact
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
        <button class="btn" onclick="editContact(this)">Edit</button>
        <button class="btn" onclick="deleteContact(this)">Delete</button>
      </div>
    `;
    clientList.appendChild(row);
    closeModal();
  }

  // Opens the edit modal for the selected contact
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

  // Closes the edit modal
  function closeDetailsModal(event) {
    if (event.target === document.getElementById('detailsModal') || event.target === document.getElementById('closeDetailModalBtn')) {
      document.getElementById('detailsModal').style.display = 'none';
      editingRow = null;
    }
  }

  // Closes the edit modal
  function closeEditModal(event){
    if (event.target === document.getElementById('editModal') || event.target === document.getElementById('closeEditModalBtn')) {
      document.getElementById('editModal').style.display = 'none';
      editingRow = null;
    }
  }

  // Saves the edited contact information
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

  // Deletes the selected contact from the list
  function deleteContact(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
  }


