import { useEffect, useRef, useMemo, useCallback } from 'react';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import QuillCursors from 'quill-cursors';
import Quill from 'quill';
import katex from "katex";


const useQuillEditor = ({ documentId, user, document, isLoading }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const colors = useMemo(() => ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF3383', '#33FFF1'], []);
  const getRandomColor = useCallback(() => colors[Math.floor(Math.random() * colors.length)], [colors]);

  useEffect(() => {
    if (!document || isLoading) return;

    window.katex = katex; // katex is used to use the fucntion editing feature.
    Quill.register('modules/cursors', QuillCursors)

    const ydoc = new Y.Doc();
    const ytext = ydoc.getText('quill');
    const provider = new WebsocketProvider(`${process.env.NEXT_PUBLIC_socket_server}`, documentId, ydoc);

    provider.on('status', (event) => {
      console.log(`WebSocket connection: ${event.status}`);
    });

    // Editor settings and Quillbinding with Y.js
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          history: { userOnly: true },
          cursors: true,
          toolbar: [
            [{ font: [] }, { header: [1, 2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }, { align: [] }],
            ['link', 'image', 'video', 'formula'],
            ['clean'],
          ],
        },
      });

      new QuillBinding(ytext, quillRef.current, provider.awareness);

      provider.awareness.setLocalStateField('user', {
        name: `${user?.displayName}` || "Anonymous",
        color: getRandomColor(),
      });
    }




        // if (document?.document?.state) {
        //   const serverState = new Uint8Array(document.document.state.data);
        //   const decoded = new TextDecoder().decode(serverState);
        //   const delta = JSON.parse(decoded);
        //   console.log(delta)
        //   if(delta) {
        //         ytext.applyDelta(delta.ops);
        //       }
        //       var currentText = ytext.toDelta()
        //         if(quillRef.current?.getContents().ops.map(op => op.insert) !== delta.ops.map(op => op.insert)) {
        //             quillRef.current.setContents(delta); 
        //             console.log(quillRef.current?.getContents().ops);
        //             console.log(delta.ops)
        //         }
        // }





    return () => {
      provider.disconnect();
      ydoc.destroy();
      editorRef.current = null;
    };
  }, [documentId, document, isLoading, getRandomColor, user]);

  return { editorRef };
};

export default useQuillEditor;