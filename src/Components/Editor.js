import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import { Controlled } from 'react-codemirror2';

function Editor({language,TitleName,value,onChange}){

    function handleChange(editor,data,value){
        onChange(value)
    }

    return(
        <div className="editor-container">
            <div className="editor-title" style={{marginTop:"15px",color:"white"}}>
                <b>index.{TitleName}</b>
            </div>
            <br/>
            <Controlled
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping:true,
                    lint:true,
                    mode:language,
                    theme:"material",
                    lineNumbers:true,  
                    scrollbarStyle:null                  
                }}
            />
        </div>
    )

}

export default Editor;