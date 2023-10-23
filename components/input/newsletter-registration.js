import { useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
    const emailInputRef = useRef();
    async function registrationHandler(event) {
        event.preventDefault();
        if (!emailInputRef.current.value) {
            alert("Email can not be empty!");
        }
        const response = await fetch("/api/newsletter", {
            method: "POST",
            body: JSON.stringify({
                email: emailInputRef.current.value,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response) {
            alert("something went wrong!");
        }
        const { message } = await response.json();
        alert(message);
        emailInputRef.current.value = "";
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        aria-label="Your email"
                        ref={emailInputRef}
                    />
                    <button type="submit">Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;
