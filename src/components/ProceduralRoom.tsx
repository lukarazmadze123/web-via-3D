import React, { useRef } from 'react';
import * as THREE from 'three';

interface ProceduralRoomProps {
  wireframe?: boolean;
  activeMaterialId?: string | null;
  [key: string]: unknown;
}

export function ProceduralRoom({
  wireframe = false,
  activeMaterialId = null,
  ...props
}: ProceduralRoomProps) {
  // Helper to determine if a material should be highlighted when inspected
  const isHighlighted = (id: string) => activeMaterialId === id;

  return (
    <group {...props} dispose={null}>
      {/* ========================================================
          1. ARCHITECTURAL SHELL: FLOOR & CORNER WALLS
         ======================================================== */}
      {/* Floor Foundation Slab (FLOOR.001) */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <boxGeometry args={[5.2, 0.3, 5.2]} />
        <meshStandardMaterial
          color={isHighlighted('FLOOR.001') ? '#38bdf8' : '#1e232d'}
          roughness={0.45}
          metalness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      {/* Decorative Rug (TEXTURE / DARK GREY.001) */}
      <mesh position={[0.4, 0.01, 0.6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.8, 3.2]} />
        <meshStandardMaterial
          color={isHighlighted('TEXTURE') ? '#f43f5e' : '#2b303c'}
          roughness={0.9}
          wireframe={wireframe}
        />
      </mesh>

      {/* Back-Left Wall (WALL) */}
      <mesh position={[-2.5, 2.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.2, 4.2, 5.2]} />
        <meshStandardMaterial
          color={isHighlighted('WALL') ? '#38bdf8' : '#333842'}
          roughness={0.8}
          wireframe={wireframe}
        />
      </mesh>

      {/* Back-Right Wall (LIGHT GREY.001) */}
      <mesh position={[0, 2.1, -2.5]} receiveShadow castShadow>
        <boxGeometry args={[5.2, 4.2, 0.2]} />
        <meshStandardMaterial
          color={isHighlighted('LIGHT GREY.001') ? '#38bdf8' : '#2a2f3a'}
          roughness={0.8}
          wireframe={wireframe}
        />
      </mesh>

      {/* Baseboards (DARK GREY.001) */}
      <mesh position={[-2.38, 0.1, 0]}>
        <boxGeometry args={[0.04, 0.2, 5.16]} />
        <meshStandardMaterial color="#17191e" roughness={0.5} wireframe={wireframe} />
      </mesh>
      <mesh position={[0, 0.1, -2.38]}>
        <boxGeometry args={[5.16, 0.2, 0.04]} />
        <meshStandardMaterial color="#17191e" roughness={0.5} wireframe={wireframe} />
      </mesh>

      {/* ========================================================
          2. THE BED ZONE (BED, BEDSHEET, WHITE)
         ======================================================== */}
      {/* Platform Bed Frame (BED) */}
      <group position={[-1.2, 0, -1.0]}>
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.9, 0.38, 2.3]} />
          <meshStandardMaterial
            color={isHighlighted('BED') ? '#f59e0b' : '#14161b'}
            roughness={0.6}
            wireframe={wireframe}
          />
        </mesh>
        {/* Headboard */}
        <mesh position={[-0.9, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 1.1, 2.3]} />
          <meshStandardMaterial color="#1b1e26" roughness={0.7} wireframe={wireframe} />
        </mesh>
        {/* Mattress (WHITE) */}
        <mesh position={[0.05, 0.44, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.22, 2.1]} />
          <meshStandardMaterial
            color={isHighlighted('WHITE') ? '#38bdf8' : '#eef2f6'}
            roughness={0.85}
            wireframe={wireframe}
          />
        </mesh>
        {/* Duvet / Bedsheet (BEDSHEET) */}
        <mesh position={[0.22, 0.48, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.35, 0.24, 2.05]} />
          <meshStandardMaterial
            color={isHighlighted('BEDSHEET') ? '#10b981' : '#cbd5e1'}
            roughness={0.9}
            wireframe={wireframe}
          />
        </mesh>
        {/* Pillows */}
        <mesh position={[-0.6, 0.54, -0.5]} rotation={[0, 0, 0.1]} castShadow>
          <boxGeometry args={[0.42, 0.12, 0.7]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.7} wireframe={wireframe} />
        </mesh>
        <mesh position={[-0.6, 0.54, 0.5]} rotation={[0, 0, 0.1]} castShadow>
          <boxGeometry args={[0.42, 0.12, 0.7]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.7} wireframe={wireframe} />
        </mesh>
      </group>

      {/* Bedside Nightstand & Warm Lamp (ORANGE) */}
      <group position={[-2.0, 0, 0.7]}>
        {/* Nightstand Table */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.5, 0.6]} />
          <meshStandardMaterial color="#1a1c22" roughness={0.5} wireframe={wireframe} />
        </mesh>
        {/* Lamp Base */}
        <mesh position={[0, 0.53, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.06, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} wireframe={wireframe} />
        </mesh>
        {/* Lamp Stem */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.3, 12]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} wireframe={wireframe} />
        </mesh>
        {/* Lamp Shade / Bulb (ORANGE) */}
        <mesh position={[0, 0.86, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.2, 0.18, 16]} />
          <meshStandardMaterial
            color={isHighlighted('ORANGE') ? '#ff4500' : '#f97316'}
            emissive="#ea580c"
            emissiveIntensity={isHighlighted('ORANGE') ? 2.5 : 1.2}
            roughness={0.3}
            wireframe={wireframe}
          />
        </mesh>
        {/* Nightstand Book (BOOK1) */}
        <mesh position={[0.05, 0.52, -0.16]} rotation={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.22, 0.04, 0.3]} />
          <meshStandardMaterial
            color={isHighlighted('BOOK1') ? '#ec4899' : '#e11d48'}
            roughness={0.6}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* ========================================================
          3. CREATIVE WORKSPACE (DESK, EMISSION, GREEN EMIT, BLUE)
         ======================================================== */}
      {/* Desk Unit (DARK GREY) */}
      <group position={[1.4, 0, -1.3]}>
        {/* Desktop Surface */}
        <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.06, 0.85]} />
          <meshStandardMaterial
            color={isHighlighted('DARK GREY') ? '#38bdf8' : '#181b22'}
            roughness={0.4}
            wireframe={wireframe}
          />
        </mesh>
        {/* Desk Legs (Black steel) */}
        <mesh position={[-0.8, 0.47, -0.32]} castShadow>
          <boxGeometry args={[0.05, 0.94, 0.05]} />
          <meshStandardMaterial color="#0f1115" metalness={0.8} wireframe={wireframe} />
        </mesh>
        <mesh position={[0.8, 0.47, -0.32]} castShadow>
          <boxGeometry args={[0.05, 0.94, 0.05]} />
          <meshStandardMaterial color="#0f1115" metalness={0.8} wireframe={wireframe} />
        </mesh>
        <mesh position={[-0.8, 0.47, 0.32]} castShadow>
          <boxGeometry args={[0.05, 0.94, 0.05]} />
          <meshStandardMaterial color="#0f1115" metalness={0.8} wireframe={wireframe} />
        </mesh>
        <mesh position={[0.8, 0.47, 0.32]} castShadow>
          <boxGeometry args={[0.05, 0.94, 0.05]} />
          <meshStandardMaterial color="#0f1115" metalness={0.8} wireframe={wireframe} />
        </mesh>

        {/* Ultrawide Monitor Stand */}
        <mesh position={[0, 1.08, -0.22]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.22, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} wireframe={wireframe} />
        </mesh>
        <mesh position={[0, 0.98, -0.22]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.02, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} wireframe={wireframe} />
        </mesh>

        {/* Monitor Frame */}
        <mesh position={[0, 1.34, -0.2]} castShadow>
          <boxGeometry args={[1.2, 0.52, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} wireframe={wireframe} />
        </mesh>

        {/* Glowing Monitor Display (EMISSION & GREEN EMIT) */}
        <mesh position={[0, 1.34, -0.175]}>
          <planeGeometry args={[1.14, 0.47]} />
          <meshStandardMaterial
            color="#052e16"
            emissive={isHighlighted('GREEN EMIT') || isHighlighted('EMISSION') ? '#22c55e' : '#10b981'}
            emissiveIntensity={isHighlighted('GREEN EMIT') ? 4.0 : 2.5}
            roughness={0.1}
            wireframe={wireframe}
          />
        </mesh>

        {/* Terminal/IDE Code lines simulated on screen */}
        <group position={[-0.45, 1.48, -0.17]}>
          <mesh position={[0.2, 0, 0]}>
            <planeGeometry args={[0.35, 0.02]} />
            <meshBasicMaterial color="#a7f3d0" />
          </mesh>
          <mesh position={[0.35, -0.05, 0]}>
            <planeGeometry args={[0.6, 0.02]} />
            <meshBasicMaterial color="#34d399" />
          </mesh>
          <mesh position={[0.25, -0.1, 0]}>
            <planeGeometry args={[0.4, 0.02]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[0.4, -0.15, 0]}>
            <planeGeometry args={[0.7, 0.02]} />
            <meshBasicMaterial color="#fcd34d" />
          </mesh>
          <mesh position={[0.15, -0.2, 0]}>
            <planeGeometry args={[0.2, 0.02]} />
            <meshBasicMaterial color="#a7f3d0" />
          </mesh>
        </group>

        {/* Desk Mat & Keyboard (LIGHT GREY & TEXTURE) */}
        <mesh position={[0, 0.985, 0.05]} receiveShadow>
          <boxGeometry args={[1.0, 0.008, 0.45]} />
          <meshStandardMaterial color="#1e222a" roughness={0.8} wireframe={wireframe} />
        </mesh>
        {/* Keyboard (LIGHT GREY) */}
        <mesh position={[-0.08, 1.0, 0.08]} castShadow>
          <boxGeometry args={[0.42, 0.02, 0.16]} />
          <meshStandardMaterial
            color={isHighlighted('LIGHT GREY') ? '#38bdf8' : '#e2e8f0'}
            roughness={0.3}
            wireframe={wireframe}
          />
        </mesh>
        {/* Mouse */}
        <mesh position={[0.28, 1.0, 0.08]} castShadow>
          <boxGeometry args={[0.09, 0.025, 0.13]} />
          <meshStandardMaterial color="#334155" roughness={0.3} wireframe={wireframe} />
        </mesh>

        {/* Coffee Mug & Paper Pad (PAPER) */}
        <mesh position={[-0.6, 1.03, -0.05]} castShadow>
          <cylinderGeometry args={[0.05, 0.045, 0.1, 16]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.2} wireframe={wireframe} />
        </mesh>
        <mesh position={[-0.58, 0.99, 0.18]} rotation={[0, 0.1, 0]} receiveShadow>
          <boxGeometry args={[0.22, 0.015, 0.28]} />
          <meshStandardMaterial
            color={isHighlighted('PAPER') ? '#38bdf8' : '#f8fafc'}
            roughness={0.9}
            wireframe={wireframe}
          />
        </mesh>

        {/* Task Chair (BLUE) */}
        <group position={[0, 0, 0.65]} rotation={[0, Math.PI + 0.2, 0]}>
          {/* Chair Base & Caster Wheels */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.04, 8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} wireframe={wireframe} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4, 12]} />
            <meshStandardMaterial color="#334155" metalness={0.9} wireframe={wireframe} />
          </mesh>
          {/* Seat Cushion (BLUE) */}
          <mesh position={[0, 0.52, 0]} castShadow>
            <boxGeometry args={[0.55, 0.08, 0.52]} />
            <meshStandardMaterial
              color={isHighlighted('BLUE') ? '#60a5fa' : '#2563eb'}
              roughness={0.7}
              wireframe={wireframe}
            />
          </mesh>
          {/* Curved Backrest */}
          <mesh position={[0, 0.85, -0.24]} rotation={[-0.1, 0, 0]} castShadow>
            <boxGeometry args={[0.52, 0.55, 0.06]} />
            <meshStandardMaterial
              color={isHighlighted('BLUE') ? '#60a5fa' : '#1d4ed8'}
              roughness={0.7}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          4. FLOATING SHELVES & BOOKS (BOOK1, BOOK2, BOOK3)
         ======================================================== */}
      <group position={[1.4, 2.5, -2.35]}>
        {/* Shelf Planks */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.04, 0.3]} />
          <meshStandardMaterial color="#1e222d" roughness={0.6} wireframe={wireframe} />
        </mesh>
        <mesh position={[0, -0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.04, 0.3]} />
          <meshStandardMaterial color="#1e222d" roughness={0.6} wireframe={wireframe} />
        </mesh>

        {/* Top Shelf Books (BOOK1, BOOK2, BOOK3) */}
        <group position={[-0.55, 0.16, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 0.28, 0.22]} />
            <meshStandardMaterial
              color={isHighlighted('BOOK1') ? '#38bdf8' : '#e11d48'}
              roughness={0.6}
              wireframe={wireframe}
            />
          </mesh>
          <mesh position={[0.08, 0, 0]} castShadow>
            <boxGeometry args={[0.05, 0.25, 0.21]} />
            <meshStandardMaterial
              color={isHighlighted('BOOK2') ? '#38bdf8' : '#f59e0b'}
              roughness={0.6}
              wireframe={wireframe}
            />
          </mesh>
          <mesh position={[0.15, 0, 0]} castShadow>
            <boxGeometry args={[0.07, 0.3, 0.22]} />
            <meshStandardMaterial
              color={isHighlighted('BOOK3') ? '#38bdf8' : '#059669'}
              roughness={0.6}
              wireframe={wireframe}
            />
          </mesh>
          {/* Tilted book */}
          <mesh position={[0.26, -0.02, 0]} rotation={[0, 0, -0.22]} castShadow>
            <boxGeometry args={[0.05, 0.26, 0.2]} />
            <meshStandardMaterial color="#3b82f6" roughness={0.6} wireframe={wireframe} />
          </mesh>
        </group>

        {/* Lower Shelf Zen Stones / Rocks (ROCK1, ROCK2, ROCK3) */}
        <group position={[0.4, -0.45, 0]}>
          {/* Display Plinth */}
          <mesh position={[0, -0.06, 0]}>
            <boxGeometry args={[0.65, 0.02, 0.22]} />
            <meshStandardMaterial color="#0f1115" metalness={0.5} wireframe={wireframe} />
          </mesh>
          {/* Rock 1 */}
          <mesh position={[-0.18, 0.02, 0]} castShadow>
            <dodecahedronGeometry args={[0.07, 0]} />
            <meshStandardMaterial
              color={isHighlighted('ROCK1') ? '#38bdf8' : '#64748b'}
              roughness={0.9}
              wireframe={wireframe}
            />
          </mesh>
          {/* Rock 2 */}
          <mesh position={[0, 0.05, 0]} castShadow>
            <dodecahedronGeometry args={[0.09, 1]} />
            <meshStandardMaterial
              color={isHighlighted('ROCK2') ? '#38bdf8' : '#475569'}
              roughness={0.85}
              wireframe={wireframe}
            />
          </mesh>
          {/* Rock 3 */}
          <mesh position={[0.18, 0.03, 0]} castShadow>
            <dodecahedronGeometry args={[0.065, 0]} />
            <meshStandardMaterial
              color={isHighlighted('ROCK3') ? '#38bdf8' : '#334155'}
              roughness={0.95}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          5. POTTED MONSTERA PLANT (GREEN)
         ======================================================== */}
      <group position={[-2.0, 0, -2.0]}>
        {/* Ceramic Planter */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.16, 0.7, 16]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} wireframe={wireframe} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.68, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.04, 16]} />
          <meshStandardMaterial color="#291e13" roughness={1.0} wireframe={wireframe} />
        </mesh>
        {/* Plant Leaves (GREEN) */}
        <group position={[0, 0.72, 0]}>
          <mesh position={[0.1, 0.2, 0.1]} rotation={[0.4, 0.6, 0.3]} castShadow>
            <coneGeometry args={[0.22, 0.45, 4]} />
            <meshStandardMaterial
              color={isHighlighted('GREEN') ? '#4ade80' : '#15803d'}
              roughness={0.5}
              wireframe={wireframe}
            />
          </mesh>
          <mesh position={[-0.12, 0.28, -0.08]} rotation={[-0.5, -0.4, -0.2]} castShadow>
            <coneGeometry args={[0.25, 0.5, 4]} />
            <meshStandardMaterial
              color={isHighlighted('GREEN') ? '#4ade80' : '#166534'}
              roughness={0.5}
              wireframe={wireframe}
            />
          </mesh>
          <mesh position={[0.15, 0.38, -0.1]} rotation={[0.2, -0.8, 0.4]} castShadow>
            <coneGeometry args={[0.2, 0.42, 4]} />
            <meshStandardMaterial
              color={isHighlighted('GREEN') ? '#4ade80' : '#14532d'}
              roughness={0.5}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          6. ARCHITECTURAL WALL ART / ACOUSTIC PANEL
         ======================================================== */}
      <group position={[-2.38, 2.6, 0.4]}>
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[1.2, 1.6, 0.04]} />
          <meshStandardMaterial color="#181b22" roughness={0.7} wireframe={wireframe} />
        </mesh>
        {/* Artwork graphic panel */}
        <mesh position={[0.025, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.0, 1.4]} />
          <meshStandardMaterial
            color="#090b10"
            emissive="#1e293b"
            emissiveIntensity={0.3}
            wireframe={wireframe}
          />
        </mesh>
        {/* Minimal geometric stripe in artwork */}
        <mesh position={[0.03, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.8, 0.03]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
        <mesh position={[0.03, -0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.5, 0.02]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>
    </group>
  );
}
