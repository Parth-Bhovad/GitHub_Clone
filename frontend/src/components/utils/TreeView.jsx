import React from 'react'
import { TreeView } from '@primer/react'

export default function Default() {
    return (
        <TreeView aria-label="Files changed">
            <TreeView.Item id="parent-node-one" defaultExpanded>
                Parent node
                <TreeView.SubTree>
                    <TreeView.Item id="child-node-one">Child node one</TreeView.Item>
                    <TreeView.Item id="child-node-two" current>
                        Child node two
                    </TreeView.Item>
                </TreeView.SubTree>
            </TreeView.Item>
            <TreeView.Item id="sibling-node-one">Sibling node one</TreeView.Item>
            <TreeView.Item id="sibling-node-two">Sibling node two</TreeView.Item>
        </TreeView>
    )
}
