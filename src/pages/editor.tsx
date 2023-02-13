import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button'  
import { SaveModal } from '../components/save_modal'
import { Link } from 'react-router-dom'
import { Header } from '../components/header'


import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'


import AceEditor from "react-ace";
import { javascript } from 'webpack'

//text1のHTML化
import parse from 'html-react-parser';





const { useState } = React


const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 3rem;
`

const HeaderArea = styled.div`
  top: 0;
  left: 0;
  `

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;

color:white;
border:none;
background:#939394;
`



const Preview = styled.div`
display: flex;
  flex-direction: column;
  border-top: 3px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`

const Preview2 = styled.div`
  border-top: 5px solid silver;
  bottom: 0;
  flex-grow: 3; flex-basis: 0;
  overflow-y: scroll;
  padding: 1rem;
  
  right: 0;
  top: 30%;
  width: 50vw;
  white-space: pre-line;
  /* >h2 {
  color: mediumseagreen;
  } */
  `
const Preview3 = styled.div`

bottom: 0;
flex-grow: 1; flex-basis: 0;
overflow-y: scroll;
padding: 1rem;
right: 0;
top: 0;
width: 50vw;
white-space: pre-line;
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`

const HeaderControl = styled.div`
    height: 2rem;
    display: flex;
    align-content: center;
  `



  const text3='<h2>サンプル用コード</h2> &lt;?php <br> echo "a"; <br>echo "b";<br>$i="a";<br>$b="b";<br>for($i=1,$i<5,$i++){<br>echo $i ;<br>}<br>?> </h3>'
  // const text3='<Tooltip title="Copy to Clipboard" placement="top" arrow><IconButton color="primary" size="small" onClick={() => copyToClipboard()}><ContentCopyIcon fontSize="small" /></IconButton></Tooltip><Button onClick={handleCloseDialog}>閉じる</Button>'

  interface Props {
    text: string
    setText: (text: string) => void
  }

  export const Editor: React.FC<Props> = (props) => {
    const { text, setText } = props
    const [showModal, setShowModal] = useState(false)

  return (
    <>
      <HeaderArea>
          <Header title="CodeAnalysis Editor(PHPVer)">
            <Button onClick={() => setShowModal(true)}>
              保存する
            </Button>
            <Link to="/history">
              履歴を見る
            </Link>
            </Header>
        </HeaderArea>
      <Wrapper>
        
      <TextArea
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
        
        <Preview>
            <Preview3>
            {parse(text3)}
            </Preview3>
            <Preview2>
               {textChange(text)}
            </Preview2>
        </Preview>
       
      </Wrapper>
      {showModal && (
          <SaveModal
            onSave={(title: string): void => {
              putMemo(title, text)
              setShowModal(false)
            }}
            onCancel={() => setShowModal(false)}
          />
        )}
    </>
  )
}
/**
 * {
              (function () {
                let textChanged:string= ""
                textChanged = textChange(text)
                let spli: string[] = [];
                spli = textChanged.split(/\n/)
                console.log(spli)
                for (let i = 0; i < spli.length; i++) {
                   if(spli[i]=="<hr>"){
                    
                   }
                   return spli[i]
                }
              }())
            }
 */

let textMain:string[] = new Array();
let dara:string[] = new Array();
//let textMainHtml:string = ""

function textChange(text1: any):any{
  let spli: string[] = [];
  spli = text1.split(/\n|"| /)
  let spilCopy = spli.slice()
  searchPhp(spli)
  spli.filter(Number.isFinite)
  console.log(textMain)
  //console.log(spli)
  //text1 = spli.join('\n')
  let textMainHtml:string = ""
  text1 = textMain.join('\n')
  console.log(text1)
  console.log(textMain[0])
  console.log(dara)
  for(var i = 0;i<textMain.length;i++){
    if(textMain[i] == "<hr>"){
      textMainHtml = textMainHtml+'<hr></hr>'
    }else{
      textMainHtml = textMainHtml+textMain[i]
    }
  }
  //console.log(textMainHtml)
  console.log(text1)
  return <h2>{parse(text1)}</h2>
}


function searchPhp(text2: any):any{
  textMain = [];
  var d = "$"
  var fo= "for"
  var forin=0
  try{
  for(var i = 0;i<text2.length;i++){
    var e = text2[i]
     if(text2[i] == '<?php'){
      text2[i]="php開始"
      // text2.splice(i+1,0,"\n")
      textMain.push("<font color='red'>php 開始</font>")
      textMain.push("<hr>")
      //textMain.push('<hr size="10">')
     }else if(text2[i] == '?>'){
      text2[i]="php終了" 
      textMain.push("<hr>")
      textMain.push("<font color='red'>php 終了</font>")
     }else if(text2[i] == 'echo' ){
      text2[i]="出力↓"
      textMain.push("<font color=rgb(60, 179, 113)>出力↓</font>")
      for(var j=0;text2[i+j]==";";j++){
      textMain.push(text2[i+j])
      i=i+1
      }
     }else if(text2[i]==";"){

     }else if(text2[i].indexOf(fo)===0){
      textMain.push("<hr color='#4785f8'>")
      textMain.push("<font color=#4785f8>ループ</font>"+text2[i].slice(3))
      forin=1
     }else if(text2[i]=="}"){
      if(forin==1){
        textMain.push("}")
        textMain.push("<hr color='#4785f8'>")
        forin=0
      }else{
        textMain.push(text2[i])
      }
     }else if(text2[i]=="$"){
      
     }else if(text2[i].indexOf(d)===0){
      if(dara.includes(text2[i])===false){
      textMain.push("変数<font color=#eb2698>"+text2[i]+"</font>に<font color=#eb2698>"+text2[i+1]+"</font>を代入")
        dara.push(text2[i].slice( 0, -1))
        dara.push(text2[i+1])
        i++
      }else{
        var da= dara.indexOf(text2[i+1])
        textMain.push("<font color='#eb2698'>"+text2[i]+"</font>")
        
      }
      
     }else{
      if(text2[i]!=""){
        textMain.push(text2[i])
      }
     }
  }
  return text2
} catch (e: unknown) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
}



function inHtml(text1: any):any{
  let inhtml = ""
}