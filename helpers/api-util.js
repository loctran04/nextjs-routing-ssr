const api_url =
    "https://nextjs-practice-8f538-default-rtdb.asia-southeast1.firebasedatabase.app/";

export async function getAllEvents() {
    const response = await fetch(`${api_url}events.json`);
    const data = await response.json();
    const events = [];
    for (const key in data) {
        events.push({
            id: key,
            ...data[key],
        });
    }
    return events;
}

export async function getFeaturedEvents() {
    const events = await getAllEvents();
    return events.filter((event) => event.isFeatured);
}

export async function getEventById(eventId) {
    const response = await fetch(`${api_url}events/${eventId}.json`);
    const event = await response.json();
    return event;
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;

    const allEvents = await getAllEvents();

    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() === month - 1
        );
    });

    return filteredEvents;
}
