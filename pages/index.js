import Head from "next/head";

import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helpers/api-util";
import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import firebase_app from "@/firebase/config";
import NewsletterRegistration from "@/components/input/newsletter-registration";

function HomePage(props) {
    return (
        <div>
            {/* NextJs will inject this component to the head section of HTML */}
            <Head>
                <title>Featured Events</title>
                <meta
                    name="description"
                    content="This all featured events that you can join"
                />
            </Head>
            <NewsletterRegistration />
            <EventList items={props.featuredEvents} />
        </div>
    );
}

export async function getStaticProps(_context) {
    const data = await getFeaturedEvents();

    const storage = getStorage(firebase_app);

    const listEvents = await Promise.all(
        data.map(async (event) => {
            const imageURL = await getDownloadURL(ref(storage, event.image));
            return {
                ...event,
                image: imageURL,
            };
        })
    );
    return {
        props: {
            featuredEvents: listEvents,
        },
    };
}

export default HomePage;
