import { useEffect, useState } from 'react';
import { Button,Input } from "reactstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
// import Editor from './Editor';
import Html from "./HtmlFile";
import Css from "./CssFile";
import Js from "./JsFile";
import Editor from "./Editor";

const Index ={
    'xml' : 1,
    'css' : 2,
    'js' : 3
}

const FileComponents = [<Html/>,<Css/>,<Js/>]

function Explorer(){

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

    useEffect(() => {
        setHtml(html)
    },[])
    useEffect(()=>{
        setLanguageIndex(Index[selectedLanguage]);
    },[selectedLanguage])

    const ChangeSelectedLanguage = (language) =>{
        setSelectedLanguage(language);
    }

    // const FileToView = FileComponents[FileIndex-1];

    return(
        <div className="container-fluid">
            <div className="ComponentDiv">
                <div>
                    <div id="LeftPane">
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
                <div className="EditDiv">
                    <div id="editor">
                        <Editor language={selectedLanguage} TitleName={selectedLanguage=='xml'?"html":selectedLanguage} value={LanguageIndex==1 ? html:LanguageIndex==2 ? css : js} onChange={LanguageIndex==1 ? setHtml : LanguageIndex==2 ? setCss : setJs}/>
                    </div>

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
    )
}

export default Explorer;
