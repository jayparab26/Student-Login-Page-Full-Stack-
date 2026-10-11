console.log("JavaScript file linked and working perfectly!");

const form = document.getElementById('studentForm');
const successBox = document.getElementById('successBox');

// 1. Clear error labels when typing/selecting inputs
form.addEventListener('input', function(event) {
  if (event.target.id || event.target.name) {
    const errorDiv = event.target.closest('.form-group')?.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.style.display = 'none';
    }
  }
});

// 2. Validate inputs and send data to Node.js backend via fetch API
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Stop normal HTML form submission/page refresh

  let isValid = true;

  // Fetch form values matching your HTML IDs/names
  const fullName = document.getElementById('fullName').value.trim();
  const dob = document.getElementById('dob').value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const course = document.getElementById('course').value;

  // Full Name validation
  if (fullName === "") {
    document.getElementById('nameError').style.display = 'block';
    isValid = false;
  }

  // DOB validation
  if (dob === "") {
    document.getElementById('dobError').style.display = 'block';
    isValid = false;
  }

  // Gender validation
  if (!gender) {
    document.getElementById('genderError').style.display = 'block';
    isValid = false;
  }

  // Course validation
  if (course === "") {
    document.getElementById('courseError').style.display = 'block';
    isValid = false;
  }

  // Send request if form passes frontend validation
  if (isValid) {
    const formData = {
      fullName: fullName,
      dob: dob,
      gender: gender.value,
      course: course
    };

    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        // Display UI success message box
        successBox.style.display = 'block';
        successBox.innerHTML = `<strong>Success!</strong> Student <b>${fullName}</b> has been saved to the database for <b>${course}</b>.`;

        // Reset form inputs after submission
        form.reset();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      alert('Could not connect to Node.js backend server.');
    }
  } else {
    successBox.style.display = 'none';
  }
});

// console.log("JavaScript file linked and working perfectly!");


// const form = document.getElementById('studentForm');
// const successBox = document.getElementById('successBox');

// // 1. ANONYMOUS FUNCTION: Clears error labels as soon as user types inside a field
// form.addEventListener('input', function(event) {
//     if (event.target.id || event.target.name) {
//         const errorDiv = event.target.closest('.form-group').querySelector('.error-message');
//         if (errorDiv) {
//             errorDiv.style.display = 'none';
//         }
//     }
// });

// // 2. ARROW FUNCTION: Validates field strings and prints confirmation panel
// form.addEventListener('submit', (e) => {
//    // e.preventDefault(); // Stop standard form page refreshes
    
//     let isValid = true;

//     // Fetch form values
//     const fullName = document.getElementById('fullName').value.trim();
//     const dob = document.getElementById('dob').value;
//     const gender = document.querySelector('input[name="gender"]:checked');
//     const course = document.getElementById('course').value;

//     // Name validation
//     if (fullName === "") {
//         document.getElementById('nameError').style.display = 'block';
//         isValid = false;
//     }

//     // DOB validation
//     if (dob === "") {
//         document.getElementById('dobError').style.display = 'block';
//         isValid = false;
//     }

//     // Gender validation
//     if (!gender) {
//         document.getElementById('genderError').style.display = 'block';
//         isValid = false;
//     }

//     // Course selection check
//     if (course === "") {
//         document.getElementById('courseError').style.display = 'block';
//         isValid = false;
//     }

//     // Execute actions if everything passes validation successfully
//     if (isValid) {
//         // Display success card with a custom template literal string
//         successBox.style.display = 'block';
//         successBox.innerHTML = `<strong>Success!</strong> Student <b>${fullName}</b> has been successfully registered for <b>${course}</b>.`;
        
//         setTimeout(()=>{
//             form.submit();
//         }, 1500);
//     } else {
//         successBox.style.display = 'none';
//     }
// });