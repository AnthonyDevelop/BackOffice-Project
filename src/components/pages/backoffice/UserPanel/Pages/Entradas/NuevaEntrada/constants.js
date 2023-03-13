import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
// import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
// import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
// import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Paragraph from "@editorjs/paragraph";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
// import VideoTool from "@weekwood/editorjs-video";
import VideoTool from "@vietlongn/editorjs-video";
import CarrouselTool from "./tools/carrousel/carrouselTool";
import ImagenMediaTool from "./tools/ImagenMedia/imagenMediaTool";

const AlignmentTuneTool = require("editorjs-text-alignment-blocktune");

export const EDITOR_JS_TOOLS = {

  //   marker: Marker,
  //   warning: Warning,

  // linkTool: LinkTool,

  anyTuneName: {
    class: AlignmentTuneTool,
    config: {
      default: "left",
      blocks: {
        header: "left",
        list: "left",
      },
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    tunes: ['anyTuneName'],    
  },
  header: {
    class: Header,
    inlineToolbar: true,
    tunes: ['anyTuneName'],       
  },
  list: {
    class: List,
    inlineToolbar: true,
    tunes: ['anyTuneName'],
  },
  embed: {
    class: Embed,
    inlineToolbar: true,
    tunes: ['anyTuneName'],
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
    tunes: ['anyTuneName'],
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    tunes: ['anyTuneName'],
  },
  code: {
    class: Code,
    inlineToolbar: true,
    tunes: ['anyTuneName'],
  },
  delimiter: Delimiter,

  table: {
    class: Table,
    inlineToolbar: false,
    tunes: ['anyTuneName'],
  },
  inlineCode: {
    class: InlineCode,
    inlineToolbar: false,
    tunes: ['anyTuneName'], 
  },


  
  image: {
    class: ImagenMediaTool,
  },
  

  carrouselTool: CarrouselTool,

  // video: {
  //   class: VideoTool,
  //   config: {
  //     uploader: {
  //       /**
  //        * Upload file to the server and return an uploaded video data
  //        * @param {File} file - file selected from the device or pasted by drag-n-drop
  //        * @return {Promise.<{success, file: {url}}>}
  //        */
  //       /**
  //        * Send URL-string to the server. Backend should load video by this URL and return an uploaded video data
  //        * @param {string} url - pasted video URL
  //        * @return {Promise.<{success, file: {url}}>}
  //        */
  //     },
  //   },
  // },



};

