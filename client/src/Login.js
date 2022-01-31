import React from 'react'
// import composer from "../src/images/composer.svg"
import audioImg from "../src/images/audio-player.svg"
import arianaGrandeImg from "../src/images/ariana-grande-positions.png"
import badBunnyImg from "../src/images/bad-bunny.png"
import billieEilishImg from "../src/images/billie-eilish.png"
import btsImg from "../src/images/bts-mos.png"
import duaLipaImg from "../src/images/dua-lipa-FN.png"
import harryStylesImg from "../src/images/harry-styles-fl.png"
import juiceWrldImg from "../src/images/juice-wrld-lnd.png"
import postMaloneImg from "../src/images/post-malone-hb.png"
import theWeekndImg from "../src/images/the-weeknd-ah.png"

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=3c3f72516c2c4823b6e892334f706b8b&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function login() {
    return (
        <div>
        {/* //////////////////////////////Desktop Display ///////////////////////////////////*/}
        <section className="login desktop" style={{minHeight:"100vh"}}>
            <div className="row container login-card mt-5">
                <div className="col-4 text-center">
                    <div className="login-msg">
                        <h1>Login with Spotify</h1>
                        <p>Play your favorite songs on demand.</p>
                        <p>Pick from the top albums!</p>
                    <div>
                        <div className="audio-img"><img src={audioImg}></img></div>
                        <a className="login-button mt-5" href={AUTH_URL}>Login with Spotify</a>
                    </div>
                    </div>
                </div>
                    <div className="col-8">
                        <div className="row container">
                            <div className="col">
                                <img src={arianaGrandeImg}></img>
                                <img src={badBunnyImg}></img>
                                <img src={duaLipaImg}></img>
                            </div>
                        </div>
                        <div className="row container">
                            <div className="col">
                                <img src={btsImg}></img>
                                <img src={theWeekndImg}></img>
                                <img src={harryStylesImg}></img>
                            </div>
                        </div>
                    <div className="row container">
                        <div className="col">
                            <img src={juiceWrldImg}></img>
                            <img src={postMaloneImg}></img>
                            <img src={billieEilishImg}></img>   
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* ///////////////////////////////Mobile Display ////////////////////////////////////////*/}
        <section className="login mobile" style={{minHeight:"100vh"}}>
            <div className="row container login-card mt-5">
                <div className="col text-center">
                    <div className="login-msg">
                        <h1>Login with Spotify</h1>
                        <p>Play your favorite songs on demand.</p>
                        <p>Pick from the top albums!</p>
                    <div>
                        <div><img src={audioImg}></img></div>
                        <a className="login-button mt-5" href={AUTH_URL}>Login with Spotify</a>
                    </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}
