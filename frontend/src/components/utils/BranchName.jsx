import React from 'react'
import {BranchName} from '@primer/react'
import {Stack} from '@primer/react/experimental'
import {GitBranchIcon} from '@primer/octicons-react'

export default function Icon() {
  return (
    <BranchName>
      <Stack direction="horizontal" gap="condensed" align="center">
        <GitBranchIcon />
        branch_name
      </Stack>
    </BranchName>
  )
}
