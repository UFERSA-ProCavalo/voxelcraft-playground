import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';
import { useOutletContext } from 'react-router';
import { useDebounce } from '@libs/utils';
import { LeftPanel } from '../components/LeftPanel/LeftPanel';
import { RightPanel } from '../components/RightPanel/RightPanel';
import { usePlaygroundStore } from '../lib/store';

export default function PlaygroundPage() {
  const {
    code,
    setCode,
    selectedChallengeId,
    setSelectedChallengeId,
  } = usePlaygroundStore();
  const debouncedCode = useDebounce(code, 200);
  const { headerHeight = 0 } = useOutletContext() as { headerHeight: number };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <PanelGroup direction="horizontal" style={{ flex: 1 }}>
        <Panel defaultSize={33}>
          <LeftPanel
            code={code}
            setCode={setCode}
            selectedChallengeId={selectedChallengeId}
            setSelectedChallengeId={setSelectedChallengeId}
          />
        </Panel>
        
        <Panel defaultSize={67}>
          <RightPanel code={debouncedCode} perfOffset={headerHeight} />
        </Panel>
      </PanelGroup>
    </div>
  );
}
