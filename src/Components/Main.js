import { useEffect, useState } from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Editor from "./Editor";

const Index ={
    'xml' : 1,
    'css' : 2,
    'js' : 3
}

function Main(){

    const [selectedLanguage,setSelectedLanguage] = useState('xml');
    const [LanguageIndex,setLanguageIndex] = useState(1);
    const [html,setHtml] = useState('');
    const [css,setCss] = useState('');
    const [js,setJs] = useState('');

    const RenderDoc = `
    <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
    </html>
    `    

    useEffect(()=>{
        setLanguageIndex(Index[selectedLanguage]);
    },[selectedLanguage])

    const ChangeSelectedLanguage = (language) =>{
        setSelectedLanguage(language);
    }

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
                                <div className="PaneContent" onClick={() => ChangeSelectedLanguage('xml')}>
                                    index.html
                                </div>
                                <div className="PaneContent" onClick={() => ChangeSelectedLanguage('css')}>
                                    index.css
                                </div>
                                <div className="PaneContent" onClick={() => ChangeSelectedLanguage('js')}>
                                    index.js
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="EditDiv">
                        <div className="editor">
                            <div id="EditorComponent">
                                <Editor language={selectedLanguage} TitleName={selectedLanguage=='xml'?"html":selectedLanguage} value={LanguageIndex==1 ? html:LanguageIndex==2 ? css : js} onChange={LanguageIndex==1 ? setHtml : LanguageIndex==2 ? setCss : setJs}/>
                            </div>
                        </div>

                        <div className="output">
                            <div className="iframeDiv">
                                <iframe
                                    srcDoc={RenderDoc}
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
