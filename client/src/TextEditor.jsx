import Quill from "quill"
import "quill/dist/quill.snow.css"
import { useCallback, useEffect } from 'react'
import {io} from "socket.io-client"
const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]


const TextEditor = () => {
useEffect(() => {
  const socket = io("http:localhost:3001")

  return ()=>{
    socket.disconnected()
  }

}, [])

const wrapperRef =useCallback((wrapper) => {
  if (wrapper == null) return

  wrapperRef.innerHTML =""
  const editor = document.createElement('div')
  wrapper.append(editor)
  new Quill("#container", {theme: "snow", modules:{ toolbar: TOOLBAR_OPTIONS}})})

  return (
    <div className="container" id = "container" ref={wrapperRef}></div>

  )
}

export default TextEditor