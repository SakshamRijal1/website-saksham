// Add event listener to the registration form
document.getElementById("registration-form").addEventListener("submit", function(e) {
    e.preventDefault();  // Prevent page reload

    // Get user data from the form
    const name = document.getElementById("name").value;
    const college = document.getElementById("college").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Check if the user is already registered using their email
    const storedUserData = localStorage.getItem(email);
    if (storedUserData) {
        document.getElementById("user-message").innerHTML = "You are already registered!";
        document.getElementById("user-message").classList.add("error");
        return;
    }

    // Generate a unique registration code (you can modify this to be more complex)
    const uniqueCode = 'REG-' + Math.floor(Math.random() * 1000000);

    // Store the user data in localStorage
    const userData = {
        name,
        college,
        address,
        email,
        phone,
        uniqueCode
    };
    localStorage.setItem(email, JSON.stringify(userData));

    // Display the success message with unique code
    document.getElementById("user-message").innerHTML = `Registration successful! Your unique code is: ${uniqueCode}`;
    document.getElementById("user-message").classList.add("success");

    // Create and download the PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add user registration details to the PDF
    doc.text(`Registration Details`, 10, 10);
    doc.text(`Name: ${name}`, 10, 20);
    doc.text(`College: ${college}`, 10, 30);
    doc.text(`Address: ${address}`, 10, 40);
    doc.text(`Email: ${email}`, 10, 50);
    doc.text(`Phone: ${phone}`, 10, 60);
    doc.text(`Unique Code: ${uniqueCode}`, 10, 70);

    // Save the generated PDF file
    doc.save(`registration_${uniqueCode}.pdf`);
});
