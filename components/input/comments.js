import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
    const { eventId } = props;

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
        // send data to API
        const response = await fetch("/api/comment/" + eventId, {
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { message } = await response.json();
        alert(message);
        getComments();
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
