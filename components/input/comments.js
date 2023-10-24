import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "@/store/notification-context";

function Comments(props) {
    const { eventId } = props;

    const notificationCtx = useContext(NotificationContext);

    const [showComments, setShowComments] = useState(false);
    const [listComments, setListComments] = useState([]);

    useEffect(() => {
        if (showComments) {
            getComments();
        }
    }, [showComments]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    async function getComments() {
        const response = await fetch("/api/comment/" + eventId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { comments } = await response.json();
        setListComments(comments);
    }

    async function addCommentHandler(commentData) {
        //using context
        notificationCtx.showNotification({
            title: "Sending Comments...",
            message: "Your comment is sending",
            status: "pending",
        });
        // send data to API
        let response
        try {
            response = await fetch("/api/comment/" + eventId, {
                method: "POST",
                body: JSON.stringify(commentData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            notificationCtx.showNotification({
                title: "Something went wrong",
                message: error,
                status: "error",
            });
        } finally {
            const { message } = await response.json();
            notificationCtx.showNotification({
                title: "Comments sent",
                message: message,
                status: "success",
            });
            getComments();
        }
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? "Hide" : "Show"} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList comments={listComments} />}
        </section>
    );
}

export default Comments;
