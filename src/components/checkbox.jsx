import React from 'react'
import { Dropdown, Input } from 'semantic-ui-react'

const tagOptions = [
  {
    key: 'Dog',
    text: 'Dog',
    value: 'Dog',
    label: { color: 'red', empty: true, circular: true },
  },
  {
    key: 'Cat',
    text: 'Cat',
    value: 'Cat',
    label: { color: 'blue', empty: true, circular: true },
  },
  {
    key: 'Other',
    text: 'Other',
    value: 'Other',
    label: { color: 'black', empty: true, circular: true },
  },
  
]

const DropdownExampleMultipleSearchInMenu = () => (
  <Dropdown text='Filter Posts' multiple icon='filter'>
    <Dropdown.Menu>
      <Input icon='search' iconPosition='left' className='search' />
      <Dropdown.Divider />
      <Dropdown.Header icon='tags' content='Tag Label' />
      <Dropdown.Menu scrolling>
        {tagOptions.map((option) => (
          <Dropdown.Item key={option.value} {...option} />
        ))}
      </Dropdown.Menu>
    </Dropdown.Menu>
  </Dropdown>
)

export default DropdownExampleMultipleSearchInMenu