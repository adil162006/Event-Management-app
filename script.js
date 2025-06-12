// Store events in localStorage
let events = JSON.parse(localStorage.getItem('events')) || [];

// DOM Elements
const eventForm = document.getElementById('eventForm');
const eventsList = document.getElementById('eventsList');

// Add event listener for form submission
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventVenue = document.getElementById('eventVenue').value;
    const eventDescription = document.getElementById('eventDescription').value;
    
    // Create event object
    const newEvent = {
        id: Date.now(), // Use timestamp as unique ID
        name: eventName,
        date: eventDate,
        time: eventTime,
        venue: eventVenue,
        description: eventDescription
    };
    
    // Add to events array
    events.push(newEvent);
    
    // Save to localStorage
    saveEvents();
    
    // Reset form
    eventForm.reset();
    
    // Update display
    displayEvents();
    
    // Show success message
    alert('Event added successfully!');
});

// Function to save events to localStorage
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

// Function to display events
function displayEvents() {
    // Sort events by date
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Clear current display
    eventsList.innerHTML = '';
    
    // Display each event
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        // Format date for display
        const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Venue:</strong> ${event.venue}</p>
            ${event.description ? `<p><strong>Description:</strong> ${event.description}</p>` : ''}
            <div class="event-actions">
                <button class="btn-delete" onclick="deleteEvent(${event.id})">Delete Event</button>
            </div>
        `;
        
        eventsList.appendChild(eventCard);
    });
}

// Function to delete event
function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        events = events.filter(event => event.id !== id);
        saveEvents();
        displayEvents();
    }
}

// Initial display of events
displayEvents();