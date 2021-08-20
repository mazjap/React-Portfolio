import "./Contact.css"

import React from "react"

export default function Contact(props) {
    return (
        <div className="panel"  data-color="med">
            <h2 className="section-heading">Shoot me a message</h2>
            <form action="https://formspree.io/xqkedzrn" method="POST">
                <label for="name">Name:</label>
                <input id="name" name="Name" type="text" placeholder="Name" required />
                <label for="email">Email:</label>
                <input id="email" name="Email" type="email" placeholder="Email" required />
                <label for="subject">Subject:</label>
                <input id="subject" name="Subject" placeholder="Subject" required />
                <label for="body">Message:</label>
                <textarea name="Body" id="Submit" placeholder="Message" cols="10" rows="10" required />
            </form>
        </div>
    )
}