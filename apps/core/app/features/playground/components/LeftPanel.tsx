import { useState } from 'react';
import { CodeEditor } from './Editor/CodeEditor';
import { challenges } from '../challenges';
import type { Challenge, ChallengeDifficulty } from '../types';
import { Button } from './ui/button';

const DIFFICULTIES: { label: string; value: ChallengeDifficulty }[] = [
  { label: 'Tutorial', value: 'tutorial' },
  { label: 'Iniciante', value: 'iniciante' },
  { label: 'Desafiador', value: 'desafiador' },
];

export function LeftPanel({ code, setCode, selectedChallengeId, setSelectedChallengeId }: {
  code: string;
  setCode: (c: string) => void;
  selectedChallengeId: string | null;
  setSelectedChallengeId: (id: string) => void;
}) {
  const [tab, setTab] = useState<'editor' | 'challenges'>('editor');
  const [difficulty, setDifficulty] = useState<ChallengeDifficulty>('tutorial');

  const filteredChallenges = challenges.filter(c => c.difficulty === difficulty);
  const selectedChallenge = challenges.find(c => c.id === selectedChallengeId) ?? filteredChallenges[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', flex: 1, minWidth: 0, minHeight: 0, alignSelf: 'stretch', borderRight: '1px solid #eee' }}>
      {/* Vertical Tabs */}
      <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #eee', background: '#fafbfc' }}>
        <Button variant={tab === 'editor' ? 'default' : 'ghost'} onClick={() => setTab('editor')} style={{ borderRadius: 0, minWidth: 48, minHeight: 48 }}>Editor</Button>
        <Button variant={tab === 'challenges' ? 'default' : 'ghost'} onClick={() => setTab('challenges')} style={{ borderRadius: 0, minWidth: 48, minHeight: 48 }}>Desafios</Button>
      </div>
      {/* Tab Content */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
        {tab === 'editor' && (
          <div style={{ height: '100%' }}>
            <CodeEditor code={code} onChange={setCode} />
          </div>
        )}
        {tab === 'challenges' && (
          <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {DIFFICULTIES.map(d => (
                <Button key={d.value} variant={difficulty === d.value ? 'default' : 'outline'} size="sm" onClick={() => setDifficulty(d.value)}>{d.label}</Button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {filteredChallenges.map(ch => (
                    <li key={ch.id}>
                      <Button
                        variant={selectedChallenge?.id === ch.id ? 'default' : 'ghost'}
                        size="sm"
                        style={{ width: '100%', justifyContent: 'flex-start', marginBottom: 4 }}
                        onClick={() => setSelectedChallengeId(ch.id)}
                      >
                        {ch.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ flex: 2, minWidth: 0 }}>
                {selectedChallenge && (
                  <div>
                    <h3 style={{ margin: '0 0 8px 0' }}>{selectedChallenge.name}</h3>
                    <p style={{ margin: '0 0 8px 0', fontSize: 14 }}>{selectedChallenge.description}</p>
                    <pre style={{ background: '#f6f6f6', padding: 8, borderRadius: 4, fontSize: 13, marginBottom: 8 }}>{selectedChallenge.starterCode}</pre>
                    {/* TODO: Add preview of expectedVoxels here */}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
