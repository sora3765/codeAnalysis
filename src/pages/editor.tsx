import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import * as ReactMarkdown from 'react-markdown'
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button'  
import { SaveModal } from '../components/save_modal'
import { Link } from 'react-router-dom'
import { Header } from '../components/header'

import AceEditor from "react-ace";



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
`



const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`

const Preview2 = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 30%;
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
          <Header title="CodeAnalysis Editor">
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
        <Flex>
        <Preview>
            <>{text}</>
            <br></br>
            <Preview2>
               {textChange(text)}
            </Preview2>
        </Preview>

       </Flex>
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
  for(var i = 0;i<textMain.length;i++){
    if(textMain[i] == "<hr>"){
      textMainHtml = textMainHtml+'<hr></hr>'
    }else{
      textMainHtml = textMainHtml+textMain[i]
    }
  }
  console.log(textMainHtml)
  return <h2>{text1}</h2>
}


function searchPhp(text2: any):any{
  textMain = [];
  for(var i = 0;i<10;i++){
     if(text2[i] == '<php?'){
      text2[i]="php開始"
      text2.splice(i+1,0,"\n")
      textMain.push("php 開始")
      textMain.push("<hr>")
      //textMain.push('<hr size="10">')
     }else if(text2[i] == '?>'){
      text2[i]="php終了"
      textMain.push("php 終了")
     }else if(text2[i] == 'echo' ){
      text2[i]="出力↓"
      textMain.push("出力↓")
      for(var j = 1;;j++){
        if(text2[i+j] == ""){
        }else{
          textMain.push(text2[i+j])
          break
        }
      }
     }
  }
  return text2
}