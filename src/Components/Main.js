import { useEffect, useState } from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Editor from "./Editor";

const Index ={
    'xml' : 1,
    'css' : 2,
    'js' : 3
}

const Ext = {
    0 : "xml",
    1 : "css",
    2 : "js"
}

const fileNames = ["index.html","index.css","index.js"]

function Main(){

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

    const ChangeSelectedLanguage = (language,idx) =>{
        setSelectedLanguage(language);
        setLanguageIndex(idx+1);
    }

    

    const explorer = fileNames.map((file,idx) => {
        return(
            <div key={idx} className={`PaneContent ${idx===LanguageIndex-1 ? "active" : ""}`} onClick={() => ChangeSelectedLanguage(Ext[idx],idx)}>
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
                                <i>File Explorer</i>
                            </div>
                            <div id="PaneContents">
                                {explorer}
                            </div>
                        </div>
                    </div>

                    <div className="EditDiv">
                        <div className="editor">
                            <div id="EditorComponent">
                                <Editor language={selectedLanguage} TitleName={selectedLanguage=='xml'?"html":selectedLanguage} value={LanguageIndex==1 ? html:LanguageIndex==2 ? css : js} onChange={LanguageIndex==1 ? setHtml : LanguageIndex==2 ? setCss : setJs} fileName={fileNames[LanguageIndex-1]}/>
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
