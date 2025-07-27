import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { useDebounce } from '@libs/utils';
import { LeftPanel } from '../components/LeftPanel/LeftPanel';
import { RightPanel } from '../components/RightPanel/RightPanel';

export default function PlaygroundPage() {
  const [code, setCode] = useState('// Write code here\n');
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const debouncedCode = useDebounce(code, 200);
  const { headerHeight = 0 } = useOutletContext() as { headerHeight: number };

  return (
    <div
      style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}
    >
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, borderRight: '1px solid #eee', minWidth: 0 }}>
          <LeftPanel
            code={code}
            setCode={setCode}
            selectedChallengeId={selectedChallengeId}
            setSelectedChallengeId={setSelectedChallengeId}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <RightPanel code={debouncedCode} perfOffset={headerHeight} />
        </div>
      </div>
    </div>
  );
}
