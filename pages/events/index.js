import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getAllEvents } from "@/helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import firebase_app from "@/firebase/config";
import { getStorage, ref, getDownloadURL } from "@firebase/storage";
function AllEventsPage(props) {
    const events = props.events;
    const router = useRouter();

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    }

    return (
        <Fragment>
            <Head>
                <title>All Events</title>
                <meta
                    name="description"
                    content="This is all event that you can find"
                />
            </Head>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    );
}

export async function getStaticProps(context) {
    const events = await getAllEvents();

    const storage = getStorage(firebase_app);

    const listEvents = await Promise.all(
        events.map(async (event) => {
            const imageURL = await getDownloadURL(ref(storage, event.image));
            return {
                ...event,
                image: imageURL,
            };
        })
    );

    return {
        props: {
            events: listEvents,
        },
    };
}

export default AllEventsPage;
