export type LightingPreset = 'midnight' | 'sunset' | 'studio' | 'cyber';

export type CameraPreset = 'isometric' | 'front' | 'top' | 'desk' | 'bed';

export interface LightingConfig {
  name: string;
  label: string;
  ambientColor: string;
  ambientIntensity: number;
  directionalColor: string;
  directionalIntensity: number;
  directionalPos: [number, number, number];
  screenGlowColor: string;
  screenGlowIntensity: number;
  lampGlowColor: string;
  lampGlowIntensity: number;
  bgHex: string;
}

export interface MaterialSpec {
  id: string;
  name: string;
  code: string;
  color: string;
  type: 'Emissive' | 'Diffuse' | 'Architectural' | 'Natural';
  roughness: number;
  description: string;
  emissiveIntensity?: number;
}
