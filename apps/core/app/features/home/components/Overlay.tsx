import React from "react";
import { Scroll } from "@react-three/drei";
import Section from "./Section";

const TeamMemberCard = ({ name, role }: { name: string; role: string }) => (
  <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg text-center border border-border transition-all hover:bg-card/60 hover:border-accent">
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-accent mb-1">{name}</h4>
    <p className="text-muted-foreground text-sm">{role}</p>
  </div>
);

export default function Overlay() {
  return (
    <Scroll html>
      {/* Each section is absolutely positioned at N * 100vh */}
      <Section
        title="🧠 Idealização"
        headingLevel={1}
        style={{ position: 'absolute', top: 0 * 100 + 'vh', left: 0, width: '100vw' }}
      >
        <p className="text-muted-foreground text-xl leading-7 [&:not(:first-child)]:mt-6 max-w-3xl text-center">
          A proposta nasceu como parte de um trabalho avaliativo para a
          disciplina de Sistemas Multimídia da Universidade Federal do
          Semiárido (UFERSA). A equipe, movida pelo interesse comum em
          computação gráfica e modelagem tridimensional, idealizou uma solução
          que tornasse acessível a criação de arte em 3D. Inspirados por
          desenhos simples construídos com lógica e matemática, o objetivo
          inicial era desenvolver um site que permitisse a criação de formas
          tridimensionais — de forma intuitiva, visual e divertida — a partir
          de blocos básicos (voxels).
        </p>
      </Section>

      <Section
        title="🎯 Objetivo"
        headingLevel={2}
        style={{ position: 'absolute', top: 1 * 100 + 'vh', left: 0, width: '100vw' }}
      >
        <p className="leading-7 [&:not(:first-child)]:mt-6 max-w-3xl text-center text-foreground/90">
          Nosso objetivo é desenvolver uma plataforma gratuita, totalmente
          acessível via navegador, que permita aos usuários criar objetos 3D
          baseados em voxels, combinando programação, matemática e elementos
          interativos. A ferramenta visa estimular o aprendizado por meio da
          criatividade e da experimentação, utilizando elementos gamificados
          para incentivar o engajamento, o raciocínio lógico e o domínio de
          conceitos fundamentais de modelagem 3D.
        </p>
      </Section>

      <Section
        title="⚙️ Funcionalidades"
        headingLevel={2}
        style={{ position: 'absolute', top: 2 * 100 + 'vh', left: 0, width: '100vw' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
          <div className="bg-card/80 backdrop-blur-md p-6 rounded-xl border border-border">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2 text-primary">
              🎯 Desafios interativos
            </h3>
            <p className="leading-7 text-muted-foreground">
              O sistema apresenta imagens-modelo, e o usuário deve recriá-las
              com precisão utilizando voxels. Um feedback visual e percentual
              indica o quão fiel está a reprodução.
            </p>
          </div>
          <div className="bg-card/80 backdrop-blur-md p-6 rounded-xl border border-border">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2 text-primary">
              ✏️ Modo livre de criação
            </h3>
            <p className="leading-7 text-muted-foreground">
              Ideal para explorar ideias, testar combinações e construir
              livremente qualquer forma tridimensional.
            </p>
          </div>
          <div className="bg-card/80 backdrop-blur-md p-6 rounded-xl border border-border">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2 text-primary">
              📦 Exportação de projetos
            </h3>
            <p className="leading-7 text-muted-foreground">
              Converta suas criações voxelizadas em arquivos de objetos 3D
              (.obj ou .glb), prontos para serem usados em jogos, animações ou
              impressões 3D.
            </p>
          </div>
          <div className="bg-card/80 backdrop-blur-md p-6 rounded-xl border border-border">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2 text-primary">
              🤖 Integração com o Gemini (IA)
            </h3>
            <p className="leading-7 text-muted-foreground">
              Assistência automatizada para dúvidas de programação, sugestões
              de código e resolução de problemas durante o processo criativo.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="👥 Equipe"
        style={{ position: 'absolute', top: 3 * 100 + 'vh', left: 0, width: '100vw' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full px-4 text-foreground">
          <TeamMemberCard
            name="[Nome 1]"
            role="Desenvolvimento Frontend & Modelagem 3D"
          />
          <TeamMemberCard
            name="[Nome 2]"
            role="Lógica de Programação & Integração com IA"
          />
          <TeamMemberCard
            name="[Nome 3]"
            role="Design de Interface & Experiência do Usuário"
          />
          <TeamMemberCard
            name="[Nome 4]"
            role="Estrutura de Dados & Exportação de Objetos"
          />
          <TeamMemberCard name="[Nome 5]" role="Documentação & Testes" />
        </div>
      </Section>

      <Section
        headingLevel={2}
        style={{ position: 'absolute', top: 4 * 100 + 'vh', left: 0, width: '100vw' }}
      >
        <div className="text-center">
          <h2 className="scroll-m-20 text-6xl font-extrabold tracking-tight text-balance mb-6">
            Pronto para criar?
          </h2>
          <p className="text-muted-foreground text-xl leading-7 max-w-2xl mx-auto">
            Junte-se a nós nesta jornada criativa.
          </p>
        </div>
      </Section>
    </Scroll>
  );
}
