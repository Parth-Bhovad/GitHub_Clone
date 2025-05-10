import React from 'react'
import {Blankslate} from '@primer/react/experimental'
import {BookIcon} from '@primer/octicons-react'

export default function Default() {
  return (
    <Blankslate>
      <Blankslate.Visual>
        <BookIcon size="medium" />
      </Blankslate.Visual>
      <Blankslate.Heading>Add a README</Blankslate.Heading>
      <Blankslate.Description>
      Add a README with an overview of your project.
      </Blankslate.Description>
      <Blankslate.PrimaryAction>Add a README</Blankslate.PrimaryAction>
    </Blankslate>
  )
}
