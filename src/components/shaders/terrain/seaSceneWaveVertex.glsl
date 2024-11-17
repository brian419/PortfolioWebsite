uniform float time;
uniform float waveHeight;
uniform float waveFrequency;

varying vec3 vPosition;
varying float vWave;

void main() {
    vec3 pos = position;
    float wave = sin(pos.x * waveFrequency + time) * cos(pos.y * waveFrequency + time);
    pos.z += wave * waveHeight;
    vWave = wave; 
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}


