import { useEffect, useState } from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Editor from "./Editor";
import {BsCodeSlash} from "react-icons/bs";


// Constant objects to get the Extension Index and Extension names
const Index ={
    'xml' : 0,
    'css' : 1,
    'js' : 2
}

const Ext = {
    0 : "xml",
    1 : "css",
    2 : "js"
}

// List of filenames
const fileNames = ["index.html","index.css","index.js"]

function Main(){

    // Initializing State Variables
    const [selectedLanguage,setSelectedLanguage] = useState('xml');
    const [LanguageIndex,setLanguageIndex] = useState(1);
    const [html,setHtml] = useState('');
    const [css,setCss] = useState('');
    const [js,setJs] = useState('');
    const [SrcFile,setSrcFile] = useState('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcFile(`
            <html>
                <body>${html}</body>
                <style>${css}</style>
                <script>${js}</script>
            </html>
            ` )
        },200)

        return () => clearTimeout(timeout)
    },[html,css,js])

    useEffect(()=>{
        setLanguageIndex(Index[selectedLanguage]);
    },[selectedLanguage])

    // Function Handler to change selected language on clicking the file which will result in viewing the contents of that file in the editor
    const ChangeSelectedLanguage = (language,idx) =>{
        setSelectedLanguage(language);
        setLanguageIndex(idx);
    }

    // Mapping of the list of files into div 
    const explorer = fileNames.map((file,idx) => {
        return(
            <div key={idx} className={`PaneContent ${idx===LanguageIndex ? "active" : ""}`} onClick={() => ChangeSelectedLanguage(Ext[idx],idx)}>
                {file}
            </div>
        )
    })
  
    return(
        <>
            <div className="custom-container">
                <div className="custom-row">
                    <div className="ExplorerDiv">
                        <div id="Pane">
                            <div id="PaneTitle">
                                <b><BsCodeSlash className="WebLogo" style={{marginRight:"0.5rem"}}/></b>
                                <i>Easy Coder</i>
                            </div>
                            <div id="PaneContents">
                                {explorer}
                            </div>
                        </div>
                    </div>

                    <div className="EditDiv">
                        <div className="editor">
                            <div id="EditorComponent">
                                <Editor language={selectedLanguage} TitleName={selectedLanguage=='xml'?"html":selectedLanguage} value={LanguageIndex==0 ? html:LanguageIndex==1 ? css : js} onChange={LanguageIndex==0 ? setHtml : LanguageIndex==1 ? setCss : setJs} fileName={fileNames[LanguageIndex]}/>
                            </div>
                        </div>
                        
                        <div className="output">
                            <div className="iframeDiv">
                                <iframe
                                    srcDoc={SrcFile}
                                    title="Output"
                                    sandbox="allow-scripts"
                                    frameBorder="0"
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;
