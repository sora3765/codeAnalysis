import * as React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: space-between;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  margin-bottom: 5rem;
  
`

const HeaderTitle = styled.div`
  font-size: 1.5rem;
  font-weight:bold;
  color: #FFF;
  text-shadow: 0 0 0.2em rgba(0,0,0,1);

  line-height:0.95em;
	font-weight:bold;
	color: #FFF;
	text-shadow: 
		0 0 0.05em #6a8af1,
		0 0 0.10em #6a8af1,
		0 0 0.15em #6a8af1,
		0 0 0.30em #6a8af1;
	filter: saturate(80%);

`

const HeaderControl = styled.div`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: center;
  
  & > * {
    margin-left: 0.5rem;
  }
`

interface Props {
  title: string
  children: React.ReactNode
}

export const Header: React.FC<Props> = (props) => (
  <HeaderWrapper>
    <HeaderTitle>
      {props.title}
    </HeaderTitle>
    <HeaderControl>
      {props.children}
    </HeaderControl>
  </HeaderWrapper>
)
