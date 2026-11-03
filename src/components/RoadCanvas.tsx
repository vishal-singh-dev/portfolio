import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface RoadCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  activeSectionIndex: number; // 0 to 6
}

export const RoadCanvas: React.FC<RoadCanvasProps> = ({ scrollProgress, activeSectionIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // References to keep Three.js objects mutable across renders
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    carGroup: THREE.Group | null;
    checkpointMeshes: THREE.Mesh[];
    targetZ: number;
    currentZ: number;
    animId: number | null;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    carGroup: null,
    checkpointMeshes: [],
    targetZ: 0,
    currentZ: 0,
    animId: null,
  });

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebglSupported(gl);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  // Update target position when scrollProgress changes
  useEffect(() => {
    // Road runs from z = 6 to z = -84 (total 90 units)
    const ROAD_START_Z = 6;
    const ROAD_END_Z = -84;
    stateRef.current.targetZ = ROAD_START_Z + scrollProgress * (ROAD_END_Z - ROAD_START_Z);
  }, [scrollProgress]);

  // Update checkpoint highlighting
  useEffect(() => {
    stateRef.current.checkpointMeshes.forEach((mesh, idx) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (idx <= activeSectionIndex) {
        mat.color.setHex(0xe5e5e5); // Active / passed
        mat.roughness = 0.2;
      } else {
        mat.color.setHex(0x383838); // Inactive
        mat.roughness = 0.8;
      }
    });
  }, [activeSectionIndex]);

  useEffect(() => {
    if (!webglSupported || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 420;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x141414);
    scene.fog = new THREE.FogExp2(0x141414, 0.022);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 150);
    camera.position.set(0, 5.5, 12);
    camera.lookAt(0, 0, 0);

    // 2. Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    // 3. Lighting (restrained, monochromatic)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(6, 15, 10);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xaaaaaa, 0.4);
    fillLight.position.set(-6, 8, -10);
    scene.add(fillLight);

    // 4. Road Construction
    const roadLength = 110;
    const roadWidth = 4.2;
    const roadGeo = new THREE.PlaneGeometry(roadWidth, roadLength);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x242424,
      roughness: 0.85,
      metalness: 0.1,
    });
    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.rotation.x = -Math.PI / 2;
    roadMesh.position.set(0, 0, -40);
    scene.add(roadMesh);

    // Road shoulders / curbs
    const curbGeo = new THREE.BoxGeometry(0.18, 0.08, roadLength);
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.6 });
    const leftCurb = new THREE.Mesh(curbGeo, curbMat);
    leftCurb.position.set(-roadWidth / 2 - 0.09, 0.04, -40);
    scene.add(leftCurb);

    const rightCurb = new THREE.Mesh(curbGeo, curbMat);
    rightCurb.position.set(roadWidth / 2 + 0.09, 0.04, -40);
    scene.add(rightCurb);

    // Center Dashes
    const dashGroup = new THREE.Group();
    const dashGeo = new THREE.PlaneGeometry(0.12, 1.8);
    const dashMat = new THREE.MeshStandardMaterial({ color: 0xd5d5d5, roughness: 0.4 });
    for (let z = 12; z >= -95; z -= 3.6) {
      const dash = new THREE.Mesh(dashGeo, dashMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(0, 0.01, z);
      dashGroup.add(dash);
    }
    scene.add(dashGroup);

    // 5. Checkpoints (7 milestones along the road)
    const checkpointMeshes: THREE.Mesh[] = [];
    const ROAD_START_Z = 6;
    const ROAD_END_Z = -84;
    for (let i = 0; i < 7; i++) {
      const ratio = i / 6;
      const cpZ = ROAD_START_Z + ratio * (ROAD_END_Z - ROAD_START_Z);

      // Checkpoint arch / post
      const cpGroup = new THREE.Group();
      cpGroup.position.set(0, 0, cpZ);

      // Left post
      const postGeo = new THREE.BoxGeometry(0.14, 1.8, 0.14);
      const postMat = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0xe5e5e5 : 0x383838,
        roughness: 0.5,
      });
      const leftPost = new THREE.Mesh(postGeo, postMat);
      leftPost.position.set(-roadWidth / 2 - 0.15, 0.9, 0);
      cpGroup.add(leftPost);

      // Right post
      const rightPost = new THREE.Mesh(postGeo, postMat.clone());
      rightPost.position.set(roadWidth / 2 + 0.15, 0.9, 0);
      cpGroup.add(rightPost);

      // Top crossbar
      const barGeo = new THREE.BoxGeometry(roadWidth + 0.6, 0.12, 0.12);
      const barMat = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0xe5e5e5 : 0x383838,
        roughness: 0.5,
      });
      const topBar = new THREE.Mesh(barGeo, barMat);
      topBar.position.set(0, 1.8, 0);
      cpGroup.add(topBar);

      // Active status beacon on top
      const beaconGeo = new THREE.BoxGeometry(0.3, 0.12, 0.12);
      const beaconMat = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0xf2f2f2 : 0x222222,
        roughness: 0.2,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(0, 1.95, 0);
      cpGroup.add(beacon);

      checkpointMeshes.push(topBar);
      scene.add(cpGroup);
    }

    // 6. Minimal Low-Poly Car Construction
    const carGroup = new THREE.Group();

    // Chassis / lower body
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      roughness: 0.4,
      metalness: 0.3,
    });
    const bodyGeo = new THREE.BoxGeometry(1.2, 0.38, 2.3);
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.y = 0.32;
    carGroup.add(bodyMesh);

    // Cabin / roof
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.2,
      metalness: 0.6,
    });
    const cabinGeo = new THREE.BoxGeometry(0.95, 0.34, 1.2);
    const cabinMesh = new THREE.Mesh(cabinGeo, cabinMat);
    cabinMesh.position.set(0, 0.64, -0.1);
    carGroup.add(cabinMesh);

    // Windshield trim & hood ridge
    const hoodGeo = new THREE.BoxGeometry(0.85, 0.08, 0.6);
    const hoodMesh = new THREE.Mesh(hoodGeo, bodyMat);
    hoodMesh.position.set(0, 0.44, -0.85);
    carGroup.add(hoodMesh);

    // Headlights (subtle white)
    const lightMat = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      roughness: 0.2,
    });
    const hlGeo = new THREE.BoxGeometry(0.2, 0.1, 0.05);
    const hlLeft = new THREE.Mesh(hlGeo, lightMat);
    hlLeft.position.set(-0.42, 0.34, -1.16);
    const hlRight = new THREE.Mesh(hlGeo, lightMat);
    hlRight.position.set(0.42, 0.34, -1.16);
    carGroup.add(hlLeft);
    carGroup.add(hlRight);

    // Taillights (subtle light grey)
    const tlMat = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.3,
    });
    const tlLeft = new THREE.Mesh(hlGeo, tlMat);
    tlLeft.position.set(-0.42, 0.34, 1.16);
    const tlRight = new THREE.Mesh(hlGeo, tlMat);
    tlRight.position.set(0.42, 0.34, 1.16);
    carGroup.add(tlLeft);
    carGroup.add(tlRight);

    // Wheels (4 low-poly cylinders)
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.9 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.3 });
    const wheelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.16, 12);
    wheelGeo.rotateZ(Math.PI / 2);

    const rimGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.17, 8);
    rimGeo.rotateZ(Math.PI / 2);

    const wheelPositions = [
      [-0.62, 0.24, -0.7],
      [0.62, 0.24, -0.7],
      [-0.62, 0.24, 0.7],
      [0.62, 0.24, 0.7],
    ];

    wheelPositions.forEach(([x, y, z]) => {
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      const r = new THREE.Mesh(rimGeo, rimMat);
      w.position.set(x, y, z);
      r.position.set(x, y, z);
      carGroup.add(w);
      carGroup.add(r);
    });

    carGroup.position.set(0, 0, ROAD_START_Z);
    scene.add(carGroup);

    // Store in mutable ref
    stateRef.current = {
      renderer,
      scene,
      camera,
      carGroup,
      checkpointMeshes,
      targetZ: ROAD_START_Z,
      currentZ: ROAD_START_Z,
      animId: null,
    };

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Render loop with smooth lerping
    let lastTime = performance.now();
    const animate = (time: number) => {
      stateRef.current.animId = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const { currentZ, targetZ, carGroup, camera } = stateRef.current;

      // Smooth lerp (0.12 per tick)
      const diff = targetZ - currentZ;
      stateRef.current.currentZ += diff * Math.min(delta * 9, 0.25);

      if (renderer && scene && camera) {
        if (carGroup) {
          carGroup.position.z = stateRef.current.currentZ;
          camera.position.z = stateRef.current.currentZ + 7.5;
          camera.position.y = 4.2;
          camera.lookAt(0, 0.6, stateRef.current.currentZ - 4);
        }
        renderer.render(scene, camera);
      }
    };

    stateRef.current.animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (stateRef.current.animId) cancelAnimationFrame(stateRef.current.animId);
      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      scene.clear();
    };
  }, [webglSupported]);

  if (!webglSupported) {
    // Non-WebGL Fallback representation
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '260px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          TRACK PROGRESS: {Math.round(scrollProgress * 100)}%
        </span>
        <div style={{ width: '4px', height: '140px', backgroundColor: 'var(--border)', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: `${scrollProgress * 100}%`,
              left: '-8px',
              width: '20px',
              height: '10px',
              backgroundColor: 'var(--text-primary)',
              borderRadius: '2px',
              transition: 'top 0.1s linear',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        backgroundColor: '#141414',
      }}
    />
  );
};
