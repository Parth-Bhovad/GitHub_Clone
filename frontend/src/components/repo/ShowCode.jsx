import React from 'react'; 
import { Splitter, SplitterPanel } from 'primereact/splitter';
import TreeView from "../utils/TreeView"
import "./ShowCode.css"

export default function HorizontalDemo() {
    return (
        <Splitter style={{ height: '300px' }}>
            <SplitterPanel className="flex align-items-center justify-content-center split"><TreeView/></SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus pariatur temporibus quos sed, asperiores illum nulla harum esse earum aliquam. Ratione ab tempore at ipsam repellat delectus reiciendis temporibus doloribus.</SplitterPanel>
        </Splitter>
    )
}