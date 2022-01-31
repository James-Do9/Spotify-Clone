import React from 'react'
import spotifyImg from "../src/images/spotify.png"
export default function Navbar() {
    return (
        <div class="w-100">
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="#">
                    <div className="logo">
                        <img className="spotify-icon" src={spotifyImg}></img>
                        <span>Spotify Clone</span>
                    </div>
                </a>
            </nav>
        </div>
    )
}
