import { Fragment } from "react";
import Head from "next/head";
import { getFilteredEvents } from "@/helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage({ filteredEvents, hasError, date }) {
    if (!filteredEvents) {
        return <p className="center">Loading...</p>;
    }
    const headData = (
        <Head>
            <title>Filtered Events</title>
            <meta
                name="description"
                content="Filtered event for specific month and year"
            />
        </Head>
    );
    if (hasError) {
        return (
            <Fragment>
                {headData}
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {headData}
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const constructedDate = new Date(date.year, date.month - 1);

    return (
        <Fragment>
            <ResultsTitle date={constructedDate} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;

    const filterData = params.slug;

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return {
            props: {
                hasError: true,
            },
            // notFound: true,
            // redirect: {
            //   destination: '/some-page'
            // }
        };
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    return {
        props: {
            filteredEvents,
            date: {
                year: numYear,
                month: numMonth,
            },
        },
    };
}

export default FilteredEventsPage;
