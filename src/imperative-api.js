

/*
    Oui is mostly a stateless library. UI is declared using plain js objects and
    oui simply maps them to controllers. This workflow serves the functional
    community quite well, however many people prefer a more idiomatic imperative
    api without having to maintain state themselves.

    This module covers those scenarios where you just want to fire up the ui,
    without having to worry about merging in UI changes.

    Changes are deeply merged into the api object and the UI is automatically
    re-rendered.
*/


import React from 'react'
import dom from 'react-dom'
import Tree from './render-tree'
import Panel from './controls/panel'
import domElement from './dom'
import merge from './deep-merge'


export default opts => {

    /*

    */

    let container = document.createElement('div')
    domElement.appendChild( container )

    const render = api => {
        let onChange = change => render( merge( api, change ))
        let Element = <Panel { ...opts }>{ Tree( api, onChange )}</Panel>
        dom.render( Element , container )
    }

    const destroy = _ => {
        dom.unmountComponentAtNode( container )
        domElement.removeChild( container )
        container = null
    }

    return { render, destroy }

}