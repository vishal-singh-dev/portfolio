import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Play, RotateCcw, Trophy, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurviveTheCommuteProps {
  isUnlocked: boolean;
}

type GameState = 'IDLE' | 'PLAYING' | 'GAMEOVER' | 'VICTORY';

const TARGET_DISTANCE = 1000; // 1000 meters to victory
const LANES = [-2.0, 0, 2.0];

export const SurviveTheCommute: React.FC<SurviveTheCommuteProps> = ({ isUnlocked }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [score, setScore] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [lastObstacleEncountered, setLastObstacleEncountered] = useState<string>('');

  // Mutable game state held in ref for 60fps render loop
  const gameRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    playerMesh: THREE.Group | null;
    playerLane: number; // 0, 1, 2
    playerTargetX: number;
    playerCurrentX: number;
    obstacles: {
      mesh: THREE.Group | THREE.Mesh;
      lane: number;
      type: string;
      z: number;
      passed: boolean;
      collided: boolean;
    }[];
    roadDashes: THREE.Mesh[];
    speed: number;
    distance: number;
    score: number;
    lives: number;
    state: GameState;
    invulnerableTimer: number;
    shakeTimer: number;
    spawnTimer: number;
    animId: number | null;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    playerMesh: null,
    playerLane: 1, // center
    playerTargetX: 0,
    playerCurrentX: 0,
    obstacles: [],
    roadDashes: [],
    speed: 28,
    distance: 0,
    score: 0,
    lives: 3,
    state: 'IDLE',
    invulnerableTimer: 0,
    shakeTimer: 0,
    spawnTimer: 0,
    animId: null,
  });

  // Controls
  const moveLeft = useCallback(() => {
    if (gameRef.current.state !== 'PLAYING') return;
    if (gameRef.current.playerLane > 0) {
      gameRef.current.playerLane -= 1;
      gameRef.current.playerTargetX = LANES[gameRef.current.playerLane];
    }
  }, []);

  const moveRight = useCallback(() => {
    if (gameRef.current.state !== 'PLAYING') return;
    if (gameRef.current.playerLane < 2) {
      gameRef.current.playerLane += 1;
      gameRef.current.playerTargetX = LANES[gameRef.current.playerLane];
    }
  }, []);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameRef.current.state !== 'PLAYING') return;
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        e.preventDefault();
        moveLeft();
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        e.preventDefault();
        moveRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight]);

  // Procedural 3D Obstacle Builders (pure Three.js, monochromatic)
  const createObstacle = (type: string): THREE.Group | THREE.Mesh => {
    const group = new THREE.Group();

    if (type === 'POTHOLE') {
      // Recessed dark circular pothole
      const holeGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.04, 16);
      const holeMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.95 });
      const hole = new THREE.Mesh(holeGeo, holeMat);
      hole.position.y = 0.02;

      // Cracked rim
      const rimGeo = new THREE.RingGeometry(0.65, 0.78, 16);
      const rimMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8, side: THREE.DoubleSide });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = -Math.PI / 2;
      rim.position.y = 0.025;

      group.add(hole);
      group.add(rim);
      return group;
    }

    if (type === 'AUTO_RICKSHAW') {
      // Low-poly Indian Auto-Rickshaw
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x353535, roughness: 0.5 });
      const roofMat = new THREE.MeshStandardMaterial({ color: 0x1f1f1f, roughness: 0.8 });
      const blackMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });

      // Lower cabin
      const baseGeo = new THREE.BoxGeometry(1.1, 0.6, 1.6);
      const baseMesh = new THREE.Mesh(baseGeo, bodyMat);
      baseMesh.position.y = 0.45;
      group.add(baseMesh);

      // Top canopy
      const roofGeo = new THREE.BoxGeometry(1.0, 0.45, 1.2);
      const roofMesh = new THREE.Mesh(roofGeo, roofMat);
      roofMesh.position.set(0, 0.95, -0.15);
      group.add(roofMesh);

      // 3 wheels
      const wheelGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 10);
      wheelGeo.rotateZ(Math.PI / 2);
      const frontW = new THREE.Mesh(wheelGeo, blackMat);
      frontW.position.set(0, 0.2, -0.7);
      const backWL = new THREE.Mesh(wheelGeo, blackMat);
      backWL.position.set(-0.55, 0.2, 0.6);
      const backWR = new THREE.Mesh(wheelGeo, blackMat);
      backWR.position.set(0.55, 0.2, 0.6);
      group.add(frontW, backWL, backWR);
      return group;
    }

    if (type === 'TRUCK') {
      // Low-poly cargo truck
      const cabMat = new THREE.MeshStandardMaterial({ color: 0x3d3d3d, roughness: 0.4 });
      const cargoMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.7 });
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });

      // Front cab
      const cabGeo = new THREE.BoxGeometry(1.3, 1.2, 1.0);
      const cab = new THREE.Mesh(cabGeo, cabMat);
      cab.position.set(0, 0.85, -1.2);
      group.add(cab);

      // Cargo container
      const cargoGeo = new THREE.BoxGeometry(1.35, 1.4, 2.4);
      const cargo = new THREE.Mesh(cargoGeo, cargoMat);
      cargo.position.set(0, 1.0, 0.4);
      group.add(cargo);

      // Wheels
      const wGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.16, 10);
      wGeo.rotateZ(Math.PI / 2);
      const w1 = new THREE.Mesh(wGeo, wheelMat);
      w1.position.set(-0.68, 0.28, -1.2);
      const w2 = new THREE.Mesh(wGeo, wheelMat);
      w2.position.set(0.68, 0.28, -1.2);
      const w3 = new THREE.Mesh(wGeo, wheelMat);
      w3.position.set(-0.68, 0.28, 0.8);
      const w4 = new THREE.Mesh(wGeo, wheelMat);
      w4.position.set(0.68, 0.28, 0.8);
      group.add(w1, w2, w3, w4);
      return group;
    }

    if (type === 'COW') {
      // Low-poly Cow (lighter grey quadruped with horns)
      const hideMat = new THREE.MeshStandardMaterial({ color: 0x6e6e6e, roughness: 0.7 });
      const hornMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.4 });
      const legMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.8 });

      // Torso
      const bodyGeo = new THREE.BoxGeometry(0.85, 0.75, 1.5);
      const body = new THREE.Mesh(bodyGeo, hideMat);
      body.position.set(0, 0.75, 0);
      group.add(body);

      // Head
      const headGeo = new THREE.BoxGeometry(0.45, 0.45, 0.6);
      const head = new THREE.Mesh(headGeo, hideMat);
      head.position.set(0, 1.0, -0.9);
      group.add(head);

      // Horns
      const hornGeo = new THREE.ConeGeometry(0.06, 0.35, 5);
      const hornL = new THREE.Mesh(hornGeo, hornMat);
      hornL.rotation.z = 0.5;
      hornL.position.set(-0.25, 1.3, -0.9);
      const hornR = new THREE.Mesh(hornGeo, hornMat);
      hornR.rotation.z = -0.5;
      hornR.position.set(0.25, 1.3, -0.9);
      group.add(hornL, hornR);

      // 4 Legs
      const legGeo = new THREE.BoxGeometry(0.16, 0.65, 0.16);
      const l1 = new THREE.Mesh(legGeo, legMat);
      l1.position.set(-0.3, 0.32, -0.5);
      const l2 = new THREE.Mesh(legGeo, legMat);
      l2.position.set(0.3, 0.32, -0.5);
      const l3 = new THREE.Mesh(legGeo, legMat);
      l3.position.set(-0.3, 0.32, 0.5);
      const l4 = new THREE.Mesh(legGeo, legMat);
      l4.position.set(0.3, 0.32, 0.5);
      group.add(l1, l2, l3, l4);
      return group;
    }

    if (type === 'BUFFALO') {
      // Low-poly Buffalo (dark charcoal quadruped with heavy horns)
      const hideMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
      const hornMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.5 });
      const legMat = new THREE.MeshStandardMaterial({ color: 0x181818, roughness: 0.9 });

      // Torso (broader)
      const bodyGeo = new THREE.BoxGeometry(0.95, 0.8, 1.6);
      const body = new THREE.Mesh(bodyGeo, hideMat);
      body.position.set(0, 0.75, 0);
      group.add(body);

      // Head
      const headGeo = new THREE.BoxGeometry(0.5, 0.48, 0.65);
      const head = new THREE.Mesh(headGeo, hideMat);
      head.position.set(0, 0.9, -0.95);
      group.add(head);

      // Wide lateral horns
      const hornGeo = new THREE.BoxGeometry(0.9, 0.1, 0.14);
      const horns = new THREE.Mesh(hornGeo, hornMat);
      horns.position.set(0, 1.15, -0.9);
      group.add(horns);

      // Legs
      const legGeo = new THREE.BoxGeometry(0.18, 0.65, 0.18);
      const l1 = new THREE.Mesh(legGeo, legMat);
      l1.position.set(-0.34, 0.32, -0.55);
      const l2 = new THREE.Mesh(legGeo, legMat);
      l2.position.set(0.34, 0.32, -0.55);
      const l3 = new THREE.Mesh(legGeo, legMat);
      l3.position.set(-0.34, 0.32, 0.55);
      const l4 = new THREE.Mesh(legGeo, legMat);
      l4.position.set(0.34, 0.32, 0.55);
      group.add(l1, l2, l3, l4);
      return group;
    }

    // Default: Stray Dog (small low-poly canine)
    const furMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.7 });
    const earMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 });

    // Torso
    const dogBodyGeo = new THREE.BoxGeometry(0.42, 0.36, 0.85);
    const dogBody = new THREE.Mesh(dogBodyGeo, furMat);
    dogBody.position.set(0, 0.45, 0);
    group.add(dogBody);

    // Head
    const dogHeadGeo = new THREE.BoxGeometry(0.3, 0.28, 0.35);
    const dogHead = new THREE.Mesh(dogHeadGeo, furMat);
    dogHead.position.set(0, 0.6, -0.45);
    group.add(dogHead);

    // Ears
    const earGeo = new THREE.ConeGeometry(0.06, 0.16, 4);
    const earL = new THREE.Mesh(earGeo, earMat);
    earL.position.set(-0.1, 0.8, -0.45);
    const earR = new THREE.Mesh(earGeo, earMat);
    earR.position.set(0.1, 0.8, -0.45);
    group.add(earL, earR);

    // Slender legs
    const dLegGeo = new THREE.BoxGeometry(0.08, 0.4, 0.08);
    const dl1 = new THREE.Mesh(dLegGeo, earMat);
    dl1.position.set(-0.14, 0.2, -0.3);
    const dl2 = new THREE.Mesh(dLegGeo, earMat);
    dl2.position.set(0.14, 0.2, -0.3);
    const dl3 = new THREE.Mesh(dLegGeo, earMat);
    dl3.position.set(-0.14, 0.2, 0.3);
    const dl4 = new THREE.Mesh(dLegGeo, earMat);
    dl4.position.set(0.14, 0.2, 0.3);
    group.add(dl1, dl2, dl3, dl4);

    return group;
  };

  // Start or Reset Game
  const startGame = () => {
    // Clear previous obstacles
    const scene = gameRef.current.scene;
    if (scene) {
      gameRef.current.obstacles.forEach(o => scene.remove(o.mesh));
    }

    gameRef.current.obstacles = [];
    gameRef.current.playerLane = 1;
    gameRef.current.playerTargetX = 0;
    gameRef.current.playerCurrentX = 0;
    gameRef.current.speed = 26;
    gameRef.current.distance = 0;
    gameRef.current.score = 0;
    gameRef.current.lives = 3;
    gameRef.current.state = 'PLAYING';
    gameRef.current.invulnerableTimer = 0;
    gameRef.current.shakeTimer = 0;
    gameRef.current.spawnTimer = 0;

    setGameState('PLAYING');
    setLives(3);
    setScore(0);
    setDistance(0);
    setLastObstacleEncountered('');
  };

  // Three.js Game Canvas Setup
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 440;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    scene.fog = new THREE.FogExp2(0x111111, 0.024);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 120);
    camera.position.set(0, 4.8, 6.2);
    camera.lookAt(0, 0.8, -10);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
    } catch (e) {
      return;
    }

    // Monochromatic Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(8, 16, 8);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x999999, 0.4);
    fillLight.position.set(-8, 10, -10);
    scene.add(fillLight);

    // Road (3 lanes, total width 6.6)
    const roadGeo = new THREE.PlaneGeometry(6.6, 120);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x242424, roughness: 0.9 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0, -40);
    scene.add(road);

    // Curbs
    const curbGeo = new THREE.BoxGeometry(0.2, 0.08, 120);
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.6 });
    const leftCurb = new THREE.Mesh(curbGeo, curbMat);
    leftCurb.position.set(-3.4, 0.04, -40);
    const rightCurb = new THREE.Mesh(curbGeo, curbMat);
    rightCurb.position.set(3.4, 0.04, -40);
    scene.add(leftCurb, rightCurb);

    // Lane dividing stripes (2 lines separating 3 lanes)
    const roadDashes: THREE.Mesh[] = [];
    const dashGeo = new THREE.PlaneGeometry(0.1, 2.0);
    const dashMat = new THREE.MeshStandardMaterial({ color: 0xd5d5d5, roughness: 0.4 });
    [-1.0, 1.0].forEach((xPos) => {
      for (let z = 15; z >= -95; z -= 4.2) {
        const dash = new THREE.Mesh(dashGeo, dashMat);
        dash.rotation.x = -Math.PI / 2;
        dash.position.set(xPos, 0.015, z);
        scene.add(dash);
        roadDashes.push(dash);
      }
    });

    // Player Vehicle (Low-Poly dark gray hatchback)
    const playerGroup = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3e3e3e, roughness: 0.35, metalness: 0.3 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.1, metalness: 0.7 });
    const hlMat = new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.2 });

    const chassisGeo = new THREE.BoxGeometry(1.2, 0.38, 2.3);
    const chassis = new THREE.Mesh(chassisGeo, bodyMat);
    chassis.position.y = 0.32;
    playerGroup.add(chassis);

    const cabinGeo = new THREE.BoxGeometry(0.95, 0.34, 1.25);
    const cabin = new THREE.Mesh(cabinGeo, glassMat);
    cabin.position.set(0, 0.64, -0.1);
    playerGroup.add(cabin);

    // Headlights
    const hlGeo = new THREE.BoxGeometry(0.18, 0.08, 0.05);
    const hl1 = new THREE.Mesh(hlGeo, hlMat);
    hl1.position.set(-0.4, 0.34, -1.16);
    const hl2 = new THREE.Mesh(hlGeo, hlMat);
    hl2.position.set(0.4, 0.34, -1.16);
    playerGroup.add(hl1, hl2);

    // Wheels
    const wGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.16, 12);
    wGeo.rotateZ(Math.PI / 2);
    const wMat = new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.9 });
    const pos = [
      [-0.62, 0.24, -0.7],
      [0.62, 0.24, -0.7],
      [-0.62, 0.24, 0.7],
      [0.62, 0.24, 0.7],
    ];
    pos.forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wGeo, wMat);
      wheel.position.set(wx, wy, wz);
      playerGroup.add(wheel);
    });

    playerGroup.position.set(0, 0, 0);
    scene.add(playerGroup);

    gameRef.current = {
      renderer,
      scene,
      camera,
      playerMesh: playerGroup,
      playerLane: 1,
      playerTargetX: 0,
      playerCurrentX: 0,
      obstacles: [],
      roadDashes,
      speed: 26,
      distance: 0,
      score: 0,
      lives: 3,
      state: 'IDLE',
      invulnerableTimer: 0,
      shakeTimer: 0,
      spawnTimer: 0,
      animId: null,
    };

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    // 60FPS Game loop
    let lastTime = performance.now();
    const obstacleTypes = ['POTHOLE', 'AUTO_RICKSHAW', 'TRUCK', 'COW', 'BUFFALO', 'DOG'];

    const gameLoop = (time: number) => {
      gameRef.current.animId = requestAnimationFrame(gameLoop);
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const g = gameRef.current;

      // Road dash animation (creates illusion of continuous forward motion)
      const currentSpeed = g.state === 'PLAYING' ? g.speed : 6;
      g.roadDashes.forEach(dash => {
        dash.position.z += currentSpeed * delta;
        if (dash.position.z > 15) {
          dash.position.z -= 110;
        }
      });

      // Smooth lateral player movement
      const xDiff = g.playerTargetX - g.playerCurrentX;
      g.playerCurrentX += xDiff * Math.min(delta * 12, 0.35);

      if (g.playerMesh) {
        g.playerMesh.position.x = g.playerCurrentX;
        // Subtle banking angle when turning
        g.playerMesh.rotation.z = -xDiff * 0.1;
        g.playerMesh.rotation.y = -xDiff * 0.05;

        // Invulnerability flicker
        if (g.invulnerableTimer > 0) {
          g.invulnerableTimer -= delta;
          g.playerMesh.visible = Math.floor(g.invulnerableTimer * 12) % 2 === 0;
        } else {
          g.playerMesh.visible = true;
        }
      }

      // Camera shake on hit
      if (g.shakeTimer > 0) {
        g.shakeTimer -= delta;
        const shake = (Math.random() - 0.5) * 0.35;
        camera.position.x = shake;
        camera.position.y = 4.8 + shake * 0.5;
      } else {
        camera.position.x = 0;
        camera.position.y = 4.8;
      }

      // Gameplay Active Updates
      if (g.state === 'PLAYING') {
        // Distance & score calculation
        g.distance += currentSpeed * delta * 0.45;
        g.score += Math.round(currentSpeed * delta * 3.5);
        // Gradually increase speed as distance builds
        g.speed = 26 + Math.min(g.distance / 40, 16);

        // Check Victory
        if (g.distance >= TARGET_DISTANCE) {
          g.state = 'VICTORY';
          setGameState('VICTORY');
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffffff', '#cccccc', '#999999', '#555555'],
          });
        }

        // Procedural Fair Obstacle Spawning
        g.spawnTimer += delta;
        const spawnInterval = Math.max(1.8 - (g.distance / 1200), 1.05);

        if (g.spawnTimer >= spawnInterval && g.distance < TARGET_DISTANCE - 40) {
          g.spawnTimer = 0;

          // FAIRNESS RULE: Never block all 3 lanes!
          // Randomly pick 1 or 2 lanes only, leaving at least 1 lane completely free.
          const openLane = Math.floor(Math.random() * 3);
          const occupiedLanes = [0, 1, 2].filter(lane => lane !== openLane);

          // Occasionally only 1 obstacle is spawned
          const spawnCount = Math.random() < 0.45 ? 1 : occupiedLanes.length;
          const chosenLanes = occupiedLanes.slice(0, spawnCount);

          chosenLanes.forEach(lane => {
            const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
            const mesh = createObstacle(type);
            mesh.position.set(LANES[lane], 0, -80);
            scene.add(mesh);

            g.obstacles.push({
              mesh,
              lane,
              type,
              z: -80,
              passed: false,
              collided: false,
            });
          });
        }

        // Move and Check Obstacles
        for (let i = g.obstacles.length - 1; i >= 0; i--) {
          const obs = g.obstacles[i];
          obs.z += currentSpeed * delta;
          obs.mesh.position.z = obs.z;

          // Collision Check
          if (!obs.collided && g.invulnerableTimer <= 0) {
            // Player is centered at z = 0, bounding box approx -1.1 to 1.1
            if (obs.z > -1.2 && obs.z < 1.2) {
              const lateralDist = Math.abs(g.playerCurrentX - LANES[obs.lane]);
              if (lateralDist < 0.85) {
                // COLLISION!
                obs.collided = true;
                g.lives -= 1;
                g.invulnerableTimer = 1.4; // 1.4 seconds of invulnerability
                g.shakeTimer = 0.35; // camera shake

                setLives(g.lives);
                setLastObstacleEncountered(obs.type.replace('_', ' '));

                if (g.lives <= 0) {
                  g.state = 'GAMEOVER';
                  setGameState('GAMEOVER');
                }
              }
            }
          }

          // Bonus score when successfully dodging past
          if (!obs.passed && obs.z > 2) {
            obs.passed = true;
            g.score += 50;
          }

          // Recycle obstacles that moved far behind camera
          if (obs.z > 12) {
            scene.remove(obs.mesh);
            g.obstacles.splice(i, 1);
          }
        }

        // Throttle React state updates to ~10 times per second for smooth UI
        if (Math.floor(time / 100) % 2 === 0) {
          setScore(g.score);
          setDistance(Math.min(Math.round(g.distance), TARGET_DISTANCE));
        }
      }

      renderer.render(scene, camera);
    };

    gameRef.current.animId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (gameRef.current.animId) cancelAnimationFrame(gameRef.current.animId);
      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      scene.clear();
    };
  }, []);

  if (!isUnlocked) {
    return null;
  }

  return (
    <section
      id="game-section"
      style={{
        paddingTop: 'var(--spacing-12)',
        paddingBottom: 'var(--spacing-16)',
        backgroundColor: '#0d0d0d',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header Introduction (as specified in Section 14) */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)' }}>
          <div className="section-label" style={{ marginBottom: '6px' }}>
            OPTIONAL REWARD · INDIAN ROAD SURVIVAL
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '10px',
            }}
          >
            SURVIVE THE COMMUTE
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            You've explored the engineering journey. Now, one final challenge.
            Navigate through unexpected potholes, auto-rickshaws, cargo trucks, cows, buffaloes, and stray dogs.
          </p>
        </div>

        {/* Game Canvas Container */}
        <div
          style={{
            position: 'relative',
            backgroundColor: '#111111',
            border: '1px solid var(--border)',
            overflow: 'hidden',
          }}
        >
          <div ref={containerRef} style={{ width: '100%', height: '440px' }} />

          {/* Top HUD (Monochromatic, restrained) */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '14px',
              right: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {/* Lives */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(17, 17, 17, 0.9)',
                border: '1px solid var(--border)',
                padding: '6px 12px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                LIVES:
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3].map(i => (
                  <span
                    key={i}
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: i <= lives ? 'var(--text-primary)' : 'var(--border)',
                      display: 'inline-block',
                      borderRadius: '1px',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Distance & Target */}
            <div
              style={{
                backgroundColor: 'rgba(17, 17, 17, 0.9)',
                border: '1px solid var(--border)',
                padding: '6px 14px',
                textAlign: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                DISTANCE TO WORK
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {distance} / {TARGET_DISTANCE} M
              </span>
            </div>

            {/* Score */}
            <div
              style={{
                backgroundColor: 'rgba(17, 17, 17, 0.9)',
                border: '1px solid var(--border)',
                padding: '6px 14px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                SCORE
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.94rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {score}
              </span>
            </div>
          </div>

          {/* Start Screen Overlay */}
          {gameState === 'IDLE' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(17, 17, 17, 0.88)',
                backdropFilter: 'blur(3px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                textAlign: 'center',
                zIndex: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '8px',
                }}
              >
                MISSION: SURVIVE 1000 METERS
              </span>

              <h3
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                }}
              >
                Peak Traffic Commute
              </h3>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  maxWidth: '460px',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}
              >
                Steer across 3 lanes to avoid unexpected road obstacles. You have 3 vehicle durability points.
                Use <strong>A / D</strong> or <strong>← / → Arrow Keys</strong> (or the touch buttons below).
              </p>

              <button
                onClick={startGame}
                className="btn-primary"
                style={{
                  padding: '12px 32px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                  letterSpacing: '0.06em',
                }}
              >
                <Play size={16} />
                <span>START ENGINE</span>
              </button>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameState === 'GAMEOVER' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(17, 17, 17, 0.92)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                textAlign: 'center',
                zIndex: 20,
              }}
            >
              <AlertTriangle size={32} color="var(--text-primary)" style={{ marginBottom: '12px' }} />

              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Commute Interrupted
              </h3>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  maxWidth: '420px',
                  marginBottom: '16px',
                }}
              >
                Vehicle integrity reached 0 after encountering {lastObstacleEncountered || 'obstacles'}.
                You covered {distance} meters before getting stuck in Mumbai traffic.
              </p>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  color: 'var(--text-muted)',
                  marginBottom: '20px',
                }}
              >
                FINAL SCORE: {score}
              </div>

              <button
                onClick={startGame}
                className="btn-primary"
                style={{
                  padding: '10px 24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                }}
              >
                <RotateCcw size={15} />
                <span>RETRY COMMUTE</span>
              </button>
            </div>
          )}

          {/* Victory Overlay (Section 14 Fictional Finish-Line Reward) */}
          {gameState === 'VICTORY' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(17, 17, 17, 0.94)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '28px',
                textAlign: 'center',
                zIndex: 20,
              }}
            >
              <Trophy size={36} color="var(--text-primary)" style={{ marginBottom: '12px' }} />

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                CONGRATULATIONS, ROAD WARRIOR.
              </span>

              <h3
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                }}
              >
                You've survived the Indian commute.
              </h3>

              {/* Required Reward Box */}
              <div
                style={{
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--border)',
                  padding: '14px 20px',
                  maxWidth: '480px',
                  marginBottom: '14px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.94rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  Your fictional reward: 1 litre of ethanol-blended petrol.
                </div>
                <div
                  style={{
                    fontSize: '0.76rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  * Notice: This reward is entirely fictional and provided solely for amusement.
                  No actual fuel will be delivered, and this game is not endorsed by, sponsored by, or affiliated with the government or any public official.
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  color: 'var(--text-muted)',
                  marginBottom: '18px',
                }}
              >
                DISTANCE: 1000M · FINAL SCORE: {score}
              </div>

              <button
                onClick={startGame}
                className="btn-primary"
                style={{
                  padding: '10px 24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                }}
              >
                <RotateCcw size={15} />
                <span>DRIVE AGAIN</span>
              </button>
            </div>
          )}
        </div>

        {/* Touch & Key Controls Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '12px',
            padding: '10px 14px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          <button
            onClick={moveLeft}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
            }}
            aria-label="Steer Left"
          >
            <ArrowLeft size={16} />
            <span>STEER LEFT [A / ←]</span>
          </button>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              display: 'inline-block',
            }}
            className="hidden-mobile"
          >
            
          </span>

          <button
            onClick={moveRight}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
            }}
            aria-label="Steer Right"
          >
            <span>STEER RIGHT [D / →]</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
