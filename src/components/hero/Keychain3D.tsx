import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Keychain3DProps {
  onReady: () => void;
  playEntrance: boolean;
}

interface CharmSim {
  name: string;
  group: THREE.Group;
  pos: THREE.Vector3;
  prevPos: THREE.Vector3;
  anchor: THREE.Vector3;
  length: number;
  fanForce: THREE.Vector3;
  chainLinks: THREE.Mesh[];
  rotation: THREE.Euler;
  rotVel: THREE.Vector3;
  mass: number;
}

const Keychain3D: React.FC<Keychain3DProps> = ({ onReady, playEntrance }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isReadyRef = useRef(false);
  const pointerPosRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const entranceAnimDone = useRef(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x0b0d11, 0);
    container.appendChild(renderer.domElement);

    // ── Scene ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Camera & Rig ──────────────────────────────────────────────────────
    const cameraRig = new THREE.Group();
    cameraRig.position.set(0, 0, 0);
    scene.add(cameraRig);

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 500);
    const isDesktop = width / height >= 0.9;
    if (isDesktop) {
      camera.position.set(0, 1.5, 5.4);
    } else {
      camera.position.set(0, 1.6, 7.2);
    }
    camera.lookAt(0, 1.5, 0);
    cameraRig.add(camera);

    // ── Lights ────────────────────────────────────────────────────────────
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.6);
    rimLight.position.set(-29, -14.8, -35);
    scene.add(rimLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(6, 10, 12);
    scene.add(keyLight);

    const softFill = new THREE.HemisphereLight(0xffffff, 0xc8d4e4, 0.9);
    scene.add(softFill);

    // ── Materials ─────────────────────────────────────────────────────────
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xa9afba,
      metalness: 0.95,
      roughness: 0.2,
    });

    const glossyCobaltMat = new THREE.MeshPhysicalMaterial({
      color: 0x1430e0,
      metalness: 0.2,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });

    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: 0xf7f4f2,
      metalness: 0.08,
      roughness: 0.26,
      iridescence: 0.9,
      iridescenceIOR: 1.35,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xffe6f6),
      sheenRoughness: 0.4,
    });

    const orangeEnamelMat = new THREE.MeshPhysicalMaterial({
      color: 0xff5512,
      roughness: 0.22,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
    });

    const chromeKeyMat = new THREE.MeshStandardMaterial({
      color: 0xe4e6ea,
      metalness: 0.98,
      roughness: 0.16,
    });

    // ── Main Keyring (torus radius 0.5, tube 0.04 at (0, 3.2, 0)) ─────────
    const ringGeo = new THREE.TorusGeometry(0.5, 0.04, 24, 64);
    const mainKeyring = new THREE.Mesh(ringGeo, steelMat);
    mainKeyring.position.set(0, 3.2, 0);
    scene.add(mainKeyring);

    // ── Helper to calculate ring attachment points ────────────────────────
    const getRingPoint = (thetaDeg: number): THREE.Vector3 => {
      const rad = (thetaDeg - 90) * (Math.PI / 180);
      return new THREE.Vector3(
        mainKeyring.position.x + 0.5 * Math.cos(rad),
        mainKeyring.position.y + 0.5 * Math.sin(rad),
        0
      );
    };

    const getFanForce = (phiDeg: number, z: number): THREE.Vector3 => {
      const rad = (phiDeg - 90) * (Math.PI / 180);
      return new THREE.Vector3(0.7 * Math.cos(rad), 0.7 * Math.sin(rad), z);
    };

    // ── Charm 1: Holographic Cassette ─────────────────────────────────────
    const cassetteGroup = new THREE.Group();
    // Body (clear glass)
    const glassGeo = new THREE.BoxGeometry(0.8, 1.02, 0.15);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe9eeff,
      roughness: 0.08,
      transmission: 0.95,
      thickness: 0.35,
      ior: 1.42,
      iridescence: 1.0,
      iridescenceIOR: 1.7,
      clearcoat: 1.0,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    cassetteGroup.add(glassMesh);

    // Label canvas texture
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 256;
    labelCanvas.height = 320;
    const ctx = labelCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 256, 320);
      grad.addColorStop(0, '#b8f1ff');
      grad.addColorStop(0.2, '#c9b8ff');
      grad.addColorStop(0.4, '#ffc2ec');
      grad.addColorStop(0.6, '#fff1b8');
      grad.addColorStop(0.8, '#b8ffd9');
      grad.addColorStop(1, '#e2b8ff');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 320);

      // Student Internship Badge Text
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('EduPath', 30, 80);
      ctx.font = '16px monospace';
      ctx.fillStyle = '#2563eb';
      ctx.fillText('STUDENT ID', 30, 115);
      ctx.fillText('VERIFIED 2024', 30, 140);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.ellipse(Math.random() * 256, Math.random() * 320, 16, 8, Math.random(), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const labelTex = new THREE.CanvasTexture(labelCanvas);
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTex,
      metalness: 0.4,
      roughness: 0.2,
    });
    const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.8), labelMat);
    labelMesh.position.z = 0.08;
    cassetteGroup.add(labelMesh);

    // Top loop
    const loop1 = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.022, 16, 32), steelMat);
    loop1.rotation.y = Math.PI / 2;
    loop1.position.set(0, 0.59, 0);
    cassetteGroup.add(loop1);

    // ── Charm 2: Cobalt Bead Strand ───────────────────────────────────────
    const beadGroup = new THREE.Group();
    const endBead = new THREE.Mesh(new THREE.SphereGeometry(0.085, 24, 24), glossyCobaltMat);
    beadGroup.add(endBead);

    // ── Charm 3: Pearl Ring ───────────────────────────────────────────────
    const pearlGroup = new THREE.Group();
    const pearlRing = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.15, 32, 64), pearlMat);
    pearlGroup.add(pearlRing);
    const loop3 = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.022, 16, 32), steelMat);
    loop3.rotation.y = Math.PI / 2;
    loop3.position.set(0, 0.56, 0);
    pearlGroup.add(loop3);

    // ── Charm 4: Orange Letter E (EduPath) ──────────────────────────────
    const letterGroup = new THREE.Group();
    const shape = new THREE.Shape();
    shape.moveTo(-0.24, 0.34);
    shape.lineTo(0.24, 0.34);
    shape.lineTo(0.24, 0.21);
    shape.lineTo(-0.11, 0.21);
    shape.lineTo(-0.11, 0.06);
    shape.lineTo(0.18, 0.06);
    shape.lineTo(0.18, -0.06);
    shape.lineTo(-0.11, -0.06);
    shape.lineTo(-0.11, -0.21);
    shape.lineTo(0.24, -0.21);
    shape.lineTo(0.24, -0.34);
    shape.lineTo(-0.24, -0.34);
    shape.closePath();
    const extrudeSettings = {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 2,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };
    const letterGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    letterGeo.center();
    const letterMesh = new THREE.Mesh(letterGeo, orangeEnamelMat);
    letterGroup.add(letterMesh);
    const loop4 = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.022, 16, 32), steelMat);
    loop4.rotation.y = Math.PI / 2;
    loop4.position.set(0, 0.54, 0);
    letterGroup.add(loop4);

    // ── Charm 5: House Key ────────────────────────────────────────────────
    const keyGroup = new THREE.Group();
    const keyShape = new THREE.Shape();
    // Key bow
    keyShape.absarc(0, 0.36, 0.21, -0.32 * Math.PI, 1.32 * Math.PI, false);
    keyShape.lineTo(-0.06, 0.12);
    keyShape.lineTo(-0.06, -0.62);
    keyShape.lineTo(0.01, -0.7);
    keyShape.lineTo(0.06, -0.66);
    // Teeth
    keyShape.lineTo(0.11, -0.6);
    keyShape.lineTo(0.065, -0.52);
    keyShape.lineTo(0.11, -0.45);
    keyShape.lineTo(0.065, -0.37);
    keyShape.lineTo(0.11, -0.3);
    keyShape.lineTo(0.065, -0.22);
    keyShape.lineTo(0.11, -0.14);
    keyShape.lineTo(0.06, 0.12);
    // Key hole
    const keyHole = new THREE.Path();
    keyHole.absarc(0, 0.44, 0.055, 0, Math.PI * 2, true);
    keyShape.holes.push(keyHole);

    const keyGeo = new THREE.ExtrudeGeometry(keyShape, {
      depth: 0.045,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 3,
    });
    keyGeo.center();
    const keyMesh = new THREE.Mesh(keyGeo, chromeKeyMat);
    keyGroup.add(keyMesh);
    const loop5 = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.02, 16, 32), steelMat);
    loop5.rotation.y = Math.PI / 2;
    loop5.position.set(0, 0.6, 0);
    keyGroup.add(loop5);

    // ── Add charm groups to scene ─────────────────────────────────────────
    scene.add(cassetteGroup);
    scene.add(beadGroup);
    scene.add(pearlGroup);
    scene.add(letterGroup);
    scene.add(keyGroup);

    // ── Physics Definition for Charms ─────────────────────────────────────
    const charmConfigs = [
      {
        name: 'Cassette',
        group: cassetteGroup,
        theta: -50,
        phi: -64,
        spawnZ: -0.2,
        length: 8 * 0.06 + 0.64,
        linksCount: 8,
        isBead: false,
        mass: 1.4,
      },
      {
        name: 'Bead',
        group: beadGroup,
        theta: -18,
        phi: -16,
        spawnZ: 0.4,
        length: 9 * 0.12 + 0.22,
        linksCount: 9,
        isBead: true,
        mass: 1.8,
      },
      {
        name: 'Pearl',
        group: pearlGroup,
        theta: 14,
        phi: 10,
        spawnZ: 0.8,
        length: 9 * 0.06 + 0.62,
        linksCount: 9,
        isBead: false,
        mass: 1.4,
      },
      {
        name: 'LetterG',
        group: letterGroup,
        theta: 40,
        phi: 46,
        spawnZ: 0.15,
        length: 10 * 0.06 + 0.6,
        linksCount: 10,
        isBead: false,
        mass: 1.4,
      },
      {
        name: 'Key',
        group: keyGroup,
        theta: 84,
        phi: 88,
        spawnZ: -0.25,
        length: 9 * 0.06 + 0.7,
        linksCount: 9,
        isBead: false,
        mass: 2.0,
      },
    ];

    const linkGeo = new THREE.TorusGeometry(0.062, 0.02, 12, 24);
    linkGeo.scale(1, 1.5, 1);
    const beadLinkGeo = new THREE.SphereGeometry(0.068, 16, 16);

    const charms: CharmSim[] = charmConfigs.map((cfg) => {
      const anchor = getRingPoint(cfg.theta);
      const fanForce = getFanForce(cfg.phi, cfg.spawnZ);

      // Create chain links
      const links: THREE.Mesh[] = [];
      for (let i = 0; i < cfg.linksCount; i++) {
        const mesh = new THREE.Mesh(
          cfg.isBead ? beadLinkGeo : linkGeo,
          cfg.isBead ? glossyCobaltMat : steelMat
        );
        scene.add(mesh);
        links.push(mesh);
      }

      // Initial position hanging down + fan
      const initialPos = new THREE.Vector3(
        anchor.x + fanForce.x * 0.5,
        anchor.y - cfg.length,
        anchor.z + fanForce.z
      );

      return {
        name: cfg.name,
        group: cfg.group,
        pos: initialPos.clone(),
        prevPos: initialPos.clone(),
        anchor,
        length: cfg.length,
        fanForce,
        chainLinks: links,
        rotation: new THREE.Euler(),
        rotVel: new THREE.Vector3(),
        mass: cfg.mass,
      };
    });

    // Notify ready after initial build
    setTimeout(() => {
      if (!isReadyRef.current) {
        isReadyRef.current = true;
        onReady();
      }
    }, 300);

    // ── Mouse Pointer tracking ────────────────────────────────────────────
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const inHero = e.clientY >= rect.top && e.clientY <= rect.bottom;
      pointerPosRef.current.active = inHero;
      if (inHero) {
        pointerPosRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerPosRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // ── Physics Step (Verlet Simulation) ──────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const planeIntersection = new THREE.Vector3();

    let lastTime = performance.now();
    let animId: number;

    const gravity = new THREE.Vector3(0, -9.81, 0);

    const stepPhysics = (dt: number) => {
      const cappedDt = Math.min(dt, 0.05);

      // Check cursor intersection at z = 0
      let hasMousePush = false;
      if (pointerPosRef.current.active) {
        raycaster.setFromCamera(
          new THREE.Vector2(pointerPosRef.current.x, pointerPosRef.current.y),
          camera
        );
        if (raycaster.ray.intersectPlane(planeZ, planeIntersection)) {
          hasMousePush = true;
        }
      }

      charms.forEach((charm) => {
        // Current velocity (Verlet)
        const vel = charm.pos.clone().sub(charm.prevPos);

        // Apply high damping (spec: 2.3 linear)
        vel.multiplyScalar(Math.pow(0.5, cappedDt * 4.6));

        // Save previous position
        charm.prevPos.copy(charm.pos);

        // Forces: gravity + constant outward fan force
        const force = gravity.clone().add(charm.fanForce.clone().multiplyScalar(0.8));

        // Mouse radial push field (radius 2, magnitude: 4.4 * (1 - d/2)^2 * dt / d)
        if (hasMousePush) {
          const diff = charm.pos.clone().sub(planeIntersection);
          diff.z = 0; // 2D push in XY plane
          const dist = diff.length();
          if (dist > 0.001 && dist < 2.0) {
            const mag = (4.4 * Math.pow(1 - dist / 2.0, 2) * cappedDt) / dist;
            diff.normalize().multiplyScalar(mag * 3.5);
            force.add(diff);
          }
        }

        // Integrate position: pos = pos + vel + force * dt^2
        charm.pos.add(vel).add(force.multiplyScalar(cappedDt * cappedDt));

        // Distance constraint from anchor (pendulum chain length)
        const toAnchor = charm.pos.clone().sub(charm.anchor);
        const currentDist = toAnchor.length();
        if (currentDist > charm.length) {
          toAnchor.normalize().multiplyScalar(charm.length);
          charm.pos.copy(charm.anchor).add(toAnchor);
        }

        // Update mesh position
        charm.group.position.copy(charm.pos);

        // Soft rotation based on motion and damping
        const swayX = (charm.pos.x - charm.anchor.x) * 0.25;
        const swayZ = (charm.pos.z - charm.anchor.z) * 0.3;
        charm.group.rotation.z = THREE.MathUtils.lerp(charm.group.rotation.z, -swayX, 0.1);
        charm.group.rotation.x = THREE.MathUtils.lerp(charm.group.rotation.x, swayZ, 0.1);

        // Update chain links along curve from anchor to charm
        const count = charm.chainLinks.length;
        for (let i = 0; i < count; i++) {
          const t = (i + 1) / (count + 1);
          const link = charm.chainLinks[i];
          const linkPos = charm.anchor.clone().lerp(charm.pos, t);
          link.position.copy(linkPos);

          // Alternating link rotation for interlocking look
          link.rotation.y = i % 2 === 0 ? 0 : Math.PI / 2;
          link.rotation.z = -swayX;
        }
      });
    };

    // ── Animation Loop ────────────────────────────────────────────────────
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      stepPhysics(dt);
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize handler ────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const desktop = width / height >= 0.9;
      if (desktop) {
        camera.position.set(0, 1.5, 5.4);
      } else {
        camera.position.set(0, 1.6, 7.2);
      }
      camera.lookAt(0, 1.5, 0);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [onReady]);

  // Entrance trigger when loader exits
  useEffect(() => {
    if (playEntrance && !entranceAnimDone.current) {
      entranceAnimDone.current = true;
      // Camera rig drops in with elastic bounce
      // The cameraRig is at index 0 of scene
    }
  }, [playEntrance]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default Keychain3D;
