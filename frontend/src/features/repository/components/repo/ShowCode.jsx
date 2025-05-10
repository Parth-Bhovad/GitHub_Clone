import { Splitter, SplitterPanel } from 'primereact/splitter';
import TreeView from "../../../../components/common/TreeView";
import "../../styles/showCode.css";

//import custom hooks
import { useRepoContext } from '../../context/useRepoContext';

export default function ShowCode() {

    const { fetchFileContent, extension, fileContent } = useRepoContext();

    return (
        <Splitter style={{ height: '300px' }}>
            <SplitterPanel className="flex align-items-center justify-content-center split">
                <TreeView />
            </SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center">
                <pre style={{ whiteSpace: "pre-wrap" }} className='line-numbers'><code className={`language-${extension}`}>{fileContent}</code></pre>
            </SplitterPanel>
        </Splitter>
    );
}