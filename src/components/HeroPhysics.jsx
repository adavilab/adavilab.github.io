import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

import { useLanguage } from '../context/LanguageContext';

const HeroPhysics = () => {
  const { t, language } = useLanguage();
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodyData = useRef(new Map()); // guardar datos externamente para evitar que se pierdan al cambiar de idioma

  useEffect(() => {
    const canvas = sceneRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // tamaño del canvas
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    // módulos de Matter.js
    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Body = Matter.Body;

    // motor
    const engine = Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    // física del espacio
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    const commonOptions = {
      frictionAir: 0.001,
      restitution: 0.9,
    };

    const bodies = [];
    bodyData.current.clear();

    const isMobile = width < 768;

    // tipo a: skills principales
    const mainSkills = [
      { key: 'react', label: 'React', color: '#8b5cf6' },
      { key: 'strategy', label: 'Product Management', color: '#06b6d4' },
      { key: 'ai', label: 'IA', color: '#ec4899' },
      { key: 'ts', label: 'TypeScript', color: '#3b82f6' },
      { key: 'inclusive', label: 'Diseño Inclusivo', color: '#f59e0b' } // Amber
    ];

    mainSkills.forEach(skill => {
      const x = Math.random() * (width - 200) + 100;
      const y = Math.random() * (height - 200) + 100;
      const w = isMobile ? 110 : 180;
      const h = isMobile ? 40 : 60;
      
      const body = Bodies.rectangle(x, y, w, h, {
        ...commonOptions,
        chamfer: { radius: isMobile ? 20 : 30 }
      });
      
      Body.setVelocity(body, { 
        x: (Math.random() - 0.5) * 5, 
        y: (Math.random() - 0.5) * 5 
      });
      
      bodyData.current.set(body.id, {
        type: 'skill',
        w,
        h,
        label: t(`hero.skills.${skill.key}`) || skill.label,
        translationKey: skill.key,
        color: skill.color
      });

      bodies.push(body);
    });

    // tipo b: tools
    const tools = [
      { label: 'Power BI', key: null },
      { label: 'Git', key: 'git' },
      { label: 'SQL', key: 'sql' },
      { label: 'NLP', key: null },
      { label: 'Tailwind', key: 'tailwind' },
      { label: 'Agile', key: 'agile' },
      { label: 'Python', key: 'python' },
      { label: 'Vite', key: 'vite' },
      { label: 'n8n', key: null }
    ];

    tools.forEach(tool => {
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * (height - 100) + 50;
      const w = isMobile ? 80 : 120;
      const h = isMobile ? 30 : 40;
      
      const body = Bodies.rectangle(x, y, w, h, {
        ...commonOptions,
        chamfer: { radius: isMobile ? 15 : 20 }
      });

      Body.setVelocity(body, { 
        x: (Math.random() - 0.5) * 5, 
        y: (Math.random() - 0.5) * 5 
      });

      bodyData.current.set(body.id, {
        type: 'skill',
        w,
        h,
        label: tool.key ? t(`hero.skills.${tool.key}`) : tool.label,
        translationKey: tool.key,
        color: 'rgba(148, 163, 184, 0.5)' // Slate-400 transparent
      });

      bodies.push(body);
    });

    // tipo c: la decoracion 
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 20 + 10;
      const isCircle = Math.random() > 0.5;
      
      let body;
      if (isCircle) {
        body = Bodies.circle(x, y, size / 2, commonOptions);
      } else {
        body = Bodies.polygon(x, y, 6, size / 2, commonOptions);
      }

      Body.setVelocity(body, { 
        x: (Math.random() - 0.5) * 5, 
        y: (Math.random() - 0.5) * 5 
      });

      bodyData.current.set(body.id, {
        type: 'decoration',
        color: 'rgba(255, 255, 255, 0.1)'
      });

      bodies.push(body);
    }

    // walls
    const wallThickness = 100;
    const wallOptions = { 
      isStatic: true, 
      restitution: 1
    };
    
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, wallOptions);
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, wallOptions);
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, wallOptions);

    Composite.add(world, [...bodies, ground, ceiling, leftWall, rightWall]);

    // mouse control
    const mouse = Mouse.create(canvas);
    mouse.element.removeEventListener("wheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Composite.add(world, mouseConstraint);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // rendering logic
    let animationFrameId;

    const renderLoop = () => {
      ctx.clearRect(0, 0, width, height);

      const allBodies = Composite.allBodies(engine.world);

      allBodies.forEach(body => {
        if (body.isStatic) return; // no dibujar walls

        const data = bodyData.current.get(body.id);
        if (!data) return;

        const { x, y } = body.position;
        const angle = body.angle;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        if (data.type === 'skill') {
          //rounded rectangle
          const { w, h, color, label } = data;
          const radius = h / 2;

          ctx.beginPath();
          ctx.moveTo(-w/2 + radius, -h/2);
          ctx.lineTo(w/2 - radius, -h/2);
          ctx.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + radius);
          ctx.lineTo(w/2, h/2 - radius);
          ctx.quadraticCurveTo(w/2, h/2, w/2 - radius, h/2);
          ctx.lineTo(-w/2 + radius, h/2);
          ctx.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - radius);
          ctx.lineTo(-w/2, -h/2 + radius);
          ctx.quadraticCurveTo(-w/2, -h/2, -w/2 + radius, -h/2);
          ctx.closePath();

          ctx.fillStyle = color;
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();

          //text
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 14px "Inter", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, 0, 0);

        } else if (data.type === 'decoration') {
          // decoration (Vertices directly)
          ctx.restore(); // Undo translate/rotate for decoration
          ctx.save(); // New save

          const vertices = body.vertices;
          ctx.beginPath();
          ctx.moveTo(vertices[0].x, vertices[0].y);
          for (let j = 1; j < vertices.length; j += 1) {
            ctx.lineTo(vertices[j].x, vertices[j].y);
          }
          ctx.lineTo(vertices[0].x, vertices[0].y);
          ctx.closePath();

          ctx.fillStyle = data.color;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + wallThickness / 2 });
      Body.setPosition(ceiling, { x: window.innerWidth / 2, y: -wallThickness / 2 });
      Body.setPosition(rightWall, { x: window.innerWidth + wallThickness / 2, y: window.innerHeight / 2 });
      Body.setPosition(leftWall, { x: -wallThickness / 2, y: window.innerHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runner);
      Composite.clear(world);
      Engine.clear(engine);
    };
  }, []);

  // cambio de idioma
  useEffect(() => {
    bodyData.current.forEach((data) => {
      if (data.type === 'skill' && data.translationKey) { //si no existe fallback
        const translated = t(`hero.skills.${data.translationKey}`);
        if (!translated.includes('hero.skills')) {
           data.label = translated;
        }
      }
    });
  }, [language, t]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-900">
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <h1 className="relative z-20 text-6xl md:text-9xl font-bold text-white mb-4 tracking-tighter drop-shadow-2xl">
          {t('hero.title')}
        </h1>
        <p className="relative z-0 text-xl md:text-3xl text-slate-300 font-light tracking-wide drop-shadow-2xl">
          {t('hero.subtitle')}
        </p>
      </div>

      <canvas ref={sceneRef} className="absolute inset-0 z-10 pointer-events-none md:pointer-events-auto" />
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce pointer-events-none">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default HeroPhysics;
