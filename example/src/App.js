/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './css/spectre.min.css'
import './css/spectre-icons.min.css'

import React, { useState } from 'react'
import ReactJson from 'react-json-view'

import BasicSchemaExample from './basic-schema'
import BasicSchemaExampleJSON from './basic-schema/basic-schema.json'
import BasicSchemaExampleCode from '!!raw-loader!./basic-schema/index.js';

import NestedSchemaExample from './nested-schema'
import NestedSchemaExampleJSON from './nested-schema/nested-schema.json'
import NestedSchemaExampleCode from '!!raw-loader!./nested-schema/index.js';

import CustomWrapperExample from './custom-wrapper'
import CustomWrapperExampleJSON from './custom-wrapper/custom-wrapper-schema.json'
import CustomWrapperExampleCode from '!!raw-loader!./custom-wrapper/index.js';

import CustomRegistryExample from './custom-registry'
import CustomRegistryExampleJSON from './custom-registry/custom-registry-schema.json'
import CustomRegistryExampleCode from '!!raw-loader!./custom-registry/index.js';

const App = () => {

  const [selected, setSelected] = useState(parseInt(window.location.hash.substr(1)) || 0)
  const tabs = [
    {
      title: 'Basic Example',
      component: <BasicSchemaExample />,
      code: BasicSchemaExampleCode,
      schema: BasicSchemaExampleJSON
    },
    {
      title: 'Nested Schema',
      component: <NestedSchemaExample />,
      code: NestedSchemaExampleCode,
      schema: NestedSchemaExampleJSON
    },
    {
      title: 'Custom Wrapper',
      component: <CustomWrapperExample />,
      code: CustomWrapperExampleCode,
      schema: CustomWrapperExampleJSON
    },
    {
      title: 'Custom Registry',
      component: <CustomRegistryExample />,
      code: CustomRegistryExampleCode,
      schema: CustomRegistryExampleJSON
    }
  ]

  const handleTabChange = (idx) => () => {
    setSelected(idx)

  }

  return (
    <div className="container">
      <div className="columns">
        <div className="column col-3">
          <ul className="nav">
            {tabs.map((tab, index) => <li key={index} className={`nav-item ${index === selected ? 'active' : ''}`} onClick={handleTabChange(index)}>
              <a href={`#${index}`}>{tab.title}</a>
            </li>)}
          </ul >
        </div>
        <div className="column col-9">
          <div className="card">
            <div className="card-header">
              <div className="card-title h5">{tabs[selected].title}</div>
              <div className="card-subtitle text-gray">Generated Form</div>
            </div>
            <div className="card-body">
              {tabs[selected].component}
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h4>Code</h4>
              <pre className="code" data-lang="JS">
                <code>
                  {tabs[selected].code}
                </code>
              </pre>
              <h4>Schema</h4>
              <ReactJson src={tabs[selected].schema} />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default App
