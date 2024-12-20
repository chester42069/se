const userId = "39cc91c9a916461532baaabbec128916"; // Replace with the actual user ID
const configUrl = "js/config.json"; // Path to your configuration file
const appointmentsContainer = document.getElementById("appointments-container");

async function fetchConfig() {
    try {
        const response = await fetch(configUrl);
        const config = await response.json();

        // Construct the endpoint using the base_url from config.json
        const endpoint = `${config.base_url}/doctor/api/v2/appointment?user_id=${userId}`;

        // Fetch and display appointments
        fetchAppointments(endpoint);
    } catch (error) {
        console.error("Error loading configuration:", error);
        appointmentsContainer.innerHTML = `<p>Error loading configuration. Please try again later.</p>`;
    }
}

async function fetchAppointments(endpoint) {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.status === "success") {
            const appointments = data.appointments;

            appointmentsContainer.innerHTML = ""; // Clear any existing content

            appointments.forEach(appointment => {
                const box = document.createElement("div");
                box.classList.add("box");

                box.innerHTML = `
                    <h3>Doctor: ${appointment.name}</h3>
                    <p>
                        Appointment DateTime: ${new Date(appointment.appointment_time).toLocaleDateString()}<br>
                        Email: ${appointment.email}
                    </p>
                `;

                appointmentsContainer.appendChild(box);
            });
        } else {
            appointmentsContainer.innerHTML = `<p>No appointments found.</p>`;
        }
    } catch (error) {
        console.error("Error fetching appointments:", error);
        appointmentsContainer.innerHTML = `<p>Error loading appointments. Please try again later.</p>`;
    }
}

// Fetch configuration and then appointments on page load
fetchConfig();
