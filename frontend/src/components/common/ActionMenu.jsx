import React from 'react'
import {ActionList, ActionMenu} from '@primer/react'

export default function Dividers() {
  return (
    <ActionMenu>
      <ActionMenu.Button>Options</ActionMenu.Button>
      <ActionMenu.Overlay>
        <ActionList showDividers aria-label="Watch preference options">
          <ActionList.Item
            onSelect={() => {
              alert('Item one clicked')
            }}
          >
            Item one
            <ActionList.Description variant="block">
              Description about item one that is kind of long and bulky
            </ActionList.Description>
          </ActionList.Item>
          <ActionList.Item
            onSelect={() => {
              alert('Item two clicked')
            }}
          >
            Item two
            <ActionList.Description variant="block">
              A long and bulky description for the second item
            </ActionList.Description>
          </ActionList.Item>
          <ActionList.Item
            onSelect={() => {
              alert('Item three clicked')
            }}
          >
            Item three
            <ActionList.Description variant="block">
              One last and long bulky description we will use for the third item
            </ActionList.Description>
          </ActionList.Item>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  )
}
