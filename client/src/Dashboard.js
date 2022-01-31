import {useState, useEffect} from 'react'
import React from 'react';
import useAuth from './useAuth'
import {Form} from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
    clientId:"3c3f72516c2c4823b6e892334f706b8b"
})
export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")
  
    function chooseTrack(track) {
      setPlayingTrack(track)
      setSearch("")
      setLyrics("")
    }
  
    useEffect(() => {
      if (!playingTrack) return
  
      axios
        .get("http://localhost:3001/lyrics", {
          params: {
            track: playingTrack.title,
            artist: playingTrack.artist,
          },
        })
        .then(res => {
          setLyrics(res.data.lyrics)
        })
    }, [playingTrack])
  
    useEffect(() => {
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken)
    }, [accessToken])
  
    useEffect(() => {
      if (!search) return setSearchResults([])
      if (!accessToken) return
  
      let cancel = false
      spotifyApi.searchTracks(search).then(res => {
        if (cancel) return
        setSearchResults(
          res.body.tracks.items.map(track => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image
                return smallest
              },
              track.album.images[0]
            )
  
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            }
          })
        )
      })
  
      return () => (cancel = true)
    }, [search, accessToken])
  
    return (
      <div className="dashboard">
      <div className="container d-flex flex-column py-2" style={{ height: "90vh" }}>
        <Form.Control className="mt-2"
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex-grow-1 my-2 scroll">
          {searchResults.map(track => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
          {searchResults.length === 0 && (
            <div className="text-center mt-5" style={{ whiteSpace: "pre-line" }}>
              {lyrics}
            </div>
          )}
        </div>
        <div className="player mb-3">
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </div>
      </div>
    )
  }