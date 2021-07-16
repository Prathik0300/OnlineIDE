import { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../App.css";


const HtmlFile = "../Public/index.html";
let FileContent = "";
function Html(){
    
//     fetch(HtmlFile)
//     .then( r => r.text() )
//    .then( t => FileContent=t )

//    console.log(FileContent);


    var file = new File(['index'],"../Public/index.html",{
        type:"text/plain",
    });

    console.log(file);

    let readFile = function(path) {
        let reader = new FileReader();
    
        reader.onload = function(e) {
            var text = reader.result;
            console.log("1,: ",text);
        };
    
        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
    };

    readFile(file);

    return(
        <div>
            Hello html file. edit me!
            <br/><br/>
            {FileContent}
        </div>
    )
}

export default Html;