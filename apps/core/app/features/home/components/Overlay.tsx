
import React from 'react';
import { Scroll } from '@react-three/drei';
import Section from './Section';

const TeamMemberCard = ({ name, role }: { name: string, role: string }) => (
  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center border border-white/20 transition-all hover:bg-white/20 hover:border-white/30">
    <h4 className="font-bold text-lg text-cyan-300">{name}</h4>
    <p className="text-sm text-white/80">{role}</p>
  </div>
);


export default function Overlay() {
  return (
    <Scroll html>
      <div className="w-screen">
        <Section title="🧠 Idealização">
          <p className="max-w-3xl text-lg md:text-xl text-center text-white/90 leading-relaxed">
            A proposta nasceu como parte de um trabalho avaliativo para a disciplina de Sistemas Multimídia da Universidade Federal do Semiárido (UFERSA). A equipe, movida pelo interesse comum em computação gráfica e modelagem tridimensional, idealizou uma solução que tornasse acessível a criação de arte em 3D. Inspirados por desenhos simples construídos com lógica e matemática, o objetivo inicial era desenvolver um site que permitisse a criação de formas tridimensionais — de forma intuitiva, visual e divertida — a partir de blocos básicos (voxels).
          </p>
        </Section>
        
        <Section title="🎯 Objetivo">
           <p className="max-w-3xl text-lg md:text-xl text-center text-white/90 leading-relaxed">
            Nosso objetivo é desenvolver uma plataforma gratuita, totalmente acessível via navegador, que permita aos usuários criar objetos 3D baseados em voxels, combinando programação, matemática e elementos interativos. A ferramenta visa estimular o aprendizado por meio da criatividade e da experimentação, utilizando elementos gamificados para incentivar o engajamento, o raciocínio lógico e o domínio de conceitos fundamentais de modelagem 3D.
          </p>
        </Section>
        
        <Section title="⚙️ Funcionalidades">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-purple-300 mb-2">🎯 Desafios interativos</h3>
                    <p className="text-white/80">O sistema apresenta imagens-modelo, e o usuário deve recriá-las com precisão utilizando voxels. Um feedback visual e percentual indica o quão fiel está a reprodução.</p>
                </div>
                 <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-purple-300 mb-2">✏️ Modo livre de criação</h3>
                    <p className="text-white/80">Ideal para explorar ideias, testar combinações e construir livremente qualquer forma tridimensional.</p>
                </div>
                 <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-purple-300 mb-2">📦 Exportação de projetos</h3>
                    <p className="text-white/80">Converta suas criações voxelizadas em arquivos de objetos 3D (.obj ou .glb), prontos para serem usados em jogos, animações ou impressões 3D.</p>
                </div>
                 <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-purple-300 mb-2">🤖 Integração com o Gemini (IA)</h3>
                    <p className="text-white/80">Assistência automatizada para dúvidas de programação, sugestões de código e resolução de problemas durante o processo criativo.</p>
                </div>
            </div>
        </Section>

        <Section title="👥 Equipe">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full px-4">
            <TeamMemberCard name="[Nome 1]" role="Desenvolvimento Frontend & Modelagem 3D" />
            <TeamMemberCard name="[Nome 2]" role="Lógica de Programação & Integração com IA" />
            <TeamMemberCard name="[Nome 3]" role="Design de Interface & Experiência do Usuário" />
            <TeamMemberCard name="[Nome 4]" role="Estrutura de Dados & Exportação de Objetos" />
            <TeamMemberCard name="[Nome 5]" role="Documentação & Testes" />
          </div>
        </Section>

        <Section>
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Pronto para criar?</h2>
                <p className="text-white/80 text-lg">Junte-se a nós nesta jornada criativa.</p>
            </div>
        </Section>
      </div>
    </Scroll>
  );
}
