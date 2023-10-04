import firebase_app from "@/firebase/config";
import { getDatabase, ref, get, child } from "@firebase/database";

const database = ref(getDatabase(firebase_app));

export async function getAllEvents() {
    const response = await get(child(database, "events"));
    const data = response.val();
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
    const response = await get(child(database, `events/${eventId}`));
    const event = response.val();
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
