import Head from "next/head";

import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/helpers/api-util";

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
            <EventList items={props.featuredEvents} />
        </div>
    );
}

export async function getStaticProps(_context) {
    const data = await getFeaturedEvents();
    return {
        props: {
            featuredEvents: data,
        },
    };
}

export default HomePage;
