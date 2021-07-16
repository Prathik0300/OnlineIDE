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


    
    useEffect(()=>{
        setLanguageIndex(Index[selectedLanguage]);
    },[selectedLanguage])

    const ChangeSelectedLanguage = (language) =>{
        setSelectedLanguage(language);
    }

    // const FileToView = FileComponents[FileIndex-1];

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
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
                <div id="editor" className="col-5">
                    <Editor language={selectedLanguage} TitleName={selectedLanguage=='xml'?"html":selectedLanguage} value={"f"} onChange={"f"}/>
                </div>
            </div>
        </div>
    )
}

export default Explorer;
