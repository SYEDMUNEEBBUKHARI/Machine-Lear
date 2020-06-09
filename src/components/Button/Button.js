import React from 'react';
import styled from 'styled-components'
import {Button } from 'react-bootstrap'
const Ste= styled.div`

background-color: red;
color:black;


`
function red(){
    return(
<React.Fragment>
    <Ste><Button>login</Button>

<Button>Register</Button>
</Ste>

</React.Fragment>
    );}


export default red;