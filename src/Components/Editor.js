import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "pastebin-api";
import {FaShareAltSquare} from "react-icons/fa"
import { Controlled } from 'react-codemirror2';

const axios = require("axios");

const url = "https://cors-anywhere.herokuapp.com/https://pastebin.com/api/api_post.php";

let config = {
    "Access-Control-Allow-Origin": window.location.origin.toString(),
    "Access-Control-Allow-Credentials":true,
    "Access-Control-Allow-Methods" : "POST",
    "Access-Control-Allow-Headers":"Content-Type"
}

function Editor({language,TitleName,value,onChange,fileName}){

    function handleChange(editor,data,value){
        onChange(value)
    }

    async function GetSharableLink(){
        await axios.post(url,{
            api_dev_key:'Ct9mTFHBnNDXoqPE05KdOatFFsgzwfuJ',
            api_option:"paste",
            api_paste_code:{value},
            api_paste_name:{fileName}
        },config).then((response) => {
            window.alert("Yout Sharable Link : ",response);
        });
    };

    return(
        <div className="editor-container">
            <div className="editor-title" style={{marginTop:"15px",color:"white"}}>
                <span><b>index.{TitleName}</b></span>
                <span className="shareBtn" onClick={() => GetSharableLink()}>
                    <FaShareAltSquare/>                    
                </span>
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